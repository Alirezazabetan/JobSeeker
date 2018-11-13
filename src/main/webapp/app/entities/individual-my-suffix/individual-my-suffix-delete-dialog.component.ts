import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIndividualMySuffix } from 'app/shared/model/individual-my-suffix.model';
import { IndividualMySuffixService } from './individual-my-suffix.service';

@Component({
    selector: 'jhi-individual-my-suffix-delete-dialog',
    templateUrl: './individual-my-suffix-delete-dialog.component.html'
})
export class IndividualMySuffixDeleteDialogComponent {
    individual: IIndividualMySuffix;

    constructor(
        private individualService: IndividualMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.individualService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'individualListModification',
                content: 'Deleted an individual'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-individual-my-suffix-delete-popup',
    template: ''
})
export class IndividualMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ individual }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IndividualMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.individual = individual;
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
