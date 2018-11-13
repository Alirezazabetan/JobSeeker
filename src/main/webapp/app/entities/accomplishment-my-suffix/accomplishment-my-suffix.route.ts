import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccomplishmentMySuffix } from 'app/shared/model/accomplishment-my-suffix.model';
import { AccomplishmentMySuffixService } from './accomplishment-my-suffix.service';
import { AccomplishmentMySuffixComponent } from './accomplishment-my-suffix.component';
import { AccomplishmentMySuffixDetailComponent } from './accomplishment-my-suffix-detail.component';
import { AccomplishmentMySuffixUpdateComponent } from './accomplishment-my-suffix-update.component';
import { AccomplishmentMySuffixDeletePopupComponent } from './accomplishment-my-suffix-delete-dialog.component';
import { IAccomplishmentMySuffix } from 'app/shared/model/accomplishment-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class AccomplishmentMySuffixResolve implements Resolve<IAccomplishmentMySuffix> {
    constructor(private service: AccomplishmentMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((accomplishment: HttpResponse<AccomplishmentMySuffix>) => accomplishment.body));
        }
        return of(new AccomplishmentMySuffix());
    }
}

export const accomplishmentRoute: Routes = [
    {
        path: 'accomplishment-my-suffix',
        component: AccomplishmentMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.accomplishment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accomplishment-my-suffix/:id/view',
        component: AccomplishmentMySuffixDetailComponent,
        resolve: {
            accomplishment: AccomplishmentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.accomplishment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accomplishment-my-suffix/new',
        component: AccomplishmentMySuffixUpdateComponent,
        resolve: {
            accomplishment: AccomplishmentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.accomplishment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accomplishment-my-suffix/:id/edit',
        component: AccomplishmentMySuffixUpdateComponent,
        resolve: {
            accomplishment: AccomplishmentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.accomplishment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accomplishmentPopupRoute: Routes = [
    {
        path: 'accomplishment-my-suffix/:id/delete',
        component: AccomplishmentMySuffixDeletePopupComponent,
        resolve: {
            accomplishment: AccomplishmentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.accomplishment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
