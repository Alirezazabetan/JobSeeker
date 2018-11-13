import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';
import { CourseMySuffixService } from './course-my-suffix.service';

@Component({
    selector: 'jhi-course-my-suffix-update',
    templateUrl: './course-my-suffix-update.component.html'
})
export class CourseMySuffixUpdateComponent implements OnInit {
    private _course: ICourseMySuffix;
    isSaving: boolean;

    constructor(private courseService: CourseMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ course }) => {
            this.course = course;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.course.id !== undefined) {
            this.subscribeToSaveResponse(this.courseService.update(this.course));
        } else {
            this.subscribeToSaveResponse(this.courseService.create(this.course));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICourseMySuffix>>) {
        result.subscribe((res: HttpResponse<ICourseMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get course() {
        return this._course;
    }

    set course(course: ICourseMySuffix) {
        this._course = course;
    }
}
