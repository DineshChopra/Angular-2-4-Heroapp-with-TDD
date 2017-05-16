import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';


import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod, ResponseType  } from '@angular/http';
import { MockBackend, MockConnection  } from '@angular/http/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroComponent } from './hero.component';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Rx';
import { HeroService } from './hero.service';
import { FakeHeroService } from './hero.service.fake.spec';
import { Router } from '@angular/router';
import { RouterStub } from './testing/router-stubs';

describe('HeroesComponent', () => {
  let app: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
    let spy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent, HeroDetailComponent, HeroComponent
      ],
      providers: [
        {provide : HeroService, useClass : FakeHeroService},
        {provide : Router, useClass : RouterStub}
        ],
      imports: [ FormsModule ],
    }).compileComponents();
  }));
  beforeEach(()=> {
    fixture = TestBed.createComponent(HeroesComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  // it(`should have as hero 'Windstorm'`, async(() => {
  //   expect(app.selectedHero).toEqual(undefined);
  // }));  
  // it('should render hero in a h2 tag', async(() => {
  //   const hero : Hero = {id : 1, name : 'Windstorm'};
  //   app.selectedHero = hero;
  //   console.log('', app.selectedHero);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h2').textContent).toContain(hero.name);
  // }));  



  it(`should have heroes `, fakeAsync(() => {
    const heroes : Hero [] = HEROES;
    // TwainService actually injected into the component
    let heroService = fixture.debugElement.injector.get(HeroService);

    // Setup spy on the `getHeroes` method
    spy = spyOn(heroService, 'getHeroes')
          .and.returnValue(Observable.of({data : heroes}));
    tick();
    fixture.detectChanges();
    expect(heroes).toEqual(app.heroes);
    const compiled = fixture.debugElement.nativeElement;
    expect((compiled.querySelectorAll('.hero')).length).toEqual(heroes.length);
  })); 

  // it('should set selectedHero on click of any hero', async(()=>{
  //   const hero : Hero = {id : 1, name : 'Ram'};
  //   app.onSelect(hero);
  //   expect(app.selectedHero).toEqual(hero);
  // }))
});
