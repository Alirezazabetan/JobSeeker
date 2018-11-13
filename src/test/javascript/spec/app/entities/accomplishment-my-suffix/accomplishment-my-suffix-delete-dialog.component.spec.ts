/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JobAngularTestModule } from '../../../test.module';
import { AccomplishmentMySuffixDeleteDialogComponent } from 'app/entities/accomplishment-my-suffix/accomplishment-my-suffix-delete-dialog.component';
import { AccomplishmentMySuffixService } from 'app/entities/accomplishment-my-suffix/accomplishment-my-suffix.service';

describe('Component Tests', () => {
    describe('AccomplishmentMySuffix Management Delete Component', () => {
        let comp: AccomplishmentMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AccomplishmentMySuffixDeleteDialogComponent>;
        let service: AccomplishmentMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [AccomplishmentMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(AccomplishmentMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccomplishmentMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccomplishmentMySuffixService);
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
