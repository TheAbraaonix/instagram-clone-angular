import { Injectable } from "@angular/core";
import { Usuario } from "../shared/usuario.model";
import * as firebase from 'firebase';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class Autenticacao {
    public token_id: string = "";
    
    constructor(private router: Router) {}
    
    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                if (usuario.senha) {
                    delete (usuario as { senha?: string }).senha;
                }

                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario);
            })
            .catch((erro: Error) => {
                console.log(erro);
            });
    }

    public autenticar(email: string, senha: string): void {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser?.getIdToken()
                    .then((idToken: string) => { 
                        this.token_id = idToken;
                        localStorage.setItem("idToken", idToken);
                        this.router.navigate(['/home']);
                    });
            })
            .catch((error: any) => {
                console.log(error);
                this.token_id = "";
            });
    }

    public autenticado(): boolean {
        if (this.token_id === undefined || this.token_id === "") {
            this.token_id = localStorage.getItem("idToken") || "";
        }

        if (this.token_id === "") {
            this.router.navigate(['/']);
        }
        
        return this.token_id !== "";
    }

    public sair(): void {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem("idToken");
                this.token_id = "";
                this.router.navigate(['/']);
            });
    }
}