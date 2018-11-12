/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { PublicationMySuffixUpdateComponent } from 'app/entities/publication-my-suffix/publication-my-suffix-update.component';
import { PublicationMySuffixService } from 'app/entities/publication-my-suffix/publication-my-suffix.service';
import { PublicationMySuffix } from 'app/shared/model/publication-my-suffix.model';

describe('Component Tests', () => {
    describe('PublicationMySuffix Management Update Component', () => {
        let comp: PublicationMySuffixUpdateComponent;
        let fixture: ComponentFixture<PublicationMySuffixUpdateComponent>;
        let service: PublicationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [PublicationMySuffixUpdateComponent]
            })
                .overrideTemplate(PublicationMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PublicationMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublicationMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PublicationMySuffix('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.publication = entity;
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
                    const entity = new PublicationMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.publication = entity;
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
