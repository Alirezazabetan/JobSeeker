import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILanguageMySuffix } from 'app/shared/model/language-my-suffix.model';

@Component({
    selector: 'jhi-language-my-suffix-detail',
    templateUrl: './language-my-suffix-detail.component.html'
})
export class LanguageMySuffixDetailComponent implements OnInit {
    language: ILanguageMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ language }) => {
            this.language = language;
        });
    }

    previousState() {
        window.history.back();
    }
}
