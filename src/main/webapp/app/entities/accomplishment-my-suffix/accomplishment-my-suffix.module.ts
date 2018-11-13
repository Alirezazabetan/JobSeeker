import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import {
    AccomplishmentMySuffixComponent,
    AccomplishmentMySuffixDetailComponent,
    AccomplishmentMySuffixUpdateComponent,
    AccomplishmentMySuffixDeletePopupComponent,
    AccomplishmentMySuffixDeleteDialogComponent,
    accomplishmentRoute,
    accomplishmentPopupRoute
} from './';

const ENTITY_STATES = [...accomplishmentRoute, ...accomplishmentPopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AccomplishmentMySuffixComponent,
        AccomplishmentMySuffixDetailComponent,
        AccomplishmentMySuffixUpdateComponent,
        AccomplishmentMySuffixDeleteDialogComponent,
        AccomplishmentMySuffixDeletePopupComponent
    ],
    entryComponents: [
        AccomplishmentMySuffixComponent,
        AccomplishmentMySuffixUpdateComponent,
        AccomplishmentMySuffixDeleteDialogComponent,
        AccomplishmentMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularAccomplishmentMySuffixModule {}
