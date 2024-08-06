import { Component } from '@angular/core';
import { BannerComponent } from "./banner/banner.component";
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-acesso',
  standalone: true,
  imports: [BannerComponent, LoginComponent],
  templateUrl: './acesso.component.html',
  styleUrl: './acesso.component.css'
})
export class AcessoComponent {

}
