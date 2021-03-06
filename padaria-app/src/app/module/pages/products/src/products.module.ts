import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonAppModule, FormGridModule } from '@module/shared/src';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import {
  DropDownListModule,
  MultiSelectModule,
} from '@syncfusion/ej2-angular-dropdowns';
import {
  NumericTextBoxModule,
  TextBoxModule,
} from '@syncfusion/ej2-angular-inputs';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { BrandComponent } from './brand/brand.component';
import { ClassificationComponent } from './classification/classification.component';
import { ProductComponent } from './product/product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { UnitMeasureComponent } from './unit-measure/unit-measure.component';

@NgModule({
  declarations: [
    BrandComponent,
    UnitMeasureComponent,
    ProductsComponent,
    ClassificationComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    TextBoxModule,
    FormGridModule,
    DialogModule,
    ReactiveFormsModule,
    TabModule,
    ButtonModule,
    DropDownListModule,
    NumericTextBoxModule,
    ButtonAppModule,
    MultiSelectModule,
    ProductsRoutingModule,
  ],
})
export class ProductsModule {}
