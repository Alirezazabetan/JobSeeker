/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JobAngularTestModule } from '../../../test.module';
import { HonorAndRewardMySuffixDeleteDialogComponent } from 'app/entities/honor-and-reward-my-suffix/honor-and-reward-my-suffix-delete-dialog.component';
import { HonorAndRewardMySuffixService } from 'app/entities/honor-and-reward-my-suffix/honor-and-reward-my-suffix.service';

describe('Component Tests', () => {
    describe('HonorAndRewardMySuffix Management Delete Component', () => {
        let comp: HonorAndRewardMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<HonorAndRewardMySuffixDeleteDialogComponent>;
        let service: HonorAndRewardMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [HonorAndRewardMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(HonorAndRewardMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HonorAndRewardMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HonorAndRewardMySuffixService);
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
