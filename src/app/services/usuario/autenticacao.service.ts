import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(public ngFireAuth: AngularFireAuth) { }

  loginUser(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  createUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }
}
