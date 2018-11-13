/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { CourseMySuffixDetailComponent } from 'app/entities/course-my-suffix/course-my-suffix-detail.component';
import { CourseMySuffix } from 'app/shared/model/course-my-suffix.model';

describe('Component Tests', () => {
    describe('CourseMySuffix Management Detail Component', () => {
        let comp: CourseMySuffixDetailComponent;
        let fixture: ComponentFixture<CourseMySuffixDetailComponent>;
        const route = ({ data: of({ course: new CourseMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [CourseMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CourseMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CourseMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.course).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
