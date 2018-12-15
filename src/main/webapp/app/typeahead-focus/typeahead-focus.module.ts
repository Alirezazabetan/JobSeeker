import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JobAngularSharedModule } from 'app/shared';

// import { CompanyMySuffixComponent, companyPopupRoute, companyRoute } from '../entities/company-my-suffix';
import { JobFilterPipe } from 'app/job-filter.pipe';

// const ENTITY_STATES = [...companyRoute, ...companyPopupRoute];

@NgModule({
    // imports: [JobAngularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    // declarations: [CompanyMySuffixComponent, JobFilterPipe],
    // entryComponents: [CompanyMySuffixComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularTypeAheadFocusModule {}
