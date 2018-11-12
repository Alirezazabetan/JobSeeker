/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JobAngularTestModule } from '../../../test.module';
import { TestScoreMySuffixDeleteDialogComponent } from 'app/entities/test-score-my-suffix/test-score-my-suffix-delete-dialog.component';
import { TestScoreMySuffixService } from 'app/entities/test-score-my-suffix/test-score-my-suffix.service';

describe('Component Tests', () => {
    describe('TestScoreMySuffix Management Delete Component', () => {
        let comp: TestScoreMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TestScoreMySuffixDeleteDialogComponent>;
        let service: TestScoreMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [TestScoreMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(TestScoreMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestScoreMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestScoreMySuffixService);
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
