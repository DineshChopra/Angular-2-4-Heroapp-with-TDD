import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroComponent } from './hero.component';
import { Hero } from './hero';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let heroEl : DebugElement;
  let expectedHero: Hero;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    heroEl = fixture.debugElement.query(By.css('.hero'));
    expectedHero = {id : 1, name : 'Ram'};
    component.hero = expectedHero;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Should test expected hero name', ()=>{
    fixture.detectChanges();
    const expectedPipedName = expectedHero.name.toUpperCase();
    console.log(' ----------- ', heroEl.nativeElement.textContent);
    expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
  })
});

describe('HeroComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let heroEl : DebugElement;
  let expectedHero: Hero;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
    heroEl = fixture.debugElement.query(By.css('.hero'));
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });
  
  it('should raise selected event when clicked', () => {
    click(heroEl);
    // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });
  /** Simulate element click. Defaults to mouse left-button click event. */
  function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
    if (el instanceof HTMLElement) {
      el.click();
    } else {
      el.triggerEventHandler('click', eventObj);
    }
  }
  const ButtonClickEvents = {
   left:  { button: 0 },
   right: { button: 2 }
  };
});

////// Test Host Component //////
import { Component } from '@angular/core';

@Component({
  template: `
    <app-hero  [hero]="hero"  (selected)="onSelected($event)"></app-hero>`
})
class TestHostComponent {
  hero = new Hero(1, 'Ram');
  selectedHero: Hero;
  onSelected(hero: Hero) { this.selectedHero = hero; }
}