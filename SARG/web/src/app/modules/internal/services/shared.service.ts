import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Message } from 'primeng/api/message';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private message = new Subject<Message>();
  messageObservable = this.message.asObservable();

  private toast = new Subject<Message>();
  toastObservable = this.toast.asObservable();

  constructor() { }

  setMessage(message: Message): void { this.message.next(message); }
  setToast(toast: Message): void { this.toast.next(toast); }
  setToastError(error: any): void {
    if (error.error?.message) this.setToast({ severity: 'error', summary: "Error!", detail: error.error.message })
    else {
      console.error(error);
      this.setToast({ severity: 'error', summary: "Error!", detail: "Error indefinido" })
    }
  }
}
