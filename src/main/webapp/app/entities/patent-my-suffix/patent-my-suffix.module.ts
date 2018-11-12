import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import {
    PatentMySuffixComponent,
    PatentMySuffixDetailComponent,
    PatentMySuffixUpdateComponent,
    PatentMySuffixDeletePopupComponent,
    PatentMySuffixDeleteDialogComponent,
    patentRoute,
    patentPopupRoute
} from './';

const ENTITY_STATES = [...patentRoute, ...patentPopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PatentMySuffixComponent,
        PatentMySuffixDetailComponent,
        PatentMySuffixUpdateComponent,
        PatentMySuffixDeleteDialogComponent,
        PatentMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PatentMySuffixComponent,
        PatentMySuffixUpdateComponent,
        PatentMySuffixDeleteDialogComponent,
        PatentMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularPatentMySuffixModule {}
