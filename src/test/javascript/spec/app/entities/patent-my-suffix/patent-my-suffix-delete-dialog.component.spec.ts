/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JobAngularTestModule } from '../../../test.module';
import { PatentMySuffixDeleteDialogComponent } from 'app/entities/patent-my-suffix/patent-my-suffix-delete-dialog.component';
import { PatentMySuffixService } from 'app/entities/patent-my-suffix/patent-my-suffix.service';

describe('Component Tests', () => {
    describe('PatentMySuffix Management Delete Component', () => {
        let comp: PatentMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PatentMySuffixDeleteDialogComponent>;
        let service: PatentMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [PatentMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PatentMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PatentMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatentMySuffixService);
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
