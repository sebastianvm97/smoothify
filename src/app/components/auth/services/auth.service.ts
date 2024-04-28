import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../environments/environments";
import { User, UserCredential, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

@Injectable({providedIn: 'root'})
export class AuthService {
    private app = initializeApp(firebaseConfig);
    private auth = getAuth(this.app);
    private user: User | undefined;

    constructor() {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
                this.user = user
                console.log('USER IS SIGNED IN');
                console.log("🚀 ~ AuthService ~ onAuthStateChanged ~ this.user:", this.user)
              // ...
            } else {
              // User is signed out
              // ...
                console.log('USER IS SIGNED OUT');
            }
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
}