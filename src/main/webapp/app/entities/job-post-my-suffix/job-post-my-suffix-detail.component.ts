import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobPostMySuffix } from 'app/shared/model/job-post-my-suffix.model';

@Component({
    selector: 'jhi-job-post-my-suffix-detail',
    templateUrl: './job-post-my-suffix-detail.component.html'
})
export class JobPostMySuffixDetailComponent implements OnInit {
    jobPost: IJobPostMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobPost }) => {
            this.jobPost = jobPost;
        });
    }

    previousState() {
        window.history.back();
    }
}
