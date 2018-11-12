import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';
import { Principal } from 'app/core';
import { CourseMySuffixService } from './course-my-suffix.service';

@Component({
    selector: 'jhi-course-my-suffix',
    templateUrl: './course-my-suffix.component.html'
})
export class CourseMySuffixComponent implements OnInit, OnDestroy {
    courses: ICourseMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private courseService: CourseMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.courseService.query().subscribe(
            (res: HttpResponse<ICourseMySuffix[]>) => {
                this.courses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCourses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICourseMySuffix) {
        return item.id;
    }

    registerChangeInCourses() {
        this.eventSubscriber = this.eventManager.subscribe('courseListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
