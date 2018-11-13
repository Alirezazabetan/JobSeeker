import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import {
    CertificationMySuffixComponent,
    CertificationMySuffixDetailComponent,
    CertificationMySuffixUpdateComponent,
    CertificationMySuffixDeletePopupComponent,
    CertificationMySuffixDeleteDialogComponent,
    certificationRoute,
    certificationPopupRoute
} from './';

const ENTITY_STATES = [...certificationRoute, ...certificationPopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CertificationMySuffixComponent,
        CertificationMySuffixDetailComponent,
        CertificationMySuffixUpdateComponent,
        CertificationMySuffixDeleteDialogComponent,
        CertificationMySuffixDeletePopupComponent
    ],
    entryComponents: [
        CertificationMySuffixComponent,
        CertificationMySuffixUpdateComponent,
        CertificationMySuffixDeleteDialogComponent,
        CertificationMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularCertificationMySuffixModule {}
