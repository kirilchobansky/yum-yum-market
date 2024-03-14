import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    {
        path: 'foods',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'search/:search',
                component: DashboardComponent
            },
            {
                path: 'tags/:tag',
                component: DashboardComponent
            },
            {
                path: 'details/:id',
                component: DetailsComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
