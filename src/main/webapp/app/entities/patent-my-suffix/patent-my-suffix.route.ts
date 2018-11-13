import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PatentMySuffix } from 'app/shared/model/patent-my-suffix.model';
import { PatentMySuffixService } from './patent-my-suffix.service';
import { PatentMySuffixComponent } from './patent-my-suffix.component';
import { PatentMySuffixDetailComponent } from './patent-my-suffix-detail.component';
import { PatentMySuffixUpdateComponent } from './patent-my-suffix-update.component';
import { PatentMySuffixDeletePopupComponent } from './patent-my-suffix-delete-dialog.component';
import { IPatentMySuffix } from 'app/shared/model/patent-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PatentMySuffixResolve implements Resolve<IPatentMySuffix> {
    constructor(private service: PatentMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((patent: HttpResponse<PatentMySuffix>) => patent.body));
        }
        return of(new PatentMySuffix());
    }
}

export const patentRoute: Routes = [
    {
        path: 'patent-my-suffix',
        component: PatentMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.patent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'patent-my-suffix/:id/view',
        component: PatentMySuffixDetailComponent,
        resolve: {
            patent: PatentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.patent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'patent-my-suffix/new',
        component: PatentMySuffixUpdateComponent,
        resolve: {
            patent: PatentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.patent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'patent-my-suffix/:id/edit',
        component: PatentMySuffixUpdateComponent,
        resolve: {
            patent: PatentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.patent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const patentPopupRoute: Routes = [
    {
        path: 'patent-my-suffix/:id/delete',
        component: PatentMySuffixDeletePopupComponent,
        resolve: {
            patent: PatentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.patent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
