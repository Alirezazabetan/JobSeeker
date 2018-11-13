/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JobAngularTestModule } from '../../../test.module';
import { PublicationMySuffixDeleteDialogComponent } from 'app/entities/publication-my-suffix/publication-my-suffix-delete-dialog.component';
import { PublicationMySuffixService } from 'app/entities/publication-my-suffix/publication-my-suffix.service';

describe('Component Tests', () => {
    describe('PublicationMySuffix Management Delete Component', () => {
        let comp: PublicationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PublicationMySuffixDeleteDialogComponent>;
        let service: PublicationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [PublicationMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PublicationMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PublicationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublicationMySuffixService);
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
