import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitMeasure } from '@module/models';
import { UnitMeasureService } from '@module/services';
import { ToastService } from '@module/utils/services';
import { untilDestroyed } from '@module/utils/common';
import { SortService } from '@syncfusion/ej2-angular-grids';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { FormGridCommandEventArgs } from '@module/shared/src/form-grid/formgrid.component';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
  abbreviation: string;
}

@Component({
  selector: 'app-unit-measure',
  templateUrl: './unit-measure.component.html',
  providers: [SortService, UnitMeasureService, DialogComponent],
})
export class UnitMeasureComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true })
  modal!: DialogComponent;

  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  isModalOpen = false;
  columns: SfGridColumnModel[] = this.createColumns();

  constructor(
    private toastService: ToastService,
    private unitMeasureService: UnitMeasureService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        this.findUnitMeasure(id);
      }
      this.isModalOpen = true;
      this.modal.show();
    } catch (error) {}
  }

  async onModalClose(): Promise<void> {
    this.isModalOpen = false;
  }

  async onEdit(model: GridRow): Promise<void> {
    await this.onOpen(model.id);
  }

  async onRemove(model: GridRow): Promise<void> {
    if (!model.id) return;
    this.unitMeasureService
      .deleteById(model.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        async () => {
          await this.toastService.showRemove();
        },
        (error) => this.toastService.showError(error)
      );
    this.loadData();
  }

  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.toastService.showWarning('Formul??rio inv??lido!');
      return;
    }
    const model = this.getModel();
    const exists = model.id > 1;
    if (
      exists
        ? this.unitMeasureService
            .updateById(model)
            .pipe(untilDestroyed(this))
            .subscribe(
              async () => {
                await this.toastService.showUpdate();
                this.reset();
              },
              (error) => this.toastService.showError(error)
            )
        : this.unitMeasureService
            .add(model)
            .pipe(untilDestroyed(this))
            .subscribe(
              async () => {
                await this.toastService.showSuccess();
              },
              (error) => this.toastService.showError(error)
            )
    )
      return;
  }

  onCommand(event: FormGridCommandEventArgs): void {
    switch (event.command) {
      case 'Add':
        this.onCommandAdd();
        break;
      case 'Edit':
        this.onCommandEdit(event.rowData as GridRow);
        break;
      case 'Remove':
        this.onCommandRemove(event.rowData as GridRow);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {}

  private onCommandAdd(): void {
    this.onOpen();
  }

  private onCommandEdit(model: GridRow): void {
    this.onOpen(model.id);
  }

  private async onCommandRemove(model: GridRow): Promise<void> {
    this.unitMeasureService
      .deleteById(model.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showSuccess('Exclu??do com sucesso!');
          this.loadData();
        },
        (error) => this.toastService.showError()
      );
  }

  private loadData(): void {
    this.unitMeasureService
      .findAll()
      .pipe(untilDestroyed(this))
      .subscribe(async (unitMeasures) => {
        this.dataSource = unitMeasures;
      });
  }

  private async findUnitMeasure(id: number): Promise<void> {
    this.unitMeasureService
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        async (unitMeasure) => {
          this.populateForm(unitMeasure);
        },
        (error) => this.toastService.showError(error)
      );
  }

  private populateForm(unitMeasure: UnitMeasure): void {
    this.form.patchValue({
      id: unitMeasure.id,
      name: unitMeasure.name,
      abbreviation: unitMeasure.abbreviation,
    });
  }

  private getModel(): UnitMeasure {
    const model = new UnitMeasure();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : (formValue.id as number);
    model.name = formValue.name as string;
    model.abbreviation = formValue.abbreviation as string;
    return model;
  }

  private reset(): void {
    this.form.reset({
      id: NEW_ID,
    });
  }

  private createForm(): FormGroup {
    return (this.form = new FormGroup({
      id: new FormControl({ value: NEW_ID, disabled: true }),
      name: new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
      abbreviation: new FormControl(null, Validators.maxLength(5)),
    }));
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'C??digo').minWidth(100).isPrimaryKey(true),
      abbreviation: SfGridColumns.text('abbreviation', 'Sigla').minWidth(200),
      name: SfGridColumns.text('name', 'Nome').minWidth(200),
    });
  }
}
