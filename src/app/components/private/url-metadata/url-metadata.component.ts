import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { URL, URLUpdatePayload } from '../interfaces';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PrivateDataService } from '../services/privateData.service';
import _moment from 'moment';

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

  @Output() URLDeleted: EventEmitter<URL> = new EventEmitter<URL>();

  isEditing: boolean = false;
  urlControl: FormControl = new FormControl('', Validators.required);
  expirationDateControl: FormControl = new FormControl('');
  authControl: FormControl = new FormControl(false);
  QRControl: FormControl = new FormControl(false);

  constructor(
    private privateDataService: PrivateDataService
  ) {
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

  public onRefreshExpirationDate(): void {
    const currentDate = _moment();

    currentDate.add(7, 'days');

    this.expirationDateControl.setValue(currentDate.format('MM-DD-YYYY'), { emitEvent: false });
  }

  public async onSaveChanges() {
    try {
      this.isEditing = false;

      const payload = this.buildURLUpdatePayload();

      await this.privateDataService.updateURL(payload, this.url.id);

      this.updateURLMetadata();
    } catch (error) {
      console.error(error);
    }
  }

  private buildURLUpdatePayload(): URLUpdatePayload {
    const payload: URLUpdatePayload = {
      url: this.urlControl.value,
      expiresIn: this.expirationDateControl.value,
      needsAuth: this.authControl.value,
      isQR: this.QRControl.value
    };

    return payload;
  }

  private updateURLMetadata(): void {
    this.url.url = this.urlControl.value;
    this.url.expiresIn = this.expirationDateControl.value;
    this.url.needsAuth = this.authControl.value;
    this.url.isQR = this.QRControl.value;
  }

  public async onDeleteURL() {
    try {
      await this.privateDataService.deleteURL(this.url.id);

      this.URLDeleted.emit(this.url);
    } catch (error) {
      console.error(error);
    }
  }
}
