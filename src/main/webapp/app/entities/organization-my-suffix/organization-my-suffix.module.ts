import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import {
    OrganizationMySuffixComponent,
    OrganizationMySuffixDetailComponent,
    OrganizationMySuffixUpdateComponent,
    OrganizationMySuffixDeletePopupComponent,
    OrganizationMySuffixDeleteDialogComponent,
    organizationRoute,
    organizationPopupRoute
} from './';

const ENTITY_STATES = [...organizationRoute, ...organizationPopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrganizationMySuffixComponent,
        OrganizationMySuffixDetailComponent,
        OrganizationMySuffixUpdateComponent,
        OrganizationMySuffixDeleteDialogComponent,
        OrganizationMySuffixDeletePopupComponent
    ],
    entryComponents: [
        OrganizationMySuffixComponent,
        OrganizationMySuffixUpdateComponent,
        OrganizationMySuffixDeleteDialogComponent,
        OrganizationMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularOrganizationMySuffixModule {}
