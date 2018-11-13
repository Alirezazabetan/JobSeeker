/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { AccomplishmentMySuffixDetailComponent } from 'app/entities/accomplishment-my-suffix/accomplishment-my-suffix-detail.component';
import { AccomplishmentMySuffix } from 'app/shared/model/accomplishment-my-suffix.model';

describe('Component Tests', () => {
    describe('AccomplishmentMySuffix Management Detail Component', () => {
        let comp: AccomplishmentMySuffixDetailComponent;
        let fixture: ComponentFixture<AccomplishmentMySuffixDetailComponent>;
        const route = ({ data: of({ accomplishment: new AccomplishmentMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [AccomplishmentMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AccomplishmentMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccomplishmentMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.accomplishment).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
