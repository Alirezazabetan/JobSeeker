/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { ProjectMySuffixUpdateComponent } from 'app/entities/project-my-suffix/project-my-suffix-update.component';
import { ProjectMySuffixService } from 'app/entities/project-my-suffix/project-my-suffix.service';
import { ProjectMySuffix } from 'app/shared/model/project-my-suffix.model';

describe('Component Tests', () => {
    describe('ProjectMySuffix Management Update Component', () => {
        let comp: ProjectMySuffixUpdateComponent;
        let fixture: ComponentFixture<ProjectMySuffixUpdateComponent>;
        let service: ProjectMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [ProjectMySuffixUpdateComponent]
            })
                .overrideTemplate(ProjectMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProjectMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProjectMySuffix('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.project = entity;
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
                    const entity = new ProjectMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.project = entity;
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
