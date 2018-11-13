/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { OrganizationMySuffixDetailComponent } from 'app/entities/organization-my-suffix/organization-my-suffix-detail.component';
import { OrganizationMySuffix } from 'app/shared/model/organization-my-suffix.model';

describe('Component Tests', () => {
    describe('OrganizationMySuffix Management Detail Component', () => {
        let comp: OrganizationMySuffixDetailComponent;
        let fixture: ComponentFixture<OrganizationMySuffixDetailComponent>;
        const route = ({ data: of({ organization: new OrganizationMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [OrganizationMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrganizationMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrganizationMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.organization).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
