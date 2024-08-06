import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }
}
