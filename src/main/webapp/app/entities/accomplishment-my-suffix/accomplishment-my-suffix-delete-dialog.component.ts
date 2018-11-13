import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAccomplishmentMySuffix } from 'app/shared/model/accomplishment-my-suffix.model';
import { AccomplishmentMySuffixService } from './accomplishment-my-suffix.service';

@Component({
    selector: 'jhi-accomplishment-my-suffix-delete-dialog',
    templateUrl: './accomplishment-my-suffix-delete-dialog.component.html'
})
export class AccomplishmentMySuffixDeleteDialogComponent {
    accomplishment: IAccomplishmentMySuffix;

    constructor(
        private accomplishmentService: AccomplishmentMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.accomplishmentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'accomplishmentListModification',
                content: 'Deleted an accomplishment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-accomplishment-my-suffix-delete-popup',
    template: ''
})
export class AccomplishmentMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accomplishment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AccomplishmentMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.accomplishment = accomplishment;
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
