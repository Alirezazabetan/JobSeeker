import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['../assets/css/app.min.css', '../assets/css/custom.css', '../assets/css/thejobs.css']
    // styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    constructor(private principal: Principal, private loginModalService: LoginModalService, private eventManager: JhiEventManager) {}

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
