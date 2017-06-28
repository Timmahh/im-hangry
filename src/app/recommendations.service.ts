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

  getNearbyPlacesList(position: Position) {
    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    let map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 15
    });
    let request = {
      location: location,
      radius: 500,
      type: 'cafe'
    };
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (res, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < res.length; i++) {
          var place = res[i];
          console.log(place);
        }
      }
    });
  }

  getRestaurantsNearby(position: Position, radius: number = 5000) {
    return this.http.get(`https://z509rq6oq9.execute-api.ap-southeast-2.amazonaws.com/prod/im-hangry?lat=${position.coords.latitude}&long=${position.coords.longitude}&rad=${radius}`)
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

class Restaurant {
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

function dummyResponse() {
  return JSON.parse(``);
}