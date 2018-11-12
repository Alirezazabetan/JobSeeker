import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrganizationMySuffix } from 'app/shared/model/organization-my-suffix.model';
import { OrganizationMySuffixService } from './organization-my-suffix.service';

@Component({
    selector: 'jhi-organization-my-suffix-delete-dialog',
    templateUrl: './organization-my-suffix-delete-dialog.component.html'
})
export class OrganizationMySuffixDeleteDialogComponent {
    organization: IOrganizationMySuffix;

    constructor(
        private organizationService: OrganizationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.organizationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'organizationListModification',
                content: 'Deleted an organization'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-organization-my-suffix-delete-popup',
    template: ''
})
export class OrganizationMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ organization }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrganizationMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.organization = organization;
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
