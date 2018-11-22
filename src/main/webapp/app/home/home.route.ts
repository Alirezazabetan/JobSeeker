import { Route, Routes } from '@angular/router';

import { HomeComponent } from './';
import { JobPostMySuffixComponent } from 'app/entities/job-post-my-suffix';

export const HOME_ROUTE: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        }
    },
    {
        path: 'job-post',
        component: JobPostMySuffixComponent,
        data: {
            authorities: [],
            pageTitle: 'jobPost.title'
        }
    }
];

/*{
        path: '/job-post-my-suffix',
        component: JobPostMySuffixComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        }
    }*/
