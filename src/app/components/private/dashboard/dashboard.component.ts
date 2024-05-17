import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UrlShortenerComponent } from '../url-shortener/url-shortener.component';
import { PrivateDataService } from '../services/privateData.service';
import { AuthService } from '../../auth/services/auth.service';
import { DocumentData } from 'firebase/firestore';
import { URL, UserData } from '../interfaces';
import { UrlMetadataComponent } from '../url-metadata/url-metadata.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    UrlShortenerComponent,
    UrlMetadataComponent
  ],
  providers: [
    PrivateDataService,
    AuthService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  userURLs: URL[];
  userData: UserData;

  constructor(
    private privateDataService: PrivateDataService,
    private authService: AuthService
  ) {
    this.userURLs = [];
    this.userData = {
      id: '',
      name: '',
      email: '',
      urls: []
    };
  }

  async ngOnInit() {
    this.userData = await this.getUserData();
    this.userURLs = await this.getUserURLs();
  }

  private async getUserData(): Promise<UserData> {
    let userData: UserData = {
      id: '',
      name: '',
      email: '',
      urls: []
    };

    try {
      const userID = await this.authService.getUserID();

      if (userID) {
        userData = await this.privateDataService.fetchUserData(userID);
        userData.id = userID;
      }
    } catch (error) {
      console.error(error);
    }

    return userData;
  }

  private async getUserURLs(): Promise<URL[]> {
    let URLs: URL[] = [];

    try {
      const documents = await this.privateDataService.fetchUserURLs(this.userData.urls);

      URLs = this.formatRetrievedDocuments(documents);
    } catch (error) {
      console.error(error);
    }

    return URLs;
  }

  private formatRetrievedDocuments(documents: DocumentData[]): URL[] {
    const URLs: URL[] = [];

    documents.forEach(document => {
      const documentData = document['data']();
      const documentID: string = document['id'];

      URLs.push({
        id: documentID,
        ...documentData
      });
    });

    return URLs;
  }

  public onURLGenerated(newURL: URL): void {
    this.userURLs.push(newURL);
  }

  public async onURLDeleted(deletedURL: URL) {
    try {
      let urlIndex = this.userData.urls.findIndex(url => url === deletedURL.id);

      if (urlIndex !== -1) {
        this.userData.urls.splice(urlIndex, 1);

        urlIndex = this.userURLs.findIndex(url => url.id === deletedURL.id);
        this.userURLs.splice(urlIndex, 1);

        await this.privateDataService.updateUserURLs(this.userData.urls, this.userData.id);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
