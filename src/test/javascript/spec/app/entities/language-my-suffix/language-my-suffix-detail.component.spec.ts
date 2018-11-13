/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobAngularTestModule } from '../../../test.module';
import { LanguageMySuffixDetailComponent } from 'app/entities/language-my-suffix/language-my-suffix-detail.component';
import { LanguageMySuffix } from 'app/shared/model/language-my-suffix.model';

describe('Component Tests', () => {
    describe('LanguageMySuffix Management Detail Component', () => {
        let comp: LanguageMySuffixDetailComponent;
        let fixture: ComponentFixture<LanguageMySuffixDetailComponent>;
        const route = ({ data: of({ language: new LanguageMySuffix('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [LanguageMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LanguageMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LanguageMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.language).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
