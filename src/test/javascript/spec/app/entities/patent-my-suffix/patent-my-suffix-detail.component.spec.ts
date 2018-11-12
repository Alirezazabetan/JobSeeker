/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { PatentMySuffixDetailComponent } from 'app/entities/patent-my-suffix/patent-my-suffix-detail.component';
import { PatentMySuffix } from 'app/shared/model/patent-my-suffix.model';

describe('Component Tests', () => {
    describe('PatentMySuffix Management Detail Component', () => {
        let comp: PatentMySuffixDetailComponent;
        let fixture: ComponentFixture<PatentMySuffixDetailComponent>;
        const route = ({ data: of({ patent: new PatentMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [PatentMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PatentMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PatentMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.patent).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
