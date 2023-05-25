import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastRef, NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/core/services/auth.service';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  loading = 'assets/images/loading-green.gif'

  restoreForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  })

  physicalPositions = NbGlobalPhysicalPosition;

  isLoadingRegistrarse = false;
  disableBtnSubmit = false;

  responseMessage: string | undefined;

  constructor(
    private authService: AuthService,
    private titleService: TitleService,
    private toastrService: NbToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Recuperar contraseña")
  }

  public sendMail() {
    this.isLoadingRegistrarse = true;
    const MISSING_FIELD = 1001;
    try {
      if (!this.restoreForm.valid) throw MISSING_FIELD

      this.disableBtnSubmit = true; // Deshabilito el botón de submit

      this.authService.restorePassword(this.restoreForm.value).subscribe(
        (response) => {
          if (response.message) {
            this.responseMessage = response.message;
          }
          this.isLoadingRegistrarse = false;
        }, error => {
          this.disableBtnSubmit = false;
          let text = "";
          if (error.status == 400) {

            text = error.error.error
          } else if (error.status == 0) {
            text = 'Ocurrió un error al intentar conectar con el servidor'
          } else {
            text = 'Ocurrió un error indefinido'
          }

          const toastRef: NbToastRef = this.toastrService.danger('', text, { position: this.physicalPositions.TOP_RIGHT, icon: 'close-outline', duration: 3000 });
          this.isLoadingRegistrarse = false;
        });

    } catch (error) {
      if (error == MISSING_FIELD) { }//this.messageService.add({ severity: 'error', summary: 'Debes completar todos los campos' })
    }
  }
}
