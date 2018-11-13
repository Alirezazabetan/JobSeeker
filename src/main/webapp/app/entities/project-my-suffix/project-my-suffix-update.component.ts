import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProjectMySuffix } from 'app/shared/model/project-my-suffix.model';
import { ProjectMySuffixService } from './project-my-suffix.service';

@Component({
    selector: 'jhi-project-my-suffix-update',
    templateUrl: './project-my-suffix-update.component.html'
})
export class ProjectMySuffixUpdateComponent implements OnInit {
    private _project: IProjectMySuffix;
    isSaving: boolean;
    startDate: string;
    endDate: string;

    constructor(private projectService: ProjectMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ project }) => {
            this.project = project;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.project.startDate = moment(this.startDate, DATE_TIME_FORMAT);
        this.project.endDate = moment(this.endDate, DATE_TIME_FORMAT);
        if (this.project.id !== undefined) {
            this.subscribeToSaveResponse(this.projectService.update(this.project));
        } else {
            this.subscribeToSaveResponse(this.projectService.create(this.project));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProjectMySuffix>>) {
        result.subscribe((res: HttpResponse<IProjectMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get project() {
        return this._project;
    }

    set project(project: IProjectMySuffix) {
        this._project = project;
        this.startDate = moment(project.startDate).format(DATE_TIME_FORMAT);
        this.endDate = moment(project.endDate).format(DATE_TIME_FORMAT);
    }
}
