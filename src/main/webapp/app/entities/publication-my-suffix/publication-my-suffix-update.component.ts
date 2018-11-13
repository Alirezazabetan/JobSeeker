import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPublicationMySuffix } from 'app/shared/model/publication-my-suffix.model';
import { PublicationMySuffixService } from './publication-my-suffix.service';

@Component({
    selector: 'jhi-publication-my-suffix-update',
    templateUrl: './publication-my-suffix-update.component.html'
})
export class PublicationMySuffixUpdateComponent implements OnInit {
    private _publication: IPublicationMySuffix;
    isSaving: boolean;
    date: string;

    constructor(private publicationService: PublicationMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ publication }) => {
            this.publication = publication;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.publication.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.publication.id !== undefined) {
            this.subscribeToSaveResponse(this.publicationService.update(this.publication));
        } else {
            this.subscribeToSaveResponse(this.publicationService.create(this.publication));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPublicationMySuffix>>) {
        result.subscribe((res: HttpResponse<IPublicationMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get publication() {
        return this._publication;
    }

    set publication(publication: IPublicationMySuffix) {
        this._publication = publication;
        this.date = moment(publication.date).format(DATE_TIME_FORMAT);
    }
}
