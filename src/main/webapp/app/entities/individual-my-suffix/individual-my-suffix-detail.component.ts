import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIndividualMySuffix } from 'app/shared/model/individual-my-suffix.model';

@Component({
    selector: 'jhi-individual-my-suffix-detail',
    templateUrl: './individual-my-suffix-detail.component.html'
})
export class IndividualMySuffixDetailComponent implements OnInit {
    individual: IIndividualMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ individual }) => {
            this.individual = individual;
        });
    }

    previousState() {
        window.history.back();
    }
}
