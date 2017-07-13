import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
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
        let restaurants: Restaurant[] = [];
        for(let i = 0; i < json.restaurants.length; i++) {
          restaurants.push(new Restaurant(json.restaurants[i]));
        }
        return restaurants;
      });
  }

  generateQuestions(restaurants: Restaurant[]) {
    let restaurantCuisines: any = {};
    for(let i = 0; i < restaurants.length; i++) {
      let r = restaurants[i];
      for(let j = 0; j < r.cuisines.length; j++) {
        let cuisine = r.cuisines[j];
        if(!restaurantCuisines[cuisine]) {
          restaurantCuisines[cuisine] = [];
        }
        restaurantCuisines[cuisine].push(r);
      }
    }
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
    url: string;

    constructor(dto: any) {
        this.id = dto.id;
        this.name = dto.name;
        this.address = dto.address;
        this.cuisines = dto.cuisines;
        this.image = dto.image;
        this.priceRange = dto.priceRange;
        this.currency = dto.currency;
        this.rating = parseFloat(dto.rating);
        this.url = dto.url;
    }
}