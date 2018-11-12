/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { CompanyMySuffixDetailComponent } from 'app/entities/company-my-suffix/company-my-suffix-detail.component';
import { CompanyMySuffix } from 'app/shared/model/company-my-suffix.model';

describe('Component Tests', () => {
    describe('CompanyMySuffix Management Detail Component', () => {
        let comp: CompanyMySuffixDetailComponent;
        let fixture: ComponentFixture<CompanyMySuffixDetailComponent>;
        const route = ({ data: of({ company: new CompanyMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [CompanyMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompanyMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.company).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
