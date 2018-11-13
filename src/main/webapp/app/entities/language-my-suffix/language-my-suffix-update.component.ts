import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILanguageMySuffix } from 'app/shared/model/language-my-suffix.model';
import { LanguageMySuffixService } from './language-my-suffix.service';

@Component({
    selector: 'jhi-language-my-suffix-update',
    templateUrl: './language-my-suffix-update.component.html'
})
export class LanguageMySuffixUpdateComponent implements OnInit {
    private _language: ILanguageMySuffix;
    isSaving: boolean;

    constructor(private languageService: LanguageMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ language }) => {
            this.language = language;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.language.id !== undefined) {
            this.subscribeToSaveResponse(this.languageService.update(this.language));
        } else {
            this.subscribeToSaveResponse(this.languageService.create(this.language));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILanguageMySuffix>>) {
        result.subscribe((res: HttpResponse<ILanguageMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get language() {
        return this._language;
    }

    set language(language: ILanguageMySuffix) {
        this._language = language;
    }
}
