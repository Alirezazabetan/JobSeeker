import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHonorAndRewardMySuffix } from 'app/shared/model/honor-and-reward-my-suffix.model';
import { HonorAndRewardMySuffixService } from './honor-and-reward-my-suffix.service';

@Component({
    selector: 'jhi-honor-and-reward-my-suffix-delete-dialog',
    templateUrl: './honor-and-reward-my-suffix-delete-dialog.component.html'
})
export class HonorAndRewardMySuffixDeleteDialogComponent {
    honorAndReward: IHonorAndRewardMySuffix;

    constructor(
        private honorAndRewardService: HonorAndRewardMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.honorAndRewardService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'honorAndRewardListModification',
                content: 'Deleted an honorAndReward'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-honor-and-reward-my-suffix-delete-popup',
    template: ''
})
export class HonorAndRewardMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ honorAndReward }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HonorAndRewardMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.honorAndReward = honorAndReward;
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
