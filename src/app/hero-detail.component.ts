import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }         from './hero';
import { HeroService }  from './hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    let heroId : number;
    this.route.params.subscribe(params => {
       heroId = +params['id']; // (+) converts string 'id' to a number
       this.hero = this.heroService.getHero(heroId);
       // In a real app: dispatch action to load the details here.
    });
  }

  goBack(): void {
    this.location.back();
  }
}
