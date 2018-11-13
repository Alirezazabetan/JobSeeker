/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JobAngularTestModule } from '../../../test.module';
import { HonorAndRewardMySuffixComponent } from 'app/entities/honor-and-reward-my-suffix/honor-and-reward-my-suffix.component';
import { HonorAndRewardMySuffixService } from 'app/entities/honor-and-reward-my-suffix/honor-and-reward-my-suffix.service';
import { HonorAndRewardMySuffix } from 'app/shared/model/honor-and-reward-my-suffix.model';

describe('Component Tests', () => {
    describe('HonorAndRewardMySuffix Management Component', () => {
        let comp: HonorAndRewardMySuffixComponent;
        let fixture: ComponentFixture<HonorAndRewardMySuffixComponent>;
        let service: HonorAndRewardMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [HonorAndRewardMySuffixComponent],
                providers: []
            })
                .overrideTemplate(HonorAndRewardMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HonorAndRewardMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HonorAndRewardMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HonorAndRewardMySuffix('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.honorAndRewards[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
