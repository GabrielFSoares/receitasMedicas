import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from '../services/usuario/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string = ""
  password:string = ""
  password2:string = ""
  message:string =""
  

  constructor(
    public router:Router, 
    public autenticacaoService:AutenticacaoService, 
    public toastController:ToastController
  ) { }

  ngOnInit() {
  }

  createUser() {
    if(this.password === this.password2) {
      this.autenticacaoService.createUser(this.email, this.password).then((res) => {
        this.email = '';
        this.password = '';
        this.password2 = '';
        this.message = "Usuário cadastrado com sucesso!";
        this.displayModal();
        this.modNav('l')
        
      }).catch((erro) => {
        this.message = "Erro ao incluir usuário. " + erro;
        this.displayModal();
      })
    } else {
      this.message = "As senhas não coincidem";
      this.displayModal();
    }
  }

  loginUser() {
    this.autenticacaoService.loginUser(this.email, this.password).then((res => {
      localStorage.setItem("login", '1')
      this.router.navigate(['/home'])
    })).catch((erro) => {
      this.message = "E-mail e/ou senha inválido(s)"
      this.displayModal()
    })
  }

  async displayModal() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    })
    toast.present()
  }



  modNav(id) {
    if(id == "l") {
      document.getElementById("c").className = "col-4 text-center p text-center"
      document.getElementById("l").className = "col-4 text-center p-active text-center"
      document.getElementById("login").className = "d-block"
      document.getElementById("create").className = "d-none"
    } else if(id == "c") {
      document.getElementById("c").className = "col-4 text-center p-active text-center"
      document.getElementById("l").className = "col-4 text-center p text-center"
      document.getElementById("login").className = "d-none"
      document.getElementById("create").className = "d-block"
    }
  }

}
