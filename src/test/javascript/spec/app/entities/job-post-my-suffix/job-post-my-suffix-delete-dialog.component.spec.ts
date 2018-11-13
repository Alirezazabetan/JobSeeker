/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JobAngularTestModule } from '../../../test.module';
import { JobPostMySuffixDeleteDialogComponent } from 'app/entities/job-post-my-suffix/job-post-my-suffix-delete-dialog.component';
import { JobPostMySuffixService } from 'app/entities/job-post-my-suffix/job-post-my-suffix.service';

describe('Component Tests', () => {
    describe('JobPostMySuffix Management Delete Component', () => {
        let comp: JobPostMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<JobPostMySuffixDeleteDialogComponent>;
        let service: JobPostMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [JobPostMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(JobPostMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobPostMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobPostMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
