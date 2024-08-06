import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AcessoComponent } from "./acesso/acesso.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AcessoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app3';
}
