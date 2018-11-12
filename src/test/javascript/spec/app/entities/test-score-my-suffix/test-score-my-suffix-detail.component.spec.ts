/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { TestScoreMySuffixDetailComponent } from 'app/entities/test-score-my-suffix/test-score-my-suffix-detail.component';
import { TestScoreMySuffix } from 'app/shared/model/test-score-my-suffix.model';

describe('Component Tests', () => {
    describe('TestScoreMySuffix Management Detail Component', () => {
        let comp: TestScoreMySuffixDetailComponent;
        let fixture: ComponentFixture<TestScoreMySuffixDetailComponent>;
        const route = ({ data: of({ testScore: new TestScoreMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [TestScoreMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestScoreMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestScoreMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testScore).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
