import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from '../services/usuario/autenticacao.service';

interface CadastroUser {
  id: string;
  name: string;
  crm: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  email:string
  message:string
  name:string
  private crm:number
  private password:string
  private password2:string
  
  private userCollection: AngularFirestoreCollection<CadastroUser>
  private userId: AngularFirestoreCollection<CadastroUser>;
  private user: CadastroUser

  constructor(
    public router:Router, 
    public autenticacaoService:AutenticacaoService, 
    public toastController:ToastController,
    private afs:AngularFirestore
  ) { 
    this.userCollection = this.afs.collection<CadastroUser>('usuarios')
  }

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
        const id = res.user.uid;
        this.userId = this.afs.collection<CadastroUser>(`users/${id}/information`);

        const item: CadastroUser = {
          id,
          name: this.name,
          crm: this.crm
        }

        this.userId.add(item)
        
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
      localStorage.setItem('token', res.user.uid);
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
