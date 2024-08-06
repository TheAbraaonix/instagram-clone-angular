import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }
}
