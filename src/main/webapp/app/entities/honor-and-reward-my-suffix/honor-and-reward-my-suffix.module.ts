import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import {
    HonorAndRewardMySuffixComponent,
    HonorAndRewardMySuffixDetailComponent,
    HonorAndRewardMySuffixUpdateComponent,
    HonorAndRewardMySuffixDeletePopupComponent,
    HonorAndRewardMySuffixDeleteDialogComponent,
    honorAndRewardRoute,
    honorAndRewardPopupRoute
} from './';

const ENTITY_STATES = [...honorAndRewardRoute, ...honorAndRewardPopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HonorAndRewardMySuffixComponent,
        HonorAndRewardMySuffixDetailComponent,
        HonorAndRewardMySuffixUpdateComponent,
        HonorAndRewardMySuffixDeleteDialogComponent,
        HonorAndRewardMySuffixDeletePopupComponent
    ],
    entryComponents: [
        HonorAndRewardMySuffixComponent,
        HonorAndRewardMySuffixUpdateComponent,
        HonorAndRewardMySuffixDeleteDialogComponent,
        HonorAndRewardMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularHonorAndRewardMySuffixModule {}
