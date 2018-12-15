import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IJobPostMySuffix } from 'app/shared/model/job-post-my-suffix.model';
import { JobPostMySuffixService } from './job-post-my-suffix.service';

@Component({
    selector: 'jhi-job-post-my-suffix-update',
    templateUrl: './job-post-my-suffix-update.component.html',
    styleUrls: ['../../assets/css/app.min.css', '../../assets/css/custom.css', '../../assets/css/thejobs.css']
})
export class JobPostMySuffixUpdateComponent implements OnInit {
    private _jobPost: IJobPostMySuffix;
    isSaving: boolean;
    startDate: string;
    endDate: string;

    constructor(private jobPostService: JobPostMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ jobPost }) => {
            this.jobPost = jobPost;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.jobPost.startDate = moment(this.startDate, DATE_TIME_FORMAT);
        this.jobPost.endDate = moment(this.endDate, DATE_TIME_FORMAT);
        if (this.jobPost.id !== undefined) {
            this.subscribeToSaveResponse(this.jobPostService.update(this.jobPost));
        } else {
            this.subscribeToSaveResponse(this.jobPostService.create(this.jobPost));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IJobPostMySuffix>>) {
        result.subscribe((res: HttpResponse<IJobPostMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get jobPost() {
        return this._jobPost;
    }

    set jobPost(jobPost: IJobPostMySuffix) {
        this._jobPost = jobPost;
        this.startDate = moment(jobPost.startDate).format(DATE_TIME_FORMAT);
        this.endDate = moment(jobPost.endDate).format(DATE_TIME_FORMAT);
    }
}
