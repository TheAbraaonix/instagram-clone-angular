import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Autenticacao } from '../../services/autenticacao.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();
  public msgErroLogin?: string;

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  });
  
  constructor(
    private autenticacao: Autenticacao
  ) { }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {
    this.autenticacao.autenticar(this.formulario.value.email, this.formulario.value.senha)
      .then(() => {})
      .catch((error: string) => {
        this.msgErroLogin = error;
      });
  }
}
