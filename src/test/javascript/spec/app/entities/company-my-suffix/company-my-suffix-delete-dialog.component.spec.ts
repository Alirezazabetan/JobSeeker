/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JobAngularTestModule } from '../../../test.module';
import { CompanyMySuffixDeleteDialogComponent } from 'app/entities/company-my-suffix/company-my-suffix-delete-dialog.component';
import { CompanyMySuffixService } from 'app/entities/company-my-suffix/company-my-suffix.service';

describe('Component Tests', () => {
    describe('CompanyMySuffix Management Delete Component', () => {
        let comp: CompanyMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CompanyMySuffixDeleteDialogComponent>;
        let service: CompanyMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [CompanyMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(CompanyMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyMySuffixService);
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
