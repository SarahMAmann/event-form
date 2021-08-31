import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BandListComponent } from './band-list.component';

describe('BandListComponent', () => {
  let component: BandListComponent;
  let fixture: ComponentFixture<BandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <p> with "band-list works!"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('p');
    expect(p.textContent).toEqual('band-list works!');
  });


  it('should show input event value', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('input');
    const nameDisplay: HTMLElement = hostElement.querySelector('span');
    nameInput.value = 'Quick Brown Fox';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(nameInput.value).toBe('Quick Brown Fox');
  });


  it('should show Test Button clicked', fakeAsync(() => {
    spyOn(component, 'onTestButtonClick');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.onTestButtonClick).toHaveBeenCalled();
  }));

});
