import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { ProgressoService } from "./progresso.service";

@Injectable({
    providedIn: 'root'
})
export class BdService {
    constructor(private progresso: ProgressoService) { }

    public publicar(publicacao: any): void {
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {
                let nomeImagem = resposta.key;

                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        (snapshot: any) => {
                            this.progresso.status = "em andamento";
                            this.progresso.estado = snapshot;
                        },
                        (error) => {
                            this.progresso.status = "erro";
                        },
                        () => {
                            this.progresso.status = "concluido";
                        }
                    );
            });
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                .once('value')
                .then((snapshot: any) => {
                    let publicacoes: Array<any> = [];

                    snapshot.forEach((childSnapshot: any) => {
                        let publicacao = childSnapshot.val();
                        
                        firebase.storage().ref()
                            .child(`imagens/${childSnapshot.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                publicacao.urlImagem = url;

                                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        publicacao.nomeUsuario = snapshot.val().nome_usuario;
                                    });
                                
                                publicacoes.push(publicacao);
                            });
                    });

                    resolve(publicacoes.reverse());
                });

        });
    }
}