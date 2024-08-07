import { Component } from '@angular/core';
import { PublicacoesComponent } from "./publicacoes/publicacoes.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PublicacoesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
