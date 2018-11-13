/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JobAngularTestModule } from '../../../test.module';
import { LanguageMySuffixComponent } from 'app/entities/language-my-suffix/language-my-suffix.component';
import { LanguageMySuffixService } from 'app/entities/language-my-suffix/language-my-suffix.service';
import { LanguageMySuffix } from 'app/shared/model/language-my-suffix.model';

describe('Component Tests', () => {
    describe('LanguageMySuffix Management Component', () => {
        let comp: LanguageMySuffixComponent;
        let fixture: ComponentFixture<LanguageMySuffixComponent>;
        let service: LanguageMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [LanguageMySuffixComponent],
                providers: []
            })
                .overrideTemplate(LanguageMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LanguageMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LanguageMySuffix('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.languages[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
