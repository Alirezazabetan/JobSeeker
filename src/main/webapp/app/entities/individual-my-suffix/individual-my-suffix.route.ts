import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IndividualMySuffix } from 'app/shared/model/individual-my-suffix.model';
import { IndividualMySuffixService } from './individual-my-suffix.service';
import { IndividualMySuffixComponent } from './individual-my-suffix.component';
import { IndividualMySuffixDetailComponent } from './individual-my-suffix-detail.component';
import { IndividualMySuffixUpdateComponent } from './individual-my-suffix-update.component';
import { IndividualMySuffixDeletePopupComponent } from './individual-my-suffix-delete-dialog.component';
import { IIndividualMySuffix } from 'app/shared/model/individual-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class IndividualMySuffixResolve implements Resolve<IIndividualMySuffix> {
    constructor(private service: IndividualMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((individual: HttpResponse<IndividualMySuffix>) => individual.body));
        }
        return of(new IndividualMySuffix());
    }
}

export const individualRoute: Routes = [
    {
        path: 'individual-my-suffix',
        component: IndividualMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jobAngularApp.individual.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'individual-my-suffix/:id/view',
        component: IndividualMySuffixDetailComponent,
        resolve: {
            individual: IndividualMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.individual.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'individual-my-suffix/new',
        component: IndividualMySuffixUpdateComponent,
        resolve: {
            individual: IndividualMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.individual.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'individual-my-suffix/:id/edit',
        component: IndividualMySuffixUpdateComponent,
        resolve: {
            individual: IndividualMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.individual.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const individualPopupRoute: Routes = [
    {
        path: 'individual-my-suffix/:id/delete',
        component: IndividualMySuffixDeletePopupComponent,
        resolve: {
            individual: IndividualMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.individual.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
