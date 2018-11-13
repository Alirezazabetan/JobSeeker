/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { JobPostMySuffixDetailComponent } from 'app/entities/job-post-my-suffix/job-post-my-suffix-detail.component';
import { JobPostMySuffix } from 'app/shared/model/job-post-my-suffix.model';

describe('Component Tests', () => {
    describe('JobPostMySuffix Management Detail Component', () => {
        let comp: JobPostMySuffixDetailComponent;
        let fixture: ComponentFixture<JobPostMySuffixDetailComponent>;
        const route = ({ data: of({ jobPost: new JobPostMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [JobPostMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JobPostMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobPostMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.jobPost).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
