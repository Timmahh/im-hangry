import { Component, OnInit } from '@angular/core';
import { RecommendationsService } from './recommendations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  geolocationPosition: Position;
  nearbyRestaurants: any[];
  errorReason: string;

  constructor(private recommendations: RecommendationsService) {}

  reset() {
    this.nearbyRestaurants = null;
    if(this.geolocationPosition) {
        this.recommendations.getRestaurantsNearby(this.geolocationPosition).subscribe((res) => {
            this.nearbyRestaurants = this.recommendations.generateQuestions(res);
        });
    } else {
        this.ngOnInit();
    }
  }

  ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.geolocationPosition = position;
                this.recommendations.getRestaurantsNearby(position).subscribe((res) => {
                    this.nearbyRestaurants = this.recommendations.generateQuestions(res);
                });
            },
            error => {
                switch (error.code) {
                    case 1:
                        this.errorReason = 'Help us help you! Give us permission to know your location so we can give you recommendations.';
                        break;
                    case 2:
                        this.errorReason = 'Position unavailable at this time. Try again later.';
                        break;
                    case 3:
                        this.errorReason = 'Timeout getting your location. Try again later.';
                        break;
                }
            }
        );
    };
  }
}
