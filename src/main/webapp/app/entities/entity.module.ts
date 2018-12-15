import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JobAngularIndividualMySuffixModule } from './individual-my-suffix/individual-my-suffix.module';
import { JobAngularAccomplishmentMySuffixModule } from './accomplishment-my-suffix/accomplishment-my-suffix.module';
import { JobAngularPublicationMySuffixModule } from './publication-my-suffix/publication-my-suffix.module';
import { JobAngularCertificationMySuffixModule } from './certification-my-suffix/certification-my-suffix.module';
import { JobAngularPatentMySuffixModule } from './patent-my-suffix/patent-my-suffix.module';
import { JobAngularCourseMySuffixModule } from './course-my-suffix/course-my-suffix.module';
import { JobAngularProjectMySuffixModule } from './project-my-suffix/project-my-suffix.module';
import { JobAngularHonorAndRewardMySuffixModule } from './honor-and-reward-my-suffix/honor-and-reward-my-suffix.module';
import { JobAngularTestScoreMySuffixModule } from './test-score-my-suffix/test-score-my-suffix.module';
import { JobAngularLanguageMySuffixModule } from './language-my-suffix/language-my-suffix.module';
import { JobAngularOrganizationMySuffixModule } from './organization-my-suffix/organization-my-suffix.module';
import { JobAngularCompanyMySuffixModule } from './company-my-suffix/company-my-suffix.module';
import { JobAngularJobPostMySuffixModule } from './job-post-my-suffix/job-post-my-suffix.module';
import { JobAngularTypeAheadFocusModule } from '../typeahead-focus/typeahead-focus.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JobAngularIndividualMySuffixModule,
        JobAngularAccomplishmentMySuffixModule,
        JobAngularPublicationMySuffixModule,
        JobAngularCertificationMySuffixModule,
        JobAngularPatentMySuffixModule,
        JobAngularCourseMySuffixModule,
        JobAngularProjectMySuffixModule,
        JobAngularHonorAndRewardMySuffixModule,
        JobAngularTestScoreMySuffixModule,
        JobAngularLanguageMySuffixModule,
        JobAngularOrganizationMySuffixModule,
        JobAngularCompanyMySuffixModule,
        JobAngularJobPostMySuffixModule,
        JobAngularTypeAheadFocusModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobAngularEntityModule {}
