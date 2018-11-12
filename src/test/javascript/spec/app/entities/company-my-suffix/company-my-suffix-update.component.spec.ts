/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { CompanyMySuffixUpdateComponent } from 'app/entities/company-my-suffix/company-my-suffix-update.component';
import { CompanyMySuffixService } from 'app/entities/company-my-suffix/company-my-suffix.service';
import { CompanyMySuffix } from 'app/shared/model/company-my-suffix.model';

describe('Component Tests', () => {
    describe('CompanyMySuffix Management Update Component', () => {
        let comp: CompanyMySuffixUpdateComponent;
        let fixture: ComponentFixture<CompanyMySuffixUpdateComponent>;
        let service: CompanyMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [CompanyMySuffixUpdateComponent]
            })
                .overrideTemplate(CompanyMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CompanyMySuffix('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.company = entity;
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
                    const entity = new CompanyMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.company = entity;
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
