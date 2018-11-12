import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICompanyMySuffix } from 'app/shared/model/company-my-suffix.model';
import { CompanyMySuffixService } from './company-my-suffix.service';

@Component({
    selector: 'jhi-company-my-suffix-update',
    templateUrl: './company-my-suffix-update.component.html'
})
export class CompanyMySuffixUpdateComponent implements OnInit {
    private _company: ICompanyMySuffix;
    isSaving: boolean;
    startDate: string;

    constructor(private companyService: CompanyMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.company.startDate = moment(this.startDate, DATE_TIME_FORMAT);
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(this.companyService.create(this.company));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompanyMySuffix>>) {
        result.subscribe((res: HttpResponse<ICompanyMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get company() {
        return this._company;
    }

    set company(company: ICompanyMySuffix) {
        this._company = company;
        this.startDate = moment(company.startDate).format(DATE_TIME_FORMAT);
    }
}
