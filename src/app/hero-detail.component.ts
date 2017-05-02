import { Component, OnInit, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html'
})

export class HeroDetailComponent implements OnInit {
  constructor() { }
  @Input() hero: Hero;
  ngOnInit() {
  }

}
