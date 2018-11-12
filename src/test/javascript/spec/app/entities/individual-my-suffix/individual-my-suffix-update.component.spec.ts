/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { IndividualMySuffixUpdateComponent } from 'app/entities/individual-my-suffix/individual-my-suffix-update.component';
import { IndividualMySuffixService } from 'app/entities/individual-my-suffix/individual-my-suffix.service';
import { IndividualMySuffix } from 'app/shared/model/individual-my-suffix.model';

describe('Component Tests', () => {
    describe('IndividualMySuffix Management Update Component', () => {
        let comp: IndividualMySuffixUpdateComponent;
        let fixture: ComponentFixture<IndividualMySuffixUpdateComponent>;
        let service: IndividualMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [IndividualMySuffixUpdateComponent]
            })
                .overrideTemplate(IndividualMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IndividualMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndividualMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new IndividualMySuffix('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.individual = entity;
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
                    const entity = new IndividualMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.individual = entity;
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
