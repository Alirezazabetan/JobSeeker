/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JobAngularTestModule } from '../../../test.module';
import { TestScoreMySuffixComponent } from 'app/entities/test-score-my-suffix/test-score-my-suffix.component';
import { TestScoreMySuffixService } from 'app/entities/test-score-my-suffix/test-score-my-suffix.service';
import { TestScoreMySuffix } from 'app/shared/model/test-score-my-suffix.model';

describe('Component Tests', () => {
    describe('TestScoreMySuffix Management Component', () => {
        let comp: TestScoreMySuffixComponent;
        let fixture: ComponentFixture<TestScoreMySuffixComponent>;
        let service: TestScoreMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [TestScoreMySuffixComponent],
                providers: []
            })
                .overrideTemplate(TestScoreMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestScoreMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestScoreMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TestScoreMySuffix('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.testScores[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
