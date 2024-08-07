import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Autenticacao } from "./autenticacao.service";

@Injectable({
    providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {
    constructor(private autenticacao: Autenticacao) {}
    
    canActivate(): boolean {
        console.log(this.autenticacao.autenticado());
        return this.autenticacao.autenticado();
    }
}