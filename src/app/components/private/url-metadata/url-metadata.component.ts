import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { URL } from '../interfaces';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-url-metadata',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  templateUrl: './url-metadata.component.html',
  styleUrl: './url-metadata.component.css'
})
export class UrlMetadataComponent {

  private _url: URL;

  @Input()
  set url(url: URL) {
    this._url = url;
  }
  get url() {
    return this._url;
  }

  isEditing: boolean = false;
  urlControl: FormControl = new FormControl('', Validators.required);
  expirationDateControl: FormControl = new FormControl('');
  authControl: FormControl = new FormControl(false);
  QRControl: FormControl = new FormControl(false);

  constructor() {
    this._url = {
      id: '',
      url: '',
      expiresIn: '',
      isQR: false,
      needsAuth: false
    };
  }

  public onEdit(): void {
    this.isEditing = true;

    this.urlControl.setValue(this.url.url, { emitEvent: false });
    this.expirationDateControl.setValue(this.url.expiresIn, { emitEvent: false });
    this.authControl.setValue(this.url.needsAuth, { emitEvent: false });
    this.QRControl.setValue(this.url.isQR, { emitEvent: false });
  }
}
