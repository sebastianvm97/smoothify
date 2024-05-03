import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PrivateDataService } from '../services/privateData.service';
import { LinkCreationPayload } from '../interfaces';
import _moment from 'moment';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-url-shortener',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PrivateDataService
  ],
  templateUrl: './url-shortener.component.html',
  styleUrl: './url-shortener.component.css'
})
export class UrlShortenerComponent {

  URLForm = new FormGroup({
    urlControl: new FormControl('', Validators.required),
    isQRControl: new FormControl(false, Validators.required),
    needsAuthControl: new FormControl(false, Validators.required)
  });
  generatedURL: string = '';

  constructor(
    private privateDataService: PrivateDataService,
    private authService: AuthService
  ) {}

  public async onURLFormSubmit() {
    try {
      const payload = this.buildLinkCreationPayload();

      const userID = await this.authService.getUserID();

      if (userID) {
        const URLID = await this.privateDataService.createURLDocument(payload, userID);
        this.generatedURL = `https://smoothify.co/${URLID}`;
      }
    } catch (error) {
      console.error(error);
    }
  }

  private buildLinkCreationPayload(): LinkCreationPayload {
    const payload: LinkCreationPayload = {
      url: this.URLForm.controls.urlControl.value ?? '',
      expiresIn: _moment().add(7, 'days').format('MM-DD-YYYY'),
      isQR: this.URLForm.controls.isQRControl.value ?? false,
      needsAuth: this.URLForm.controls.needsAuthControl.value ?? false
    };

    return payload;
  }

}
