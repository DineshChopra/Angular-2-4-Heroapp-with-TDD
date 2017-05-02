import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Hero } from './hero';
import { HEROES } from './heroes';
describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ FormsModule ],
    }).compileComponents();
  }));
  beforeEach(()=> {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
  it(`should have as hero 'Windstorm'`, async(() => {
    expect(app.selectedHero).toEqual(undefined);
  }));  
  it('should render hero in a h2 tag', async(() => {
    const hero : Hero = {id : 1, name : 'Windstorm'};
    app.selectedHero = hero;
    console.log('', app.selectedHero);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(hero.name);
  }));  

  it('should update hero via two way data binding', fakeAsync(()=>{
    app.selectedHero = {id : 1, name : 'Ram'};
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

    expect(app.selectedHero.name).toEqual(heroName);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(heroName);
  }));

  // Master/detail test cases---------------
  it(`should have heroes `, async(() => {
    const heroes : Hero [] = HEROES;
    fixture.detectChanges();
    expect(heroes).toEqual(app.heroes);
    const compiled = fixture.debugElement.nativeElement;
    expect((compiled.querySelectorAll('.hero')).length).toEqual(heroes.length);
  })); 

  it('should set selectedHero on click of any hero', async(()=>{
    const hero : Hero = {id : 1, name : 'Ram'};
    app.onSelect(hero);
    expect(app.selectedHero).toEqual(hero);
  }))
});
