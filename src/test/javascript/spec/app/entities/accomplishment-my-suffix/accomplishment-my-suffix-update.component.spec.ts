/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { AccomplishmentMySuffixUpdateComponent } from 'app/entities/accomplishment-my-suffix/accomplishment-my-suffix-update.component';
import { AccomplishmentMySuffixService } from 'app/entities/accomplishment-my-suffix/accomplishment-my-suffix.service';
import { AccomplishmentMySuffix } from 'app/shared/model/accomplishment-my-suffix.model';

describe('Component Tests', () => {
    describe('AccomplishmentMySuffix Management Update Component', () => {
        let comp: AccomplishmentMySuffixUpdateComponent;
        let fixture: ComponentFixture<AccomplishmentMySuffixUpdateComponent>;
        let service: AccomplishmentMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [AccomplishmentMySuffixUpdateComponent]
            })
                .overrideTemplate(AccomplishmentMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccomplishmentMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccomplishmentMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AccomplishmentMySuffix('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accomplishment = entity;
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
                    const entity = new AccomplishmentMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accomplishment = entity;
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
