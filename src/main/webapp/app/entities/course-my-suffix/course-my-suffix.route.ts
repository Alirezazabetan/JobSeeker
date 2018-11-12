import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseMySuffix } from 'app/shared/model/course-my-suffix.model';
import { CourseMySuffixService } from './course-my-suffix.service';
import { CourseMySuffixComponent } from './course-my-suffix.component';
import { CourseMySuffixDetailComponent } from './course-my-suffix-detail.component';
import { CourseMySuffixUpdateComponent } from './course-my-suffix-update.component';
import { CourseMySuffixDeletePopupComponent } from './course-my-suffix-delete-dialog.component';
import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CourseMySuffixResolve implements Resolve<ICourseMySuffix> {
    constructor(private service: CourseMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((course: HttpResponse<CourseMySuffix>) => course.body));
        }
        return of(new CourseMySuffix());
    }
}

export const courseRoute: Routes = [
    {
        path: 'course-my-suffix',
        component: CourseMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'course-my-suffix/:id/view',
        component: CourseMySuffixDetailComponent,
        resolve: {
            course: CourseMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'course-my-suffix/new',
        component: CourseMySuffixUpdateComponent,
        resolve: {
            course: CourseMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'course-my-suffix/:id/edit',
        component: CourseMySuffixUpdateComponent,
        resolve: {
            course: CourseMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const coursePopupRoute: Routes = [
    {
        path: 'course-my-suffix/:id/delete',
        component: CourseMySuffixDeletePopupComponent,
        resolve: {
            course: CourseMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.course.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
