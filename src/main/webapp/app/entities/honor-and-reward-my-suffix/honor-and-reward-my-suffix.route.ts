import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HonorAndRewardMySuffix } from 'app/shared/model/honor-and-reward-my-suffix.model';
import { HonorAndRewardMySuffixService } from './honor-and-reward-my-suffix.service';
import { HonorAndRewardMySuffixComponent } from './honor-and-reward-my-suffix.component';
import { HonorAndRewardMySuffixDetailComponent } from './honor-and-reward-my-suffix-detail.component';
import { HonorAndRewardMySuffixUpdateComponent } from './honor-and-reward-my-suffix-update.component';
import { HonorAndRewardMySuffixDeletePopupComponent } from './honor-and-reward-my-suffix-delete-dialog.component';
import { IHonorAndRewardMySuffix } from 'app/shared/model/honor-and-reward-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class HonorAndRewardMySuffixResolve implements Resolve<IHonorAndRewardMySuffix> {
    constructor(private service: HonorAndRewardMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((honorAndReward: HttpResponse<HonorAndRewardMySuffix>) => honorAndReward.body));
        }
        return of(new HonorAndRewardMySuffix());
    }
}

export const honorAndRewardRoute: Routes = [
    {
        path: 'honor-and-reward-my-suffix',
        component: HonorAndRewardMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.honorAndReward.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'honor-and-reward-my-suffix/:id/view',
        component: HonorAndRewardMySuffixDetailComponent,
        resolve: {
            honorAndReward: HonorAndRewardMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.honorAndReward.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'honor-and-reward-my-suffix/new',
        component: HonorAndRewardMySuffixUpdateComponent,
        resolve: {
            honorAndReward: HonorAndRewardMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.honorAndReward.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'honor-and-reward-my-suffix/:id/edit',
        component: HonorAndRewardMySuffixUpdateComponent,
        resolve: {
            honorAndReward: HonorAndRewardMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.honorAndReward.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const honorAndRewardPopupRoute: Routes = [
    {
        path: 'honor-and-reward-my-suffix/:id/delete',
        component: HonorAndRewardMySuffixDeletePopupComponent,
        resolve: {
            honorAndReward: HonorAndRewardMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobAngularApp.honorAndReward.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
