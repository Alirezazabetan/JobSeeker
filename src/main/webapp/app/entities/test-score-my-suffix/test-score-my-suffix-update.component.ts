import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITestScoreMySuffix } from 'app/shared/model/test-score-my-suffix.model';
import { TestScoreMySuffixService } from './test-score-my-suffix.service';

@Component({
    selector: 'jhi-test-score-my-suffix-update',
    templateUrl: './test-score-my-suffix-update.component.html'
})
export class TestScoreMySuffixUpdateComponent implements OnInit {
    private _testScore: ITestScoreMySuffix;
    isSaving: boolean;
    date: string;

    constructor(private testScoreService: TestScoreMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ testScore }) => {
            this.testScore = testScore;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.testScore.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.testScore.id !== undefined) {
            this.subscribeToSaveResponse(this.testScoreService.update(this.testScore));
        } else {
            this.subscribeToSaveResponse(this.testScoreService.create(this.testScore));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITestScoreMySuffix>>) {
        result.subscribe((res: HttpResponse<ITestScoreMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get testScore() {
        return this._testScore;
    }

    set testScore(testScore: ITestScoreMySuffix) {
        this._testScore = testScore;
        this.date = moment(testScore.date).format(DATE_TIME_FORMAT);
    }
}
