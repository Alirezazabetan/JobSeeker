/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { CertificationMySuffixDetailComponent } from 'app/entities/certification-my-suffix/certification-my-suffix-detail.component';
import { CertificationMySuffix } from 'app/shared/model/certification-my-suffix.model';

describe('Component Tests', () => {
    describe('CertificationMySuffix Management Detail Component', () => {
        let comp: CertificationMySuffixDetailComponent;
        let fixture: ComponentFixture<CertificationMySuffixDetailComponent>;
        const route = ({ data: of({ certification: new CertificationMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [CertificationMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CertificationMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CertificationMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.certification).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
