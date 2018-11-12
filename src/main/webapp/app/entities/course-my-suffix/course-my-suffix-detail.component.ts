import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';

@Component({
    selector: 'jhi-course-my-suffix-detail',
    templateUrl: './course-my-suffix-detail.component.html'
})
export class CourseMySuffixDetailComponent implements OnInit {
    course: ICourseMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ course }) => {
            this.course = course;
        });
    }

    previousState() {
        window.history.back();
    }
}
