import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/admin/shared/guards/auth-guard.service';

import { DashboardComponent } from './dashboard.component';
import { CategoryComponent } from './category/category.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CollectionComponent } from './collection/collection.component';
import { FeatureComponent } from './feature/feature.component';
import { UploadComponent } from './upload/upload.component';
import { ProductComponent } from './product/product.component';

export const dashBoardRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'dashboard/product',
    component: ProductComponent
  },
  {
    path: 'dashboard/category',
    component: CategoryComponent
  },
  {
    path: 'dashboard/supplier',
    component: SupplierComponent
  },
  {
    path: 'dashboard/collection',
    component: CollectionComponent
  },
  {
    path: 'dashboard/feature',
    component: FeatureComponent
  },
  {
    path: 'dashboard/upload',
    component: UploadComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashBoardRoutes)
  ],
  exports: [
    RouterModule,
  ]
})
export class DashboardRoutingModule {}
