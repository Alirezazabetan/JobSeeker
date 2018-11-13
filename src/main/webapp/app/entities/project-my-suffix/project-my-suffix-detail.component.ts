import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProjectMySuffix } from 'app/shared/model/project-my-suffix.model';

@Component({
    selector: 'jhi-project-my-suffix-detail',
    templateUrl: './project-my-suffix-detail.component.html'
})
export class ProjectMySuffixDetailComponent implements OnInit {
    project: IProjectMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ project }) => {
            this.project = project;
        });
    }

    previousState() {
        window.history.back();
    }
}
