import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccomplishmentMySuffix } from 'app/shared/model/accomplishment-my-suffix.model';

@Component({
    selector: 'jhi-accomplishment-my-suffix-detail',
    templateUrl: './accomplishment-my-suffix-detail.component.html'
})
export class AccomplishmentMySuffixDetailComponent implements OnInit {
    accomplishment: IAccomplishmentMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accomplishment }) => {
            this.accomplishment = accomplishment;
        });
    }

    previousState() {
        window.history.back();
    }
}
