import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICertificationMySuffix } from 'app/shared/model/certification-my-suffix.model';

@Component({
    selector: 'jhi-certification-my-suffix-detail',
    templateUrl: './certification-my-suffix-detail.component.html'
})
export class CertificationMySuffixDetailComponent implements OnInit {
    certification: ICertificationMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ certification }) => {
            this.certification = certification;
        });
    }

    previousState() {
        window.history.back();
    }
}
