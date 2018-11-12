import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectMySuffix } from 'app/shared/model/project-my-suffix.model';
import { ProjectMySuffixService } from './project-my-suffix.service';
import { ProjectMySuffixComponent } from './project-my-suffix.component';
import { ProjectMySuffixDetailComponent } from './project-my-suffix-detail.component';
import { ProjectMySuffixUpdateComponent } from './project-my-suffix-update.component';
import { ProjectMySuffixDeletePopupComponent } from './project-my-suffix-delete-dialog.component';
import { IProjectMySuffix } from 'app/shared/model/project-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ProjectMySuffixResolve implements Resolve<IProjectMySuffix> {
    constructor(private service: ProjectMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((project: HttpResponse<ProjectMySuffix>) => project.body));
        }
        return of(new ProjectMySuffix());
    }
}

export const projectRoute: Routes = [
    {
        path: 'project-my-suffix',
        component: ProjectMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-my-suffix/:id/view',
        component: ProjectMySuffixDetailComponent,
        resolve: {
            project: ProjectMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-my-suffix/new',
        component: ProjectMySuffixUpdateComponent,
        resolve: {
            project: ProjectMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-my-suffix/:id/edit',
        component: ProjectMySuffixUpdateComponent,
        resolve: {
            project: ProjectMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectPopupRoute: Routes = [
    {
        path: 'project-my-suffix/:id/delete',
        component: ProjectMySuffixDeletePopupComponent,
        resolve: {
            project: ProjectMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.project.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
