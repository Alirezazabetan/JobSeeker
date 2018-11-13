/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { OrganizationMySuffixUpdateComponent } from 'app/entities/organization-my-suffix/organization-my-suffix-update.component';
import { OrganizationMySuffixService } from 'app/entities/organization-my-suffix/organization-my-suffix.service';
import { OrganizationMySuffix } from 'app/shared/model/organization-my-suffix.model';

describe('Component Tests', () => {
    describe('OrganizationMySuffix Management Update Component', () => {
        let comp: OrganizationMySuffixUpdateComponent;
        let fixture: ComponentFixture<OrganizationMySuffixUpdateComponent>;
        let service: OrganizationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [OrganizationMySuffixUpdateComponent]
            })
                .overrideTemplate(OrganizationMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrganizationMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganizationMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrganizationMySuffix('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.organization = entity;
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
                    const entity = new OrganizationMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.organization = entity;
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
