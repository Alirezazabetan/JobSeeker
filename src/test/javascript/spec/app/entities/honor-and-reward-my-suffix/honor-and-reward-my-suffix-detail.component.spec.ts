/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { HonorAndRewardMySuffixDetailComponent } from 'app/entities/honor-and-reward-my-suffix/honor-and-reward-my-suffix-detail.component';
import { HonorAndRewardMySuffix } from 'app/shared/model/honor-and-reward-my-suffix.model';

describe('Component Tests', () => {
    describe('HonorAndRewardMySuffix Management Detail Component', () => {
        let comp: HonorAndRewardMySuffixDetailComponent;
        let fixture: ComponentFixture<HonorAndRewardMySuffixDetailComponent>;
        const route = ({ data: of({ honorAndReward: new HonorAndRewardMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [HonorAndRewardMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HonorAndRewardMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HonorAndRewardMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.honorAndReward).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
