import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastRef, NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/core/services/auth.service';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = 'assets/images/loading-green.gif'
  loginForm = new FormGroup({
    username: new FormControl('jgalarza', [Validators.required]),
    password: new FormControl('jg1234', [Validators.required])
  })
  physicalPositions = NbGlobalPhysicalPosition;

  isLoadingRegistrarse = false;
  disableBtnSubmit = false;

  constructor(
    private authService: AuthService,
    private titleService: TitleService,
    private toastrService: NbToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Acceso")
  }
  /**
   * Inicia sesión con las credenciales ingresadas por el usuario
   *
   */
  public login() {
    this.isLoadingRegistrarse = true;
    const MISSING_FIELD = 1001;
    try {
      if (!this.loginForm.valid) throw MISSING_FIELD

      this.disableBtnSubmit = true; // Deshabilito el botón de submit

      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          const toastRef: NbToastRef = this.toastrService.show('', 'Has iniciado sesión', { position: this.physicalPositions.TOP_RIGHT, icon: 'checkmark-circle-outline',   duration: 3000 });
          this.authService.setToken(response.token);
          this.router.navigate(['home']);
          this.isLoadingRegistrarse = false;
        }, error => {
          this.disableBtnSubmit = false;
          let text = "";
          if (error.status == 400) {
            text = 'Usuario o contraseña incorrecto'
          } else if (error.status == 0) {
            text = 'Ocurrió un error al intentar conectar con el servidor'
          } else {
            text = 'Ocurrió un error indefinido'
          }

          const toastRef: NbToastRef = this.toastrService.show('', text, { position: this.physicalPositions.TOP_RIGHT, icon: 'close-outline', duration: 3000, toastClass: "toast-danger"});
          this.isLoadingRegistrarse = false;
        });

    } catch (error) {
      if (error == MISSING_FIELD) { }//this.messageService.add({ severity: 'error', summary: 'Debes completar todos los campos' })
    }
  }
}
