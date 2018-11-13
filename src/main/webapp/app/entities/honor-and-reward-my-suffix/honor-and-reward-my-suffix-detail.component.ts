import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHonorAndRewardMySuffix } from 'app/shared/model/honor-and-reward-my-suffix.model';

@Component({
    selector: 'jhi-honor-and-reward-my-suffix-detail',
    templateUrl: './honor-and-reward-my-suffix-detail.component.html'
})
export class HonorAndRewardMySuffixDetailComponent implements OnInit {
    honorAndReward: IHonorAndRewardMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ honorAndReward }) => {
            this.honorAndReward = honorAndReward;
        });
    }

    previousState() {
        window.history.back();
    }
}
