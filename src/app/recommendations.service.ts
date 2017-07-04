import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {} from '@types/googlemaps';
import * as _ from 'lodash';
import { environment } from '../environments/environment';

@Injectable()
export class RecommendationsService {

  radiusToSearch: BehaviorSubject<number> = new BehaviorSubject(5000);

  constructor(private http: Http) {
   }

  getRestaurantsNearby(position: Position) {
    return this.http.get(`${environment.API_URL}?lat=${position.coords.latitude}&long=${position.coords.longitude}&rad=${this.radiusToSearch.getValue()}`)
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
        if(!restaurantCuisines[cuisine]) {
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
    priceRange: number;
    currency: string;
    rating: number;

    constructor(dto: any) {
        this.id = dto.id;
        this.name = dto.name;
        this.address = dto.address;
        this.cuisines = dto.cuisines;
        this.image = dto.image;
        this.priceRange = dto.priceRange;
        this.currency = dto.currency;
        this.rating = parseFloat(dto.rating);
    }
}