/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { LanguageMySuffixUpdateComponent } from 'app/entities/language-my-suffix/language-my-suffix-update.component';
import { LanguageMySuffixService } from 'app/entities/language-my-suffix/language-my-suffix.service';
import { LanguageMySuffix } from 'app/shared/model/language-my-suffix.model';

describe('Component Tests', () => {
    describe('LanguageMySuffix Management Update Component', () => {
        let comp: LanguageMySuffixUpdateComponent;
        let fixture: ComponentFixture<LanguageMySuffixUpdateComponent>;
        let service: LanguageMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [LanguageMySuffixUpdateComponent]
            })
                .overrideTemplate(LanguageMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LanguageMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LanguageMySuffix('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.language = entity;
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
                    const entity = new LanguageMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.language = entity;
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
