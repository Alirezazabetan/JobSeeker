import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import {
    JobPostMySuffixComponent,
    JobPostMySuffixDetailComponent,
    JobPostMySuffixUpdateComponent,
    JobPostMySuffixDeletePopupComponent,
    JobPostMySuffixDeleteDialogComponent,
    jobPostRoute,
    jobPostPopupRoute
} from './';

const ENTITY_STATES = [...jobPostRoute, ...jobPostPopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobPostMySuffixComponent,
        JobPostMySuffixDetailComponent,
        JobPostMySuffixUpdateComponent,
        JobPostMySuffixDeleteDialogComponent,
        JobPostMySuffixDeletePopupComponent
    ],
    entryComponents: [
        JobPostMySuffixComponent,
        JobPostMySuffixUpdateComponent,
        JobPostMySuffixDeleteDialogComponent,
        JobPostMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularJobPostMySuffixModule {}
