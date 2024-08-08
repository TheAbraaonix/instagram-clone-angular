import { Component, OnInit } from '@angular/core';
import { BdService } from '../../services/bd.service';
import * as firebase from 'firebase';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-publicacoes',
  standalone: true,
  imports: [NgFor],
  templateUrl: './publicacoes.component.html',
  styleUrl: './publicacoes.component.css'
})
export class PublicacoesComponent implements OnInit {
  public email: string = "";
  public publicacoes: any = [];
  
  constructor(private bdService: BdService) {}
  
  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user?.email!;
      this.atualizarTimeLine();
    });
  }

  public atualizarTimeLine(): void {
    this.bdService.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes;
      });
  }
}
