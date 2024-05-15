import { initializeApp } from "firebase/app";
import { DocumentData, FieldPath, doc, getDoc, getDocs, getFirestore, limit, query, setDoc, updateDoc, where } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "../../../environments/environments";
import { Injectable } from "@angular/core";
import { LinkCreationPayload, URL, UserData } from "../interfaces";

@Injectable({providedIn: 'root'})
export class PrivateDataService {
    private app = initializeApp(firebaseConfig);
    private db = getFirestore(this.app);

    public async createURLDocument(payload: LinkCreationPayload): Promise<string> {
        const docRef = await addDoc(collection(this.db, `urls`), payload);

        return docRef.id;
    }

    public async updateUserURLs(userURLs: string[], userID: string): Promise<any> {
        const response = await updateDoc(doc(this.db, 'users', userID), { urls: userURLs });

        return response;
    }

    public async fetchUserURLs(urlIDs: string[]): Promise<DocumentData[]> {
        const q = query(collection(this.db, 'urls'), where('__name__', 'in', urlIDs), limit(10));

        const querySnapshot = await getDocs(q);

        return querySnapshot as any;
    }

    public async fetchUserData(userID: string): Promise<UserData> {
        const querySnapshot = await getDoc(doc(this.db, 'users', userID));

        return querySnapshot.data() as any;
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
