/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JobAngularTestModule } from '../../../test.module';
import { CertificationMySuffixDeleteDialogComponent } from 'app/entities/certification-my-suffix/certification-my-suffix-delete-dialog.component';
import { CertificationMySuffixService } from 'app/entities/certification-my-suffix/certification-my-suffix.service';

describe('Component Tests', () => {
    describe('CertificationMySuffix Management Delete Component', () => {
        let comp: CertificationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CertificationMySuffixDeleteDialogComponent>;
        let service: CertificationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [CertificationMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(CertificationMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CertificationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CertificationMySuffixService);
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
