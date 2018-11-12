import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICertificationMySuffix } from 'app/shared/model/certification-my-suffix.model';
import { CertificationMySuffixService } from './certification-my-suffix.service';

@Component({
    selector: 'jhi-certification-my-suffix-update',
    templateUrl: './certification-my-suffix-update.component.html'
})
export class CertificationMySuffixUpdateComponent implements OnInit {
    private _certification: ICertificationMySuffix;
    isSaving: boolean;
    startDate: string;
    endDate: string;

    constructor(private certificationService: CertificationMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ certification }) => {
            this.certification = certification;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.certification.startDate = moment(this.startDate, DATE_TIME_FORMAT);
        this.certification.endDate = moment(this.endDate, DATE_TIME_FORMAT);
        if (this.certification.id !== undefined) {
            this.subscribeToSaveResponse(this.certificationService.update(this.certification));
        } else {
            this.subscribeToSaveResponse(this.certificationService.create(this.certification));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICertificationMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ICertificationMySuffix>) => this.onSaveSuccess(),
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
    get certification() {
        return this._certification;
    }

    set certification(certification: ICertificationMySuffix) {
        this._certification = certification;
        this.startDate = moment(certification.startDate).format(DATE_TIME_FORMAT);
        this.endDate = moment(certification.endDate).format(DATE_TIME_FORMAT);
    }
}
