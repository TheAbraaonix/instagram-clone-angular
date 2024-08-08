import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BdService } from '../../services/bd.service';
import { ProgressoService } from '../../services/progresso.service';
import * as firebase from 'firebase';
import { interval, Subject, takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-incluir-publicacao',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './incluir-publicacao.component.html',
  styleUrl: './incluir-publicacao.component.css'
})
export class IncluirPublicacaoComponent implements OnInit {
  public email: string = "";
  private imagem: any;
  public progressoPublicacao: string = "pendente";
  public porcentagemUpload: number = 0;
  
  constructor(
    private bdService: BdService,
    private progressoService: ProgressoService
  ) {}
  
  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  });

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user?.email!;
    });
  }
  
  public publicar(): void {
    this.bdService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    let acompanhamentoUpload = interval(1500);
    let continua = new Subject();
    
    continua.next(true);

    acompanhamentoUpload
    .pipe(takeUntil(continua))
    .subscribe(() => {
      this.progressoPublicacao = "andamento";
      this.porcentagemUpload = Math.round((this.progressoService.estado.bytesTransferred / this.progressoService.estado.totalBytes) * 100);
      
      if (this.progressoService.status === "concluido") {
        this.progressoPublicacao = "concluido";
        continua.next(false);
      }
    });
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
}
