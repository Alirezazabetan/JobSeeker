import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';
import {
    LanguageMySuffixComponent,
    LanguageMySuffixDetailComponent,
    LanguageMySuffixUpdateComponent,
    LanguageMySuffixDeletePopupComponent,
    LanguageMySuffixDeleteDialogComponent,
    languageRoute,
    languagePopupRoute
} from './';

const ENTITY_STATES = [...languageRoute, ...languagePopupRoute];

@NgModule({
    imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LanguageMySuffixComponent,
        LanguageMySuffixDetailComponent,
        LanguageMySuffixUpdateComponent,
        LanguageMySuffixDeleteDialogComponent,
        LanguageMySuffixDeletePopupComponent
    ],
    entryComponents: [
        LanguageMySuffixComponent,
        LanguageMySuffixUpdateComponent,
        LanguageMySuffixDeleteDialogComponent,
        LanguageMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularLanguageMySuffixModule {}
