import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PrivateDataService } from '../services/privateData.service';
import { LinkCreationPayload, URL, UserData } from '../interfaces';
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

  private _userData: UserData;

  @Input()
  set userData(userData: UserData) {
    this._userData = userData;
  }
  get userData() {
    return this._userData;
  }

  @Output() URLGenerated: EventEmitter<URL> = new EventEmitter<URL>();

  URLForm = new FormGroup({
    urlControl: new FormControl('', Validators.required),
    isQRControl: new FormControl(false, Validators.required),
    needsAuthControl: new FormControl(false, Validators.required)
  });
  generatedURL: string = '';

  constructor(
    private privateDataService: PrivateDataService,
    private authService: AuthService
  ) {
    this._userData = {
      id: '',
      name: '',
      email: '',
      urls: []
    };
  }

  public async onURLFormSubmit() {
    try {
      const payload = this.buildLinkCreationPayload();

      const URLId = await this.privateDataService.createURLDocument(payload);

      this.userData.urls.push(URLId);

      await this.privateDataService.updateUserURLs(this.userData.urls, this.userData.id);

      this.generatedURL = `https://smoothify.co/${URLId}`;
      this.URLGenerated.next(
        {
          id: URLId,
          ...payload
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  private buildLinkCreationPayload(): LinkCreationPayload {
    const payload: LinkCreationPayload = {
      url: this.URLForm.controls.urlControl.value ?? '',
      expiresIn: _moment().add(7, 'days').format('YYYY-MM-DD'),
      isQR: this.URLForm.controls.isQRControl.value ?? false,
      needsAuth: this.URLForm.controls.needsAuthControl.value ?? false
    };

    return payload;
  }

}
