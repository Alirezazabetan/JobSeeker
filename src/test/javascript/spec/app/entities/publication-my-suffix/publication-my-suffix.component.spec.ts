/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JobAngularTestModule } from '../../../test.module';
import { PublicationMySuffixComponent } from 'app/entities/publication-my-suffix/publication-my-suffix.component';
import { PublicationMySuffixService } from 'app/entities/publication-my-suffix/publication-my-suffix.service';
import { PublicationMySuffix } from 'app/shared/model/publication-my-suffix.model';

describe('Component Tests', () => {
    describe('PublicationMySuffix Management Component', () => {
        let comp: PublicationMySuffixComponent;
        let fixture: ComponentFixture<PublicationMySuffixComponent>;
        let service: PublicationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [PublicationMySuffixComponent],
                providers: []
            })
                .overrideTemplate(PublicationMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PublicationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublicationMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PublicationMySuffix('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.publications[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
