import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import {
    CompanyMySuffixComponent,
    CompanyMySuffixDetailComponent,
    CompanyMySuffixUpdateComponent,
    CompanyMySuffixDeletePopupComponent,
    CompanyMySuffixDeleteDialogComponent,
    companyRoute,
    companyPopupRoute
} from './';

const ENTITY_STATES = [...companyRoute, ...companyPopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanyMySuffixComponent,
        CompanyMySuffixDetailComponent,
        CompanyMySuffixUpdateComponent,
        CompanyMySuffixDeleteDialogComponent,
        CompanyMySuffixDeletePopupComponent
    ],
    entryComponents: [
        CompanyMySuffixComponent,
        CompanyMySuffixUpdateComponent,
        CompanyMySuffixDeleteDialogComponent,
        CompanyMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularCompanyMySuffixModule {}
