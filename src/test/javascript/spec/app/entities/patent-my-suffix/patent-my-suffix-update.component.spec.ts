/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { PatentMySuffixUpdateComponent } from 'app/entities/patent-my-suffix/patent-my-suffix-update.component';
import { PatentMySuffixService } from 'app/entities/patent-my-suffix/patent-my-suffix.service';
import { PatentMySuffix } from 'app/shared/model/patent-my-suffix.model';

describe('Component Tests', () => {
    describe('PatentMySuffix Management Update Component', () => {
        let comp: PatentMySuffixUpdateComponent;
        let fixture: ComponentFixture<PatentMySuffixUpdateComponent>;
        let service: PatentMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [PatentMySuffixUpdateComponent]
            })
                .overrideTemplate(PatentMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PatentMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatentMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PatentMySuffix('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.patent = entity;
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
                    const entity = new PatentMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.patent = entity;
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
