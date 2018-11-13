import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPublicationMySuffix } from 'app/shared/model/publication-my-suffix.model';

@Component({
    selector: 'jhi-publication-my-suffix-detail',
    templateUrl: './publication-my-suffix-detail.component.html'
})
export class PublicationMySuffixDetailComponent implements OnInit {
    publication: IPublicationMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ publication }) => {
            this.publication = publication;
        });
    }

    previousState() {
        window.history.back();
    }
}
