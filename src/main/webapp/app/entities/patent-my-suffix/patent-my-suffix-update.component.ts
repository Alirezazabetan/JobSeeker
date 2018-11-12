import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPatentMySuffix } from 'app/shared/model/patent-my-suffix.model';
import { PatentMySuffixService } from './patent-my-suffix.service';

@Component({
    selector: 'jhi-patent-my-suffix-update',
    templateUrl: './patent-my-suffix-update.component.html'
})
export class PatentMySuffixUpdateComponent implements OnInit {
    private _patent: IPatentMySuffix;
    isSaving: boolean;

    constructor(private patentService: PatentMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ patent }) => {
            this.patent = patent;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.patent.id !== undefined) {
            this.subscribeToSaveResponse(this.patentService.update(this.patent));
        } else {
            this.subscribeToSaveResponse(this.patentService.create(this.patent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPatentMySuffix>>) {
        result.subscribe((res: HttpResponse<IPatentMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get patent() {
        return this._patent;
    }

    set patent(patent: IPatentMySuffix) {
        this._patent = patent;
    }
}
