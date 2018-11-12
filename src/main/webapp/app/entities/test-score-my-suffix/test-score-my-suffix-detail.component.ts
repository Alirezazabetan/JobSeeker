import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestScoreMySuffix } from 'app/shared/model/test-score-my-suffix.model';

@Component({
    selector: 'jhi-test-score-my-suffix-detail',
    templateUrl: './test-score-my-suffix-detail.component.html'
})
export class TestScoreMySuffixDetailComponent implements OnInit {
    testScore: ITestScoreMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testScore }) => {
            this.testScore = testScore;
        });
    }

    previousState() {
        window.history.back();
    }
}
