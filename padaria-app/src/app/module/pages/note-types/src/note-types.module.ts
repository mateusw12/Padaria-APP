import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { NoteTypesRoutingModule } from './note-types-routing.module';
import { NoteTypesComponent } from './note-types.component';

@NgModule({
  declarations: [NoteTypesComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    DialogModule,
    GridModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    NoteTypesRoutingModule,
  ],
  exports: [
    NoteTypesComponent
  ]
})
export class NoteTypesModule {}
