import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import {
    PublicationMySuffixComponent,
    PublicationMySuffixDetailComponent,
    PublicationMySuffixUpdateComponent,
    PublicationMySuffixDeletePopupComponent,
    PublicationMySuffixDeleteDialogComponent,
    publicationRoute,
    publicationPopupRoute
} from './';

const ENTITY_STATES = [...publicationRoute, ...publicationPopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PublicationMySuffixComponent,
        PublicationMySuffixDetailComponent,
        PublicationMySuffixUpdateComponent,
        PublicationMySuffixDeleteDialogComponent,
        PublicationMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PublicationMySuffixComponent,
        PublicationMySuffixUpdateComponent,
        PublicationMySuffixDeleteDialogComponent,
        PublicationMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularPublicationMySuffixModule {}
