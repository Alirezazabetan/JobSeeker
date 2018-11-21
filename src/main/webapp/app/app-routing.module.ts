import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { JobListComponent } from 'app/job-list/job-list.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

const routes: Routes = [
    ...LAYOUT_ROUTES,
    {
        path: 'admin',
        loadChildren: './admin/admin.module#JobAngularAdminModule'
    },
    { path: 'job-list', redirectTo: '/job-list', pathMatch: 'full' },
    {
        path: 'job-list',
        component: JobListComponent
    },
    {
        path: 'job-list',
        loadChildren: './admin/admin.module#JobAngularAdminModule'
    }
    // { path: '', component: OriginHomeComponent },
    // { path: '', redirectTo: '/car-list', pathMatch: 'full' },

    // {
    //     path: 'car-list',
    //     component: CarListComponent
    // },
    // {
    //     path: 'car-add',
    //     component: CarEditComponent
    // },
    // {
    //     path: 'car-edit/:id',
    //     component: CarEditComponent
    // },
    // { path: 'login', component: LoginComponent },
    // { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: DEBUG_INFO_ENABLED })],
    exports: [RouterModule]
})
export class JobAngularAppRoutingModule {}
