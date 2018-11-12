import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import {
    IndividualMySuffixComponent,
    IndividualMySuffixDetailComponent,
    IndividualMySuffixUpdateComponent,
    IndividualMySuffixDeletePopupComponent,
    IndividualMySuffixDeleteDialogComponent,
    individualRoute,
    individualPopupRoute
} from './';

const ENTITY_STATES = [...individualRoute, ...individualPopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IndividualMySuffixComponent,
        IndividualMySuffixDetailComponent,
        IndividualMySuffixUpdateComponent,
        IndividualMySuffixDeleteDialogComponent,
        IndividualMySuffixDeletePopupComponent
    ],
    entryComponents: [
        IndividualMySuffixComponent,
        IndividualMySuffixUpdateComponent,
        IndividualMySuffixDeleteDialogComponent,
        IndividualMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularIndividualMySuffixModule {}
