import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrganizationMySuffix } from 'app/shared/model/organization-my-suffix.model';

@Component({
    selector: 'jhi-organization-my-suffix-detail',
    templateUrl: './organization-my-suffix-detail.component.html'
})
export class OrganizationMySuffixDetailComponent implements OnInit {
    organization: IOrganizationMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ organization }) => {
            this.organization = organization;
        });
    }

    previousState() {
        window.history.back();
    }
}
