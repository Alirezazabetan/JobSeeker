import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICertificationMySuffix } from 'app/shared/model/certification-my-suffix.model';
import { Principal } from 'app/core';
import { CertificationMySuffixService } from './certification-my-suffix.service';

@Component({
    selector: 'jhi-certification-my-suffix',
    templateUrl: './certification-my-suffix.component.html'
})
export class CertificationMySuffixComponent implements OnInit, OnDestroy {
    certifications: ICertificationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private certificationService: CertificationMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.certificationService.query().subscribe(
            (res: HttpResponse<ICertificationMySuffix[]>) => {
                this.certifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCertifications();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICertificationMySuffix) {
        return item.id;
    }

    registerChangeInCertifications() {
        this.eventSubscriber = this.eventManager.subscribe('certificationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
