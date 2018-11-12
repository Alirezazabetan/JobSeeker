import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAccomplishmentMySuffix } from 'app/shared/model/accomplishment-my-suffix.model';
import { Principal } from 'app/core';
import { AccomplishmentMySuffixService } from './accomplishment-my-suffix.service';

@Component({
    selector: 'jhi-accomplishment-my-suffix',
    templateUrl: './accomplishment-my-suffix.component.html'
})
export class AccomplishmentMySuffixComponent implements OnInit, OnDestroy {
    accomplishments: IAccomplishmentMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private accomplishmentService: AccomplishmentMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.accomplishmentService.query().subscribe(
            (res: HttpResponse<IAccomplishmentMySuffix[]>) => {
                this.accomplishments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAccomplishments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAccomplishmentMySuffix) {
        return item.id;
    }

    registerChangeInAccomplishments() {
        this.eventSubscriber = this.eventManager.subscribe('accomplishmentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
