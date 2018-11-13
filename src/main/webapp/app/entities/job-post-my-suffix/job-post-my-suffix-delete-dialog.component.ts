import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobPostMySuffix } from 'app/shared/model/job-post-my-suffix.model';
import { JobPostMySuffixService } from './job-post-my-suffix.service';

@Component({
    selector: 'jhi-job-post-my-suffix-delete-dialog',
    templateUrl: './job-post-my-suffix-delete-dialog.component.html'
})
export class JobPostMySuffixDeleteDialogComponent {
    jobPost: IJobPostMySuffix;

    constructor(
        private jobPostService: JobPostMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.jobPostService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jobPostListModification',
                content: 'Deleted an jobPost'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-post-my-suffix-delete-popup',
    template: ''
})
export class JobPostMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobPost }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(JobPostMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.jobPost = jobPost;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
