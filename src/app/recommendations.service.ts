import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {} from '@types/googlemaps';
import * as _ from 'lodash';
import { environment } from '../environments/environment';

@Injectable()
export class RecommendationsService {

  constructor(private http: Http) {
   }

  getRestaurantsNearby(position: Position, radius: number = 5000) {
    return this.http.get(`${environment.API_URL}?lat=${position.coords.latitude}&long=${position.coords.longitude}&rad=${radius}`)
      .map(res => {
        let json = res.json();
        return _.map(json.restaurants, r => {
            return new Restaurant(r);
        });
      });
  }

  generateQuestions(restaurants: Restaurant[]) {
    let restaurantCuisines: any = {};

    _.each(restaurants, (r: Restaurant) => {
      _.each(r.cuisines, cuisine => {
        if(_.isNil(restaurantCuisines[cuisine])) {
          restaurantCuisines[cuisine] = [];
        }
        restaurantCuisines[cuisine].push(r);
      });
    });

    return restaurantCuisines;
  }

}

export class Restaurant {
    id: number;
    name: string;
    address: string;
    cuisines: string[];
    image: string;

    constructor(dto: any) {
        this.id = dto.id;
        this.name = dto.name;
        this.address = dto.address;
        this.cuisines = dto.cuisines;
        this.image = dto.image;
    }
}