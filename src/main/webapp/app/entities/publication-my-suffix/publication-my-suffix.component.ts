import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPublicationMySuffix } from 'app/shared/model/publication-my-suffix.model';
import { Principal } from 'app/core';
import { PublicationMySuffixService } from './publication-my-suffix.service';

@Component({
    selector: 'jhi-publication-my-suffix',
    templateUrl: './publication-my-suffix.component.html'
})
export class PublicationMySuffixComponent implements OnInit, OnDestroy {
    publications: IPublicationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private publicationService: PublicationMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.publicationService.query().subscribe(
            (res: HttpResponse<IPublicationMySuffix[]>) => {
                this.publications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPublications();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPublicationMySuffix) {
        return item.id;
    }

    registerChangeInPublications() {
        this.eventSubscriber = this.eventManager.subscribe('publicationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
