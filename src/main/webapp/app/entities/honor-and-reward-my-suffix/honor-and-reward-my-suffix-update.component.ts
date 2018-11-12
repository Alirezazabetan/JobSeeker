import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHonorAndRewardMySuffix } from 'app/shared/model/honor-and-reward-my-suffix.model';
import { HonorAndRewardMySuffixService } from './honor-and-reward-my-suffix.service';

@Component({
    selector: 'jhi-honor-and-reward-my-suffix-update',
    templateUrl: './honor-and-reward-my-suffix-update.component.html'
})
export class HonorAndRewardMySuffixUpdateComponent implements OnInit {
    private _honorAndReward: IHonorAndRewardMySuffix;
    isSaving: boolean;
    date: string;

    constructor(private honorAndRewardService: HonorAndRewardMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ honorAndReward }) => {
            this.honorAndReward = honorAndReward;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.honorAndReward.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.honorAndReward.id !== undefined) {
            this.subscribeToSaveResponse(this.honorAndRewardService.update(this.honorAndReward));
        } else {
            this.subscribeToSaveResponse(this.honorAndRewardService.create(this.honorAndReward));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHonorAndRewardMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IHonorAndRewardMySuffix>) => this.onSaveSuccess(),
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
    get honorAndReward() {
        return this._honorAndReward;
    }

    set honorAndReward(honorAndReward: IHonorAndRewardMySuffix) {
        this._honorAndReward = honorAndReward;
        this.date = moment(honorAndReward.date).format(DATE_TIME_FORMAT);
    }
}
