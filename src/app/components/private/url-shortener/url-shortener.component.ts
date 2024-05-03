import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PrivateDataService } from '../services/privateData.service';

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
    private privateDataService: PrivateDataService
  ) {}

  public async onURLFormSubmit() {
    const URL = this.URLForm.controls.urlControl.value;

    const hash = Math.random().toString(36).substring(2, 15);

    this.generatedURL = btoa(hash);
    console.log(atob(this.generatedURL));
  }

  public onAdd() {
    try {
      this.privateDataService.addDoc();
    } catch (error) {
      console.error(error);
    }
  }

}
