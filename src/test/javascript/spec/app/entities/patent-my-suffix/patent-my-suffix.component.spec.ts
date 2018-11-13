/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JobAngularTestModule } from '../../../test.module';
import { PatentMySuffixComponent } from 'app/entities/patent-my-suffix/patent-my-suffix.component';
import { PatentMySuffixService } from 'app/entities/patent-my-suffix/patent-my-suffix.service';
import { PatentMySuffix } from 'app/shared/model/patent-my-suffix.model';

describe('Component Tests', () => {
    describe('PatentMySuffix Management Component', () => {
        let comp: PatentMySuffixComponent;
        let fixture: ComponentFixture<PatentMySuffixComponent>;
        let service: PatentMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [PatentMySuffixComponent],
                providers: []
            })
                .overrideTemplate(PatentMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PatentMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatentMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PatentMySuffix('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.patents[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
