/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JobAngularTestModule } from '../../../test.module';
import { CourseMySuffixComponent } from 'app/entities/course-my-suffix/course-my-suffix.component';
import { CourseMySuffixService } from 'app/entities/course-my-suffix/course-my-suffix.service';
import { CourseMySuffix } from 'app/shared/model/course-my-suffix.model';

describe('Component Tests', () => {
    describe('CourseMySuffix Management Component', () => {
        let comp: CourseMySuffixComponent;
        let fixture: ComponentFixture<CourseMySuffixComponent>;
        let service: CourseMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [CourseMySuffixComponent],
                providers: []
            })
                .overrideTemplate(CourseMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CourseMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CourseMySuffix('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.courses[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
