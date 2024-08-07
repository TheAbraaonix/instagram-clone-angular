import { Usuario } from "../shared/usuario.model";
import * as firebase from 'firebase';

export class Autenticacao {
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
            .then((resposta: any) => {console.log(resposta)})
            .catch((error: any) => {console.log(error)});
    }
}