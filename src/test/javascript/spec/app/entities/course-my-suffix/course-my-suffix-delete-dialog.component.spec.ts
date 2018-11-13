/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JobAngularTestModule } from '../../../test.module';
import { CourseMySuffixDeleteDialogComponent } from 'app/entities/course-my-suffix/course-my-suffix-delete-dialog.component';
import { CourseMySuffixService } from 'app/entities/course-my-suffix/course-my-suffix.service';

describe('Component Tests', () => {
    describe('CourseMySuffix Management Delete Component', () => {
        let comp: CourseMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CourseMySuffixDeleteDialogComponent>;
        let service: CourseMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [CourseMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(CourseMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CourseMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseMySuffixService);
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
