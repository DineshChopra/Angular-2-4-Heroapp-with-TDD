import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { FakeHeroService } from './hero.service.fake.spec';
import { ActivatedRoute, Params } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from './testing/router-stubs';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroDetailEl : DebugElement;
  let hero : Hero;
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParams = { id: 10 };
    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports: [ FormsModule,
                 CommonModule,
                 RouterTestingModule.withRoutes([
                   { path: 'detail/10', component: HeroDetailComponent }
                 ]) 
      ],
      providers : [
        {provide : HeroService, useClass : FakeHeroService},
        { provide: ActivatedRoute, useValue: activatedRoute },
        Location
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    hero = new Hero(1, 'Ram');
    component.hero = hero;
    fixture.detectChanges();
    heroDetailEl  = fixture.debugElement.query(By.css('.heroDetail')); // find hero element
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Should test expected hero name', ()=>{
    const expectedPipedName = hero.name.toUpperCase();
    component.hero = hero;
    fixture.detectChanges();
    console.log(' ----------- ', heroDetailEl.nativeElement.textContent);
    expect(heroDetailEl.nativeElement.textContent).toContain(expectedPipedName);
  })
  it('should update hero via two way data binding', fakeAsync(()=>{
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css("#heroName"));
    expect(de).not.toBeNull();
    const el = de.nativeElement;
    fixture.detectChanges();
    const heroName = 'Ram';
    el.value = heroName;

    var event = new Event('input', {
      'bubbles': true,
      'cancelable': true
    });
    el.dispatchEvent(event);

    tick();

    fixture.detectChanges();

    expect(component.hero.name).toEqual(heroName);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(heroName.toUpperCase());
  }));
});
