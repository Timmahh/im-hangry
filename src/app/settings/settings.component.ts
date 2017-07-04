import { Component, OnInit } from '@angular/core';
import { RecommendationsService } from '../recommendations.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  radiusToSearch: number;

  constructor(private recommendations: RecommendationsService) { }

  ngOnInit() {
    this.recommendations.radiusToSearch.subscribe(rad => {
      this.radiusToSearch = rad;
    });
  }

  onSaveSettings(event) {
    this.recommendations.radiusToSearch.next(this.radiusToSearch);
  }

}
