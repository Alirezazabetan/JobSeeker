import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPatentMySuffix } from 'app/shared/model/patent-my-suffix.model';

@Component({
    selector: 'jhi-patent-my-suffix-detail',
    templateUrl: './patent-my-suffix-detail.component.html'
})
export class PatentMySuffixDetailComponent implements OnInit {
    patent: IPatentMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ patent }) => {
            this.patent = patent;
        });
    }

    previousState() {
        window.history.back();
    }
}
