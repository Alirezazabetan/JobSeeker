/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { CourseMySuffixUpdateComponent } from 'app/entities/course-my-suffix/course-my-suffix-update.component';
import { CourseMySuffixService } from 'app/entities/course-my-suffix/course-my-suffix.service';
import { CourseMySuffix } from 'app/shared/model/course-my-suffix.model';

describe('Component Tests', () => {
    describe('CourseMySuffix Management Update Component', () => {
        let comp: CourseMySuffixUpdateComponent;
        let fixture: ComponentFixture<CourseMySuffixUpdateComponent>;
        let service: CourseMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [CourseMySuffixUpdateComponent]
            })
                .overrideTemplate(CourseMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CourseMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CourseMySuffix('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.course = entity;
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
                    const entity = new CourseMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.course = entity;
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
