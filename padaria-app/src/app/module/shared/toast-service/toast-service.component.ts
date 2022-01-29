import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ToastUtility
} from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-toast-service',
  templateUrl: './toast-service.component.html',
})
export class ToastServiceComponent implements OnInit, OnDestroy {
  constructor() {}

  toastObj: any;
  position = { X: 'Right' };

  ngOnInit(): void {}

  async saveToast(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Salvo com sucesso!',
      'Success',
      1000
    );
  }

  async warningFormToast(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Formulário inválido!',
      'Warning',
      1000
    );
  }

  async removeToast(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Excluído com sucesso!',
      'Error',
      1000
    );
  }

  async dangerToast(message?: string): Promise<void> {
    this.toastObj = ToastUtility.show(
      message ? message : 'Erro, ocorreu um problema',
      'Error',
      1000
    );
  }

  ngOnDestroy(): void {}
}
