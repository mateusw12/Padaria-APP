import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeQueryComponent } from './employee-query.component';

const routes: Routes = [{ path: '', component: EmployeeQueryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeQueryRoutingModule { }
