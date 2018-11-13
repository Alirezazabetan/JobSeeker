import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PublicationMySuffix } from 'app/shared/model/publication-my-suffix.model';
import { PublicationMySuffixService } from './publication-my-suffix.service';
import { PublicationMySuffixComponent } from './publication-my-suffix.component';
import { PublicationMySuffixDetailComponent } from './publication-my-suffix-detail.component';
import { PublicationMySuffixUpdateComponent } from './publication-my-suffix-update.component';
import { PublicationMySuffixDeletePopupComponent } from './publication-my-suffix-delete-dialog.component';
import { IPublicationMySuffix } from 'app/shared/model/publication-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PublicationMySuffixResolve implements Resolve<IPublicationMySuffix> {
    constructor(private service: PublicationMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((publication: HttpResponse<PublicationMySuffix>) => publication.body));
        }
        return of(new PublicationMySuffix());
    }
}

export const publicationRoute: Routes = [
    {
        path: 'publication-my-suffix',
        component: PublicationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.publication.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'publication-my-suffix/:id/view',
        component: PublicationMySuffixDetailComponent,
        resolve: {
            publication: PublicationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.publication.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'publication-my-suffix/new',
        component: PublicationMySuffixUpdateComponent,
        resolve: {
            publication: PublicationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.publication.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'publication-my-suffix/:id/edit',
        component: PublicationMySuffixUpdateComponent,
        resolve: {
            publication: PublicationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.publication.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const publicationPopupRoute: Routes = [
    {
        path: 'publication-my-suffix/:id/delete',
        component: PublicationMySuffixDeletePopupComponent,
        resolve: {
            publication: PublicationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.publication.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
