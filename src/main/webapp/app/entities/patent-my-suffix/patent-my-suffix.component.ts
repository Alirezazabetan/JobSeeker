import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPatentMySuffix } from 'app/shared/model/patent-my-suffix.model';
import { Principal } from 'app/core';
import { PatentMySuffixService } from './patent-my-suffix.service';

@Component({
    selector: 'jhi-patent-my-suffix',
    templateUrl: './patent-my-suffix.component.html'
})
export class PatentMySuffixComponent implements OnInit, OnDestroy {
    patents: IPatentMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private patentService: PatentMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.patentService.query().subscribe(
            (res: HttpResponse<IPatentMySuffix[]>) => {
                this.patents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPatents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPatentMySuffix) {
        return item.id;
    }

    registerChangeInPatents() {
        this.eventSubscriber = this.eventManager.subscribe('patentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
