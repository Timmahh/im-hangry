import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from '../recommendations.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {
  @Input() cuisine: string;
  @Input() places: Restaurant[];

  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  onCancelClicked(event) {
    this.onCancel.emit();
  }

  getNumberOfStars(rating: number) {
    let r = [0,0,0,0,0];
    for(let i = 0; i < Math.round(rating); i++) {
      r[i] = 1;
    }
    return r;
  }

  getPriceRange(priceRange: number) {
    let r = [];
    for(let i = 0; i < Math.round(priceRange); i++) {
      r.push(1);
    }
    return r;
  }
}
