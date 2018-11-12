/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JobAngularTestModule } from '../../../test.module';
import { IndividualMySuffixDeleteDialogComponent } from 'app/entities/individual-my-suffix/individual-my-suffix-delete-dialog.component';
import { IndividualMySuffixService } from 'app/entities/individual-my-suffix/individual-my-suffix.service';

describe('Component Tests', () => {
    describe('IndividualMySuffix Management Delete Component', () => {
        let comp: IndividualMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<IndividualMySuffixDeleteDialogComponent>;
        let service: IndividualMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [IndividualMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(IndividualMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IndividualMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndividualMySuffixService);
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
