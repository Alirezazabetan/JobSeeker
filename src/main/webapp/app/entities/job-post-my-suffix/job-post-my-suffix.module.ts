import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import { NgxEditorModule } from 'ngx-editor';
import {
    JobPostMySuffixComponent,
    JobPostMySuffixDetailComponent,
    JobPostMySuffixUpdateComponent,
    JobPostMySuffixDeletePopupComponent,
    JobPostMySuffixDeleteDialogComponent,
    jobPostRoute,
    jobPostPopupRoute
} from './';
import { JobFilterPipe } from 'app/job-filter.pipe';
import { TypeaheadFocusComponent } from '../../typeahead-focus/typeahead-focus.component';

const ENTITY_STATES = [...jobPostRoute, ...jobPostPopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES), NgxEditorModule],
    declarations: [
        JobPostMySuffixComponent,
        JobPostMySuffixDetailComponent,
        JobPostMySuffixUpdateComponent,
        JobPostMySuffixDeleteDialogComponent,
        JobPostMySuffixDeletePopupComponent,
        JobFilterPipe,
        TypeaheadFocusComponent
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
