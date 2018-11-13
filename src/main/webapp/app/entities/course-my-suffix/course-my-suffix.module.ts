import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import {
    CourseMySuffixComponent,
    CourseMySuffixDetailComponent,
    CourseMySuffixUpdateComponent,
    CourseMySuffixDeletePopupComponent,
    CourseMySuffixDeleteDialogComponent,
    courseRoute,
    coursePopupRoute
} from './';

const ENTITY_STATES = [...courseRoute, ...coursePopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CourseMySuffixComponent,
        CourseMySuffixDetailComponent,
        CourseMySuffixUpdateComponent,
        CourseMySuffixDeleteDialogComponent,
        CourseMySuffixDeletePopupComponent
    ],
    entryComponents: [
        CourseMySuffixComponent,
        CourseMySuffixUpdateComponent,
        CourseMySuffixDeleteDialogComponent,
        CourseMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularCourseMySuffixModule {}
