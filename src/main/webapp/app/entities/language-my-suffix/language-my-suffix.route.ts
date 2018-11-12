import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LanguageMySuffix } from 'app/shared/model/language-my-suffix.model';
import { LanguageMySuffixService } from './language-my-suffix.service';
import { LanguageMySuffixComponent } from './language-my-suffix.component';
import { LanguageMySuffixDetailComponent } from './language-my-suffix-detail.component';
import { LanguageMySuffixUpdateComponent } from './language-my-suffix-update.component';
import { LanguageMySuffixDeletePopupComponent } from './language-my-suffix-delete-dialog.component';
import { ILanguageMySuffix } from 'app/shared/model/language-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class LanguageMySuffixResolve implements Resolve<ILanguageMySuffix> {
    constructor(private service: LanguageMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((language: HttpResponse<LanguageMySuffix>) => language.body));
        }
        return of(new LanguageMySuffix());
    }
}

export const languageRoute: Routes = [
    {
        path: 'language-my-suffix',
        component: LanguageMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.language.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'language-my-suffix/:id/view',
        component: LanguageMySuffixDetailComponent,
        resolve: {
            language: LanguageMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.language.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'language-my-suffix/new',
        component: LanguageMySuffixUpdateComponent,
        resolve: {
            language: LanguageMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.language.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'language-my-suffix/:id/edit',
        component: LanguageMySuffixUpdateComponent,
        resolve: {
            language: LanguageMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.language.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const languagePopupRoute: Routes = [
    {
        path: 'language-my-suffix/:id/delete',
        component: LanguageMySuffixDeletePopupComponent,
        resolve: {
            language: LanguageMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.language.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
