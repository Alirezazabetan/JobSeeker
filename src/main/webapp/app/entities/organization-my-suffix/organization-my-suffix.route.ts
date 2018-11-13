import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationMySuffix } from 'app/shared/model/organization-my-suffix.model';
import { OrganizationMySuffixService } from './organization-my-suffix.service';
import { OrganizationMySuffixComponent } from './organization-my-suffix.component';
import { OrganizationMySuffixDetailComponent } from './organization-my-suffix-detail.component';
import { OrganizationMySuffixUpdateComponent } from './organization-my-suffix-update.component';
import { OrganizationMySuffixDeletePopupComponent } from './organization-my-suffix-delete-dialog.component';
import { IOrganizationMySuffix } from 'app/shared/model/organization-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class OrganizationMySuffixResolve implements Resolve<IOrganizationMySuffix> {
    constructor(private service: OrganizationMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((organization: HttpResponse<OrganizationMySuffix>) => organization.body));
        }
        return of(new OrganizationMySuffix());
    }
}

export const organizationRoute: Routes = [
    {
        path: 'organization-my-suffix',
        component: OrganizationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.organization.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'organization-my-suffix/:id/view',
        component: OrganizationMySuffixDetailComponent,
        resolve: {
            organization: OrganizationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.organization.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'organization-my-suffix/new',
        component: OrganizationMySuffixUpdateComponent,
        resolve: {
            organization: OrganizationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.organization.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'organization-my-suffix/:id/edit',
        component: OrganizationMySuffixUpdateComponent,
        resolve: {
            organization: OrganizationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.organization.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organizationPopupRoute: Routes = [
    {
        path: 'organization-my-suffix/:id/delete',
        component: OrganizationMySuffixDeletePopupComponent,
        resolve: {
            organization: OrganizationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.organization.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
