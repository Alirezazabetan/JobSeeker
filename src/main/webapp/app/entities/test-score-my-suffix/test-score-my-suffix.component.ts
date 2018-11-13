import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITestScoreMySuffix } from 'app/shared/model/test-score-my-suffix.model';
import { Principal } from 'app/core';
import { TestScoreMySuffixService } from './test-score-my-suffix.service';

@Component({
    selector: 'jhi-test-score-my-suffix',
    templateUrl: './test-score-my-suffix.component.html'
})
export class TestScoreMySuffixComponent implements OnInit, OnDestroy {
    testScores: ITestScoreMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private testScoreService: TestScoreMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.testScoreService.query().subscribe(
            (res: HttpResponse<ITestScoreMySuffix[]>) => {
                this.testScores = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTestScores();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITestScoreMySuffix) {
        return item.id;
    }

    registerChangeInTestScores() {
        this.eventSubscriber = this.eventManager.subscribe('testScoreListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
