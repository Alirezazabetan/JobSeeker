import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestScoreMySuffix } from 'app/shared/model/test-score-my-suffix.model';
import { TestScoreMySuffixService } from './test-score-my-suffix.service';

@Component({
    selector: 'jhi-test-score-my-suffix-delete-dialog',
    templateUrl: './test-score-my-suffix-delete-dialog.component.html'
})
export class TestScoreMySuffixDeleteDialogComponent {
    testScore: ITestScoreMySuffix;

    constructor(
        private testScoreService: TestScoreMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.testScoreService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testScoreListModification',
                content: 'Deleted an testScore'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-score-my-suffix-delete-popup',
    template: ''
})
export class TestScoreMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testScore }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestScoreMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.testScore = testScore;
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
