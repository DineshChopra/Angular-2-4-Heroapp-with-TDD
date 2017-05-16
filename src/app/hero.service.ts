import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

  public heroes : Hero[];
  constructor(private http : Http) { }
  getHeroes() : Observable<Hero[]>{
    return this.http.get('./src/app/mock-heroes.json')
              .map(this.extractData)
              .catch(this.handleError);
  }
  // Observable<Hero>
  getHero(id : number) : Hero{
    console.log(this.heroes);
    return this.heroes.find(hero => hero.id === id);
  }
  private extractData(res : Response):any{
    let body = res.json();
    this.heroes = body['data'];
     console.log(this.heroes);
    return body || {};
  }

  private handleError(error : Response | any){
    let errObj ;
    if(error instanceof Response){
      const body = error.json() || '';
      errObj = body.error || JSON.stringify(body);
    }else{
      errObj = {status : 404, statusText : ''};
    }
    return Observable.throw(errObj);
  }

}
