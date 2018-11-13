import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import {
    TestScoreMySuffixComponent,
    TestScoreMySuffixDetailComponent,
    TestScoreMySuffixUpdateComponent,
    TestScoreMySuffixDeletePopupComponent,
    TestScoreMySuffixDeleteDialogComponent,
    testScoreRoute,
    testScorePopupRoute
} from './';

const ENTITY_STATES = [...testScoreRoute, ...testScorePopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestScoreMySuffixComponent,
        TestScoreMySuffixDetailComponent,
        TestScoreMySuffixUpdateComponent,
        TestScoreMySuffixDeleteDialogComponent,
        TestScoreMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TestScoreMySuffixComponent,
        TestScoreMySuffixUpdateComponent,
        TestScoreMySuffixDeleteDialogComponent,
        TestScoreMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularTestScoreMySuffixModule {}
