import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../environments/environments";
import { User, UserCredential, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

@Injectable({providedIn: 'root'})
export class AuthService {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);
  private user: User | undefined;

  constructor() {}

  public isUserAuth(): Promise<boolean> {
    return new Promise(resolve => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
            this.user = user;
            
            resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  // To create a new user in the DB
  // public async signUpUser(email: string, password: string) {
  //     const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
  // }

  public async signInUser(email: string, password: string) {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
  }

  public async signUserOut() {
    await signOut(this.auth);
  }

  public async getUserID() {
    const userData = this.auth.currentUser;

    return userData?.uid;
  }
}