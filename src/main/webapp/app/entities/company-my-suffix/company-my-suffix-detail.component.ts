import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanyMySuffix } from 'app/shared/model/company-my-suffix.model';

@Component({
    selector: 'jhi-company-my-suffix-detail',
    templateUrl: './company-my-suffix-detail.component.html'
})
export class CompanyMySuffixDetailComponent implements OnInit {
    company: ICompanyMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
    }

    previousState() {
        window.history.back();
    }
}
