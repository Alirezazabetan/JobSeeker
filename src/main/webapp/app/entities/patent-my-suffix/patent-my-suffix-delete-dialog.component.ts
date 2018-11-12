import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPatentMySuffix } from 'app/shared/model/patent-my-suffix.model';
import { PatentMySuffixService } from './patent-my-suffix.service';

@Component({
    selector: 'jhi-patent-my-suffix-delete-dialog',
    templateUrl: './patent-my-suffix-delete-dialog.component.html'
})
export class PatentMySuffixDeleteDialogComponent {
    patent: IPatentMySuffix;

    constructor(private patentService: PatentMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.patentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'patentListModification',
                content: 'Deleted an patent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-patent-my-suffix-delete-popup',
    template: ''
})
export class PatentMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ patent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PatentMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.patent = patent;
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
