import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RecommendationsService } from '../recommendations.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  radiusToSearch: number;

  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(private recommendations: RecommendationsService) { }

  ngOnInit() {
    this.recommendations.radiusToSearch.subscribe(rad => {
      this.radiusToSearch = rad;
    });
  }

  onSaveSettings(event) {
    this.recommendations.radiusToSearch.next(this.radiusToSearch);
    this.onSave.emit();
  }

}
