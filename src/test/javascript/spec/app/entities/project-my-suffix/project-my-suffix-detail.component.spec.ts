/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { ProjectMySuffixDetailComponent } from 'app/entities/project-my-suffix/project-my-suffix-detail.component';
import { ProjectMySuffix } from 'app/shared/model/project-my-suffix.model';

describe('Component Tests', () => {
    describe('ProjectMySuffix Management Detail Component', () => {
        let comp: ProjectMySuffixDetailComponent;
        let fixture: ComponentFixture<ProjectMySuffixDetailComponent>;
        const route = ({ data: of({ project: new ProjectMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [ProjectMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProjectMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProjectMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.project).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
