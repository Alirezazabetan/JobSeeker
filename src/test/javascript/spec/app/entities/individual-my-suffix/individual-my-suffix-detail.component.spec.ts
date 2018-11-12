/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { IndividualMySuffixDetailComponent } from 'app/entities/individual-my-suffix/individual-my-suffix-detail.component';
import { IndividualMySuffix } from 'app/shared/model/individual-my-suffix.model';

describe('Component Tests', () => {
    describe('IndividualMySuffix Management Detail Component', () => {
        let comp: IndividualMySuffixDetailComponent;
        let fixture: ComponentFixture<IndividualMySuffixDetailComponent>;
        const route = ({ data: of({ individual: new IndividualMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [IndividualMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IndividualMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IndividualMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.individual).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
