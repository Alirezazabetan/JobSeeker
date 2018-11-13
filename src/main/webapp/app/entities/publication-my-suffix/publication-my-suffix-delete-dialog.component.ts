import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPublicationMySuffix } from 'app/shared/model/publication-my-suffix.model';
import { PublicationMySuffixService } from './publication-my-suffix.service';

@Component({
    selector: 'jhi-publication-my-suffix-delete-dialog',
    templateUrl: './publication-my-suffix-delete-dialog.component.html'
})
export class PublicationMySuffixDeleteDialogComponent {
    publication: IPublicationMySuffix;

    constructor(
        private publicationService: PublicationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.publicationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'publicationListModification',
                content: 'Deleted an publication'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-publication-my-suffix-delete-popup',
    template: ''
})
export class PublicationMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ publication }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PublicationMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.publication = publication;
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
