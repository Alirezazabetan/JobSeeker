/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JobAngularTestModule } from '../../../test.module';
import { CertificationMySuffixComponent } from 'app/entities/certification-my-suffix/certification-my-suffix.component';
import { CertificationMySuffixService } from 'app/entities/certification-my-suffix/certification-my-suffix.service';
import { CertificationMySuffix } from 'app/shared/model/certification-my-suffix.model';

describe('Component Tests', () => {
    describe('CertificationMySuffix Management Component', () => {
        let comp: CertificationMySuffixComponent;
        let fixture: ComponentFixture<CertificationMySuffixComponent>;
        let service: CertificationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [CertificationMySuffixComponent],
                providers: []
            })
                .overrideTemplate(CertificationMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CertificationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CertificationMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CertificationMySuffix('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.certifications[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
