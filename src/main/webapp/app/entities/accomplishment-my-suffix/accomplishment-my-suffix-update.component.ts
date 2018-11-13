import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAccomplishmentMySuffix } from 'app/shared/model/accomplishment-my-suffix.model';
import { AccomplishmentMySuffixService } from './accomplishment-my-suffix.service';

@Component({
    selector: 'jhi-accomplishment-my-suffix-update',
    templateUrl: './accomplishment-my-suffix-update.component.html'
})
export class AccomplishmentMySuffixUpdateComponent implements OnInit {
    private _accomplishment: IAccomplishmentMySuffix;
    isSaving: boolean;

    constructor(private accomplishmentService: AccomplishmentMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ accomplishment }) => {
            this.accomplishment = accomplishment;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.accomplishment.id !== undefined) {
            this.subscribeToSaveResponse(this.accomplishmentService.update(this.accomplishment));
        } else {
            this.subscribeToSaveResponse(this.accomplishmentService.create(this.accomplishment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAccomplishmentMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IAccomplishmentMySuffix>) => this.onSaveSuccess(),
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
    get accomplishment() {
        return this._accomplishment;
    }

    set accomplishment(accomplishment: IAccomplishmentMySuffix) {
        this._accomplishment = accomplishment;
    }
}
