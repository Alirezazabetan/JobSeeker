/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JobAngularTestModule } from '../../../test.module';
import { ProjectMySuffixComponent } from 'app/entities/project-my-suffix/project-my-suffix.component';
import { ProjectMySuffixService } from 'app/entities/project-my-suffix/project-my-suffix.service';
import { ProjectMySuffix } from 'app/shared/model/project-my-suffix.model';

describe('Component Tests', () => {
    describe('ProjectMySuffix Management Component', () => {
        let comp: ProjectMySuffixComponent;
        let fixture: ComponentFixture<ProjectMySuffixComponent>;
        let service: ProjectMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [ProjectMySuffixComponent],
                providers: []
            })
                .overrideTemplate(ProjectMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProjectMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProjectMySuffix('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.projects[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
