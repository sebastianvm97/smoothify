import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "../../../environments/environments";
import { Injectable } from "@angular/core";
import { LinkCreationPayload } from "../interfaces";

@Injectable({providedIn: 'root'})
export class PrivateDataService {
    private app = initializeApp(firebaseConfig);
    private db = getFirestore(this.app);

    public async createURLDocument(payload: LinkCreationPayload, userID: string): Promise<string> {
        const docRef = await addDoc(collection(this.db, `users/${userID}/urls`), payload);

        return docRef.id;
    }
    
    public async addDoc() {
        
        // CREATES A DOC WITH A DEFINED ID OF 123456
        // const docRef = await addDoc(collection(this.db, "users"), {
        //     id: 123456,
        //     first: "John",
        //     last: "Doe",
        //     born: 1995
        // });
        // console.log("Document written with ID: ", docRef.id);


// CREATES A DOC WITH A RANDOM ID
        // const docRef = await setDoc(doc(this.db, 'users', '123456'), {
        //     first: 'Alice',
        //     last: 'Doe',
        //     born: 1997
        // });
        // console.log("Document created");


        // CREATES THE URL INSIDE URLS COLLECTION OF THE USER
        // const docRef = await addDoc(collection(this.db, "users/123456/urls"), {
        //     url: 'https://google.com',
        //     expires: '2024-04-04',
        //     needsValidation: false,
        //     isQR: false
        // });
        // console.log("Document written with ID: ", docRef.id);
    }
}
