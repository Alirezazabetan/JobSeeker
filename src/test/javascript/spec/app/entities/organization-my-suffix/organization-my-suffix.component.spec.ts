/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JobAngularTestModule } from '../../../test.module';
import { OrganizationMySuffixComponent } from 'app/entities/organization-my-suffix/organization-my-suffix.component';
import { OrganizationMySuffixService } from 'app/entities/organization-my-suffix/organization-my-suffix.service';
import { OrganizationMySuffix } from 'app/shared/model/organization-my-suffix.model';

describe('Component Tests', () => {
    describe('OrganizationMySuffix Management Component', () => {
        let comp: OrganizationMySuffixComponent;
        let fixture: ComponentFixture<OrganizationMySuffixComponent>;
        let service: OrganizationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JobAngularTestModule],
                declarations: [OrganizationMySuffixComponent],
                providers: []
            })
                .overrideTemplate(OrganizationMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrganizationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganizationMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrganizationMySuffix('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.organizations[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
