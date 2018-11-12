import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IIndividualMySuffix } from 'app/shared/model/individual-my-suffix.model';
import { IndividualMySuffixService } from './individual-my-suffix.service';

@Component({
    selector: 'jhi-individual-my-suffix-update',
    templateUrl: './individual-my-suffix-update.component.html'
})
export class IndividualMySuffixUpdateComponent implements OnInit {
    private _individual: IIndividualMySuffix;
    isSaving: boolean;
    birthDate: string;

    constructor(private individualService: IndividualMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ individual }) => {
            this.individual = individual;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.individual.birthDate = moment(this.birthDate, DATE_TIME_FORMAT);
        if (this.individual.id !== undefined) {
            this.subscribeToSaveResponse(this.individualService.update(this.individual));
        } else {
            this.subscribeToSaveResponse(this.individualService.create(this.individual));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IIndividualMySuffix>>) {
        result.subscribe((res: HttpResponse<IIndividualMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get individual() {
        return this._individual;
    }

    set individual(individual: IIndividualMySuffix) {
        this._individual = individual;
        this.birthDate = moment(individual.birthDate).format(DATE_TIME_FORMAT);
    }
}
