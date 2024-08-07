import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AcessoComponent } from "./acesso/acesso.component";
import { Autenticacao } from './services/autenticacao.service';
import * as firebase from 'firebase';
import { AutenticacaoGuard } from './services/autenticacao-guard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AcessoComponent],
  providers: [Autenticacao, AutenticacaoGuard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'app3';
  
  ngOnInit(): void {
    let firebaseConfig = {
      apiKey: "AIzaSyDeOwCimJ-X_yM6rderEVEQuxSiTrnkzh0",
      authDomain: "jta-instagram-clone-b43d8.firebaseapp.com",
      projectId: "jta-instagram-clone-b43d8",
      storageBucket: "jta-instagram-clone-b43d8.appspot.com",
      databaseURL: "https://jta-instagram-clone-b43d8-default-rtdb.firebaseio.com",
      messagingSenderId: "937722876813",
      appId: "1:937722876813:web:14e7f6b76f67a4de50e3c4",
      measurementId: "G-26255YGJPG"
    };
    
    firebase.initializeApp(firebaseConfig);
  }
}
