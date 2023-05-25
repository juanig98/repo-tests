import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'app/core/models/auth/Login.dto';
import { AuthService } from 'app/core/services/auth.service';
import { TitleService } from 'app/core/services/title.service';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  message: string | undefined;
  isLoadingRegistrarse: boolean = false;
  disableBtnSubmit: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private messageService: MessageService,
    // private utils: UtilsService,
    private authService: AuthService,
    private titleService: TitleService,
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

      this.authService.login(<LoginDTO>this.loginForm.value).subscribe({
        next: response => {
          if (response) {
            this.authService.setToken(response)
            this.router.navigate(['/home']);
          } else {
            this.messageService.add({ severity: 'warn', summary: 'No se pudo acceder', detail: "" });
          }
          this.isLoadingRegistrarse = false;
          this.disableBtnSubmit = false;
        },
        error: error => {
          this.disableBtnSubmit = false;
          if (error.status == 401) {

            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Usuario o contraseña incorrecto' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No es posible conectar con el servidor' });
          }
          this.isLoadingRegistrarse = false;
        },
      });
    } catch (error) {
      if (error == MISSING_FIELD) this.messageService.add({ severity: 'error', summary: 'Debes completar todos los campos' })
    }
  }
}
