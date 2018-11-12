/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JobAngularTestModule } from '../../../test.module';
import { LanguageMySuffixDeleteDialogComponent } from 'app/entities/language-my-suffix/language-my-suffix-delete-dialog.component';
import { LanguageMySuffixService } from 'app/entities/language-my-suffix/language-my-suffix.service';

describe('Component Tests', () => {
    describe('LanguageMySuffix Management Delete Component', () => {
        let comp: LanguageMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<LanguageMySuffixDeleteDialogComponent>;
        let service: LanguageMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [LanguageMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(LanguageMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LanguageMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageMySuffixService);
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
