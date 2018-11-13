/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JobAngularTestModule } from '../../../test.module';
import { AccomplishmentMySuffixComponent } from 'app/entities/accomplishment-my-suffix/accomplishment-my-suffix.component';
import { AccomplishmentMySuffixService } from 'app/entities/accomplishment-my-suffix/accomplishment-my-suffix.service';
import { AccomplishmentMySuffix } from 'app/shared/model/accomplishment-my-suffix.model';

describe('Component Tests', () => {
    describe('AccomplishmentMySuffix Management Component', () => {
        let comp: AccomplishmentMySuffixComponent;
        let fixture: ComponentFixture<AccomplishmentMySuffixComponent>;
        let service: AccomplishmentMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [AccomplishmentMySuffixComponent],
                providers: []
            })
                .overrideTemplate(AccomplishmentMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccomplishmentMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccomplishmentMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AccomplishmentMySuffix('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.accomplishments[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
