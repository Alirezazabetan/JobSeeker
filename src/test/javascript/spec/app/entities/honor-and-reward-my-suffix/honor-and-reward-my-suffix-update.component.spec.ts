/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { HonorAndRewardMySuffixUpdateComponent } from 'app/entities/honor-and-reward-my-suffix/honor-and-reward-my-suffix-update.component';
import { HonorAndRewardMySuffixService } from 'app/entities/honor-and-reward-my-suffix/honor-and-reward-my-suffix.service';
import { HonorAndRewardMySuffix } from 'app/shared/model/honor-and-reward-my-suffix.model';

describe('Component Tests', () => {
    describe('HonorAndRewardMySuffix Management Update Component', () => {
        let comp: HonorAndRewardMySuffixUpdateComponent;
        let fixture: ComponentFixture<HonorAndRewardMySuffixUpdateComponent>;
        let service: HonorAndRewardMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [HonorAndRewardMySuffixUpdateComponent]
            })
                .overrideTemplate(HonorAndRewardMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HonorAndRewardMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HonorAndRewardMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HonorAndRewardMySuffix('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.honorAndReward = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HonorAndRewardMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.honorAndReward = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
