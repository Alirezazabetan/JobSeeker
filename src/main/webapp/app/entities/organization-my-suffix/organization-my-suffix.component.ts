import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrganizationMySuffix } from 'app/shared/model/organization-my-suffix.model';
import { Principal } from 'app/core';
import { OrganizationMySuffixService } from './organization-my-suffix.service';

@Component({
    selector: 'jhi-organization-my-suffix',
    templateUrl: './organization-my-suffix.component.html'
})
export class OrganizationMySuffixComponent implements OnInit, OnDestroy {
    organizations: IOrganizationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private organizationService: OrganizationMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.organizationService.query().subscribe(
            (res: HttpResponse<IOrganizationMySuffix[]>) => {
                this.organizations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrganizations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrganizationMySuffix) {
        return item.id;
    }

    registerChangeInOrganizations() {
        this.eventSubscriber = this.eventManager.subscribe('organizationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
