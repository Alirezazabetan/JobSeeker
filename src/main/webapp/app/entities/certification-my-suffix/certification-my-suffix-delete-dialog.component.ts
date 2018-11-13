import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICertificationMySuffix } from 'app/shared/model/certification-my-suffix.model';
import { CertificationMySuffixService } from './certification-my-suffix.service';

@Component({
    selector: 'jhi-certification-my-suffix-delete-dialog',
    templateUrl: './certification-my-suffix-delete-dialog.component.html'
})
export class CertificationMySuffixDeleteDialogComponent {
    certification: ICertificationMySuffix;

    constructor(
        private certificationService: CertificationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.certificationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'certificationListModification',
                content: 'Deleted an certification'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-certification-my-suffix-delete-popup',
    template: ''
})
export class CertificationMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ certification }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CertificationMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.certification = certification;
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
