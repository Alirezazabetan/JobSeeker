import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CertificationMySuffix } from 'app/shared/model/certification-my-suffix.model';
import { CertificationMySuffixService } from './certification-my-suffix.service';
import { CertificationMySuffixComponent } from './certification-my-suffix.component';
import { CertificationMySuffixDetailComponent } from './certification-my-suffix-detail.component';
import { CertificationMySuffixUpdateComponent } from './certification-my-suffix-update.component';
import { CertificationMySuffixDeletePopupComponent } from './certification-my-suffix-delete-dialog.component';
import { ICertificationMySuffix } from 'app/shared/model/certification-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CertificationMySuffixResolve implements Resolve<ICertificationMySuffix> {
    constructor(private service: CertificationMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((certification: HttpResponse<CertificationMySuffix>) => certification.body));
        }
        return of(new CertificationMySuffix());
    }
}

export const certificationRoute: Routes = [
    {
        path: 'certification-my-suffix',
        component: CertificationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.certification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'certification-my-suffix/:id/view',
        component: CertificationMySuffixDetailComponent,
        resolve: {
            certification: CertificationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.certification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'certification-my-suffix/new',
        component: CertificationMySuffixUpdateComponent,
        resolve: {
            certification: CertificationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.certification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'certification-my-suffix/:id/edit',
        component: CertificationMySuffixUpdateComponent,
        resolve: {
            certification: CertificationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.certification.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const certificationPopupRoute: Routes = [
    {
        path: 'certification-my-suffix/:id/delete',
        component: CertificationMySuffixDeletePopupComponent,
        resolve: {
            certification: CertificationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.certification.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
