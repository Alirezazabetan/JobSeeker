/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { PublicationMySuffixDetailComponent } from 'app/entities/publication-my-suffix/publication-my-suffix-detail.component';
import { PublicationMySuffix } from 'app/shared/model/publication-my-suffix.model';

describe('Component Tests', () => {
    describe('PublicationMySuffix Management Detail Component', () => {
        let comp: PublicationMySuffixDetailComponent;
        let fixture: ComponentFixture<PublicationMySuffixDetailComponent>;
        const route = ({ data: of({ publication: new PublicationMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [PublicationMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PublicationMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PublicationMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.publication).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
