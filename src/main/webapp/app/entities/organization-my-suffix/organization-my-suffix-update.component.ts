import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOrganizationMySuffix } from 'app/shared/model/organization-my-suffix.model';
import { OrganizationMySuffixService } from './organization-my-suffix.service';

@Component({
    selector: 'jhi-organization-my-suffix-update',
    templateUrl: './organization-my-suffix-update.component.html'
})
export class OrganizationMySuffixUpdateComponent implements OnInit {
    private _organization: IOrganizationMySuffix;
    isSaving: boolean;
    startDate: string;
    endDate: string;

    constructor(private organizationService: OrganizationMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ organization }) => {
            this.organization = organization;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.organization.startDate = moment(this.startDate, DATE_TIME_FORMAT);
        this.organization.endDate = moment(this.endDate, DATE_TIME_FORMAT);
        if (this.organization.id !== undefined) {
            this.subscribeToSaveResponse(this.organizationService.update(this.organization));
        } else {
            this.subscribeToSaveResponse(this.organizationService.create(this.organization));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrganizationMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IOrganizationMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get organization() {
        return this._organization;
    }

    set organization(organization: IOrganizationMySuffix) {
        this._organization = organization;
        this.startDate = moment(organization.startDate).format(DATE_TIME_FORMAT);
        this.endDate = moment(organization.endDate).format(DATE_TIME_FORMAT);
    }
}
