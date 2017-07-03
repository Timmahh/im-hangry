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
}
