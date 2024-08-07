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
            .catch((erro: any) => {
                console.log(erro.code);
                let errorMessage = "Ocorreu um erro ao tentar cadastrar o usuário. Por favor, tente novamente.";

                if (erro.code === "auth/email-already-in-use") {
                    errorMessage = "O e-mail informado já está em uso.";
                }
                
                return Promise.reject(errorMessage);
            });
    }

    public autenticar(email: string, senha: string): Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser?.getIdToken()
                    .then((idToken: string) => { 
                        this.token_id = idToken;
                        localStorage.setItem("idToken", idToken);
                        this.router.navigate(['/home']);
                    });
            })
            .catch((error: string) => {
                this.token_id = "";
                let errorMessage = "Ocorreu um erro ao tentar autenticar o usuário. Por favor, tente novamente.";

                return Promise.reject(errorMessage);
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