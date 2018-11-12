/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { JobPostMySuffixUpdateComponent } from 'app/entities/job-post-my-suffix/job-post-my-suffix-update.component';
import { JobPostMySuffixService } from 'app/entities/job-post-my-suffix/job-post-my-suffix.service';
import { JobPostMySuffix } from 'app/shared/model/job-post-my-suffix.model';

describe('Component Tests', () => {
    describe('JobPostMySuffix Management Update Component', () => {
        let comp: JobPostMySuffixUpdateComponent;
        let fixture: ComponentFixture<JobPostMySuffixUpdateComponent>;
        let service: JobPostMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [JobPostMySuffixUpdateComponent]
            })
                .overrideTemplate(JobPostMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JobPostMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobPostMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new JobPostMySuffix('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.jobPost = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new JobPostMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.jobPost = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
