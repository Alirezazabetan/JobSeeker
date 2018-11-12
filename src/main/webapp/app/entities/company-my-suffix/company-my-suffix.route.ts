import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyMySuffix } from 'app/shared/model/company-my-suffix.model';
import { CompanyMySuffixService } from './company-my-suffix.service';
import { CompanyMySuffixComponent } from './company-my-suffix.component';
import { CompanyMySuffixDetailComponent } from './company-my-suffix-detail.component';
import { CompanyMySuffixUpdateComponent } from './company-my-suffix-update.component';
import { CompanyMySuffixDeletePopupComponent } from './company-my-suffix-delete-dialog.component';
import { ICompanyMySuffix } from 'app/shared/model/company-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CompanyMySuffixResolve implements Resolve<ICompanyMySuffix> {
    constructor(private service: CompanyMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((company: HttpResponse<CompanyMySuffix>) => company.body));
        }
        return of(new CompanyMySuffix());
    }
}

export const companyRoute: Routes = [
    {
        path: 'company-my-suffix',
        component: CompanyMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jobAngularApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-my-suffix/:id/view',
        component: CompanyMySuffixDetailComponent,
        resolve: {
            company: CompanyMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-my-suffix/new',
        component: CompanyMySuffixUpdateComponent,
        resolve: {
            company: CompanyMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-my-suffix/:id/edit',
        component: CompanyMySuffixUpdateComponent,
        resolve: {
            company: CompanyMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companyPopupRoute: Routes = [
    {
        path: 'company-my-suffix/:id/delete',
        component: CompanyMySuffixDeletePopupComponent,
        resolve: {
            company: CompanyMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.company.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
