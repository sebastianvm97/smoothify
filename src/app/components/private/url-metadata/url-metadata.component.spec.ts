import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlMetadataComponent } from './url-metadata.component';

describe('UrlMetadataComponent', () => {
  let component: UrlMetadataComponent;
  let fixture: ComponentFixture<UrlMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlMetadataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UrlMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
