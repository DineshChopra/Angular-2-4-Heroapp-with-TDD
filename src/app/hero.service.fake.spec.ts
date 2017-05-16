import { HeroService } from './hero.service';
import { Observable } from 'rxjs/Rx';
import { Hero } from './hero';
export class FakeHeroService extends HeroService{
    constructor(){super(null);}

    getHeroes() : Observable<any>{
        let heroes : Hero[] = [
            new Hero(1, 'Ram'),
            new Hero(2, 'Sham')
        ];
    let response = {data : heroes};
    return Observable.of(response);
  }
}