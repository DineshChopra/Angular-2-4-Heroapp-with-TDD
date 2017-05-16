import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  heroes: Hero[] = [];

  constructor(private router: Router,
              private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe(
        response  => {
          let heroes = response['data'];
          this.heroes = heroes.slice(1, 5)
      });
  }
  gotoDetail(hero: Hero) {
    let url = `/detail/${hero.id}`;
    this.router.navigateByUrl(url);
  }

}
