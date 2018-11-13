import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobPostMySuffix } from 'app/shared/model/job-post-my-suffix.model';
import { JobPostMySuffixService } from './job-post-my-suffix.service';
import { JobPostMySuffixComponent } from './job-post-my-suffix.component';
import { JobPostMySuffixDetailComponent } from './job-post-my-suffix-detail.component';
import { JobPostMySuffixUpdateComponent } from './job-post-my-suffix-update.component';
import { JobPostMySuffixDeletePopupComponent } from './job-post-my-suffix-delete-dialog.component';
import { IJobPostMySuffix } from 'app/shared/model/job-post-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class JobPostMySuffixResolve implements Resolve<IJobPostMySuffix> {
    constructor(private service: JobPostMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((jobPost: HttpResponse<JobPostMySuffix>) => jobPost.body));
        }
        return of(new JobPostMySuffix());
    }
}

export const jobPostRoute: Routes = [
    {
        path: 'job-post-my-suffix',
        component: JobPostMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jobAngularApp.jobPost.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-post-my-suffix/:id/view',
        component: JobPostMySuffixDetailComponent,
        resolve: {
            jobPost: JobPostMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.jobPost.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-post-my-suffix/new',
        component: JobPostMySuffixUpdateComponent,
        resolve: {
            jobPost: JobPostMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.jobPost.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-post-my-suffix/:id/edit',
        component: JobPostMySuffixUpdateComponent,
        resolve: {
            jobPost: JobPostMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.jobPost.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobPostPopupRoute: Routes = [
    {
        path: 'job-post-my-suffix/:id/delete',
        component: JobPostMySuffixDeletePopupComponent,
        resolve: {
            jobPost: JobPostMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.jobPost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
