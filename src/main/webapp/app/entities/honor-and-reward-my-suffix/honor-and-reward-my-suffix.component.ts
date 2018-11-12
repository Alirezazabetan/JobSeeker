import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHonorAndRewardMySuffix } from 'app/shared/model/honor-and-reward-my-suffix.model';
import { Principal } from 'app/core';
import { HonorAndRewardMySuffixService } from './honor-and-reward-my-suffix.service';

@Component({
    selector: 'jhi-honor-and-reward-my-suffix',
    templateUrl: './honor-and-reward-my-suffix.component.html'
})
export class HonorAndRewardMySuffixComponent implements OnInit, OnDestroy {
    honorAndRewards: IHonorAndRewardMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private honorAndRewardService: HonorAndRewardMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.honorAndRewardService.query().subscribe(
            (res: HttpResponse<IHonorAndRewardMySuffix[]>) => {
                this.honorAndRewards = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHonorAndRewards();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHonorAndRewardMySuffix) {
        return item.id;
    }

    registerChangeInHonorAndRewards() {
        this.eventSubscriber = this.eventManager.subscribe('honorAndRewardListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
