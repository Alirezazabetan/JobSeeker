import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestScoreMySuffix } from 'app/shared/model/test-score-my-suffix.model';
import { TestScoreMySuffixService } from './test-score-my-suffix.service';
import { TestScoreMySuffixComponent } from './test-score-my-suffix.component';
import { TestScoreMySuffixDetailComponent } from './test-score-my-suffix-detail.component';
import { TestScoreMySuffixUpdateComponent } from './test-score-my-suffix-update.component';
import { TestScoreMySuffixDeletePopupComponent } from './test-score-my-suffix-delete-dialog.component';
import { ITestScoreMySuffix } from 'app/shared/model/test-score-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TestScoreMySuffixResolve implements Resolve<ITestScoreMySuffix> {
    constructor(private service: TestScoreMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testScore: HttpResponse<TestScoreMySuffix>) => testScore.body));
        }
        return of(new TestScoreMySuffix());
    }
}

export const testScoreRoute: Routes = [
    {
        path: 'test-score-my-suffix',
        component: TestScoreMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.testScore.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-score-my-suffix/:id/view',
        component: TestScoreMySuffixDetailComponent,
        resolve: {
            testScore: TestScoreMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.testScore.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-score-my-suffix/new',
        component: TestScoreMySuffixUpdateComponent,
        resolve: {
            testScore: TestScoreMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.testScore.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-score-my-suffix/:id/edit',
        component: TestScoreMySuffixUpdateComponent,
        resolve: {
            testScore: TestScoreMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.testScore.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testScorePopupRoute: Routes = [
    {
        path: 'test-score-my-suffix/:id/delete',
        component: TestScoreMySuffixDeletePopupComponent,
        resolve: {
            testScore: TestScoreMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.testScore.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
