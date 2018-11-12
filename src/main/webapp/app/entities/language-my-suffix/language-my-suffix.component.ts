import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILanguageMySuffix } from 'app/shared/model/language-my-suffix.model';
import { Principal } from 'app/core';
import { LanguageMySuffixService } from './language-my-suffix.service';

@Component({
    selector: 'jhi-language-my-suffix',
    templateUrl: './language-my-suffix.component.html'
})
export class LanguageMySuffixComponent implements OnInit, OnDestroy {
    languages: ILanguageMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private languageService: LanguageMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.languageService.query().subscribe(
            (res: HttpResponse<ILanguageMySuffix[]>) => {
                this.languages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLanguages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILanguageMySuffix) {
        return item.id;
    }

    registerChangeInLanguages() {
        this.eventSubscriber = this.eventManager.subscribe('languageListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
