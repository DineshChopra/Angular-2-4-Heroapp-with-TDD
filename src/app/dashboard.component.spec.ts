import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard.component';
import { FakeHeroService } from './hero.service.fake.spec';
import { HeroService } from './hero.service';
import { RouterStub } from './testing/router-stubs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers : [
        {provide : HeroService, useClass : FakeHeroService},
        {provide : Router, useClass : RouterStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should tell ROUTER to navigate when hero clicked',
      inject([Router], (router: Router) => { // ...

      const spy = spyOn(router, 'navigateByUrl');

      heroClick(); // trigger click on first inner <div class="hero">

      // args passed to router.navigateByUrl()
      const navArgs = spy.calls.first().args[0];

      // expecting to navigate to id of the component's first hero
      const id = component.heroes[0].id;
      expect(navArgs).toBe('/detail/' + id,
        'should nav to HeroDetail for first hero');
    }));
    function heroClick() {
    // get first <dashboard-hero> DebugElement
    const heroEl = fixture.debugElement.query(By.css('.hero'));
    click(heroEl);
    // heroEl.triggerEventHandler('selected', component.heroes[0]);
  }
});
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

