/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { CertificationMySuffixUpdateComponent } from 'app/entities/certification-my-suffix/certification-my-suffix-update.component';
import { CertificationMySuffixService } from 'app/entities/certification-my-suffix/certification-my-suffix.service';
import { CertificationMySuffix } from 'app/shared/model/certification-my-suffix.model';

describe('Component Tests', () => {
    describe('CertificationMySuffix Management Update Component', () => {
        let comp: CertificationMySuffixUpdateComponent;
        let fixture: ComponentFixture<CertificationMySuffixUpdateComponent>;
        let service: CertificationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [CertificationMySuffixUpdateComponent]
            })
                .overrideTemplate(CertificationMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CertificationMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CertificationMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CertificationMySuffix('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.certification = entity;
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
                    const entity = new CertificationMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.certification = entity;
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
