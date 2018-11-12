import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProjectMySuffix } from 'app/shared/model/project-my-suffix.model';
import { ProjectMySuffixService } from './project-my-suffix.service';

@Component({
    selector: 'jhi-project-my-suffix-delete-dialog',
    templateUrl: './project-my-suffix-delete-dialog.component.html'
})
export class ProjectMySuffixDeleteDialogComponent {
    project: IProjectMySuffix;

    constructor(
        private projectService: ProjectMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.projectService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'projectListModification',
                content: 'Deleted an project'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-project-my-suffix-delete-popup',
    template: ''
})
export class ProjectMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ project }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProjectMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.project = project;
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
