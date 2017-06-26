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
    // return new BehaviorSubject<any>(dummyResponse());
    return this.http.get(`https://developers.zomato.com/api/v2.1/search?lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=${radius}&sort=real_distance`,
      new RequestOptions({headers: new Headers({'user-key': environment.ZOMATO_API_KEY})}))
      .map(res => {
        let json = res.json();
        return _.map(json.restaurants, r => {
            return new Restaurant(r.restaurant);
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
        this.address = dto.location.address;
        this.cuisines = _.map((dto.cuisines as string).split(/,/), c => {
            return _.trim(c);
        });
        this.image = dto.thumb;
    }
}

function dummyResponse() {
  return JSON.parse(`{
    "results_found": 683,
    "results_start": 0,
    "results_shown": 20,
    "restaurants": [
        {
            "restaurant": {
                "R": {
                    "res_id": 16541758
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16541758",
                "name": "Old boy Cafe",
                "url": "https://www.zomato.com/perth/old-boy-cafe-applecross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "Shop 10, 781 Canning Highway, Applecross, Melville, Perth",
                    "locality": "Canning Highway, Applecross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0198434504",
                    "longitude": "115.8346023783",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Canning Highway, Applecross, Perth, WA"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Cafe, Coffee and Tea",
                "average_cost_for_two": 30,
                "price_range": 2,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16541758_RESTAURANT_6fd3c103dcbe1b647b0e2450a7d27c9d.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "3.4",
                    "rating_text": "Average",
                    "rating_color": "CDD614",
                    "votes": "45"
                },
                "photos_url": "https://www.zomato.com/perth/old-boy-cafe-applecross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/old-boy-cafe-applecross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16541758_RESTAURANT_6fd3c103dcbe1b647b0e2450a7d27c9d.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16541758",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/old-boy-cafe-applecross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16599634
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16599634",
                "name": "Ji Emon",
                "url": "https://www.zomato.com/perth/ji-emon-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "29 Kearns Crescent, Ardross, Melville, Perth",
                    "locality": "Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0203800000",
                    "longitude": "115.8350820000",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Ardross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Asian, Breakfast, Japanese",
                "average_cost_for_two": 0,
                "price_range": 1,
                "currency": "$",
                "offers": [],
                "thumb": "",
                "user_rating": {
                    "aggregate_rating": "3.1",
                    "rating_text": "Average",
                    "rating_color": "CDD614",
                    "votes": "17"
                },
                "photos_url": "https://www.zomato.com/perth/ji-emon-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/ji-emon-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16599634",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/ji-emon-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16597747
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16597747",
                "name": "Applecross Pizza",
                "url": "https://www.zomato.com/perth/applecross-pizza-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "36 Kearns Crescent, Applecross, Ardross, Perth",
                    "locality": "Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0199591477",
                    "longitude": "115.8353118226",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Ardross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Pizza",
                "average_cost_for_two": 40,
                "price_range": 2,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16597747_RESTAURANT_b4df3800d038d9807bf952228f0c3d79.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "3.6",
                    "rating_text": "Good",
                    "rating_color": "9ACD32",
                    "votes": "191"
                },
                "photos_url": "https://www.zomato.com/perth/applecross-pizza-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/applecross-pizza-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16597747_RESTAURANT_b4df3800d038d9807bf952228f0c3d79.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16597747",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/applecross-pizza-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 18156164
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "18156164",
                "name": "Crust",
                "url": "https://www.zomato.com/perth/crust-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "Shop 1, 31 Kearns Crescent, Applecross, Ardross, Perth",
                    "locality": "Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0200538000",
                    "longitude": "115.8353367000",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Ardross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Pizza",
                "average_cost_for_two": 40,
                "price_range": 2,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16597373_CHAIN_591e48d0530d9a93bffb587fe5a35ef5.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "3.1",
                    "rating_text": "Average",
                    "rating_color": "CDD614",
                    "votes": "16"
                },
                "photos_url": "https://www.zomato.com/perth/crust-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/crust-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16597373_CHAIN_591e48d0530d9a93bffb587fe5a35ef5.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/18156164",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/crust-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16596685
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16596685",
                "name": "Ohnamiya Japanese",
                "url": "https://www.zomato.com/perth/ohnamiya-japanese-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "34 Kearns Crescent, Applecross, Ardross, Perth",
                    "locality": "Kearns Crescent, Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0198734000",
                    "longitude": "115.8353793000",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Kearns Crescent, Ardross, Perth, WA"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Japanese",
                "average_cost_for_two": 45,
                "price_range": 2,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16596685_RESTAURANT_e2bd430c26300cd36573fd3907dc9ea0.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "4.2",
                    "rating_text": "Very Good",
                    "rating_color": "5BA829",
                    "votes": "908"
                },
                "photos_url": "https://www.zomato.com/perth/ohnamiya-japanese-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/ohnamiya-japanese-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16596685_RESTAURANT_e2bd430c26300cd36573fd3907dc9ea0.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16596685",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/ohnamiya-japanese-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16596913
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16596913",
                "name": "Wing Wah Chinese Restaurant",
                "url": "https://www.zomato.com/perth/wing-wah-chinese-restaurant-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "787A Canning Highway, Applecross, Ardross, Perth",
                    "locality": "Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0197370000",
                    "longitude": "115.8353580000",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Ardross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Chinese",
                "average_cost_for_two": 0,
                "price_range": 1,
                "currency": "$",
                "offers": [],
                "thumb": "",
                "user_rating": {
                    "aggregate_rating": "2.8",
                    "rating_text": "Average",
                    "rating_color": "FFBA00",
                    "votes": "63"
                },
                "photos_url": "https://www.zomato.com/perth/wing-wah-chinese-restaurant-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/wing-wah-chinese-restaurant-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16596913",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/wing-wah-chinese-restaurant-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 18235654
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "18235654",
                "name": "Maharaja Indian Restaurant Applecross",
                "url": "https://www.zomato.com/perth/maharaja-indian-restaurant-applecross-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "24 Kearns Crescent, Ardross, Melville, Perth",
                    "locality": "Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0205293883",
                    "longitude": "115.8353721723",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Ardross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Indian",
                "average_cost_for_two": 80,
                "price_range": 3,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/18235654_RESTAURANT_b7a386f4f16743ad2a234d0fc35b2af7.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "3.1",
                    "rating_text": "Average",
                    "rating_color": "CDD614",
                    "votes": "13"
                },
                "photos_url": "https://www.zomato.com/perth/maharaja-indian-restaurant-applecross-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/maharaja-indian-restaurant-applecross-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/18235654_RESTAURANT_b7a386f4f16743ad2a234d0fc35b2af7.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/18235654",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/maharaja-indian-restaurant-applecross-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16596059
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16596059",
                "name": "Himali Gurkha",
                "url": "https://www.zomato.com/perth/himali-gurkha-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "17 Kearns Crescent, Ardross, Perth",
                    "locality": "Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0206209221",
                    "longitude": "115.8354164287",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Ardross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Tibetan, Nepalese, Indian",
                "average_cost_for_two": 86,
                "price_range": 3,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16596059_RESTAURANT_7495abc69d61ddded3b40ff958c5cb4e.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "4.0",
                    "rating_text": "Very Good",
                    "rating_color": "5BA829",
                    "votes": "402"
                },
                "photos_url": "https://www.zomato.com/perth/himali-gurkha-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/himali-gurkha-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16596059_RESTAURANT_7495abc69d61ddded3b40ff958c5cb4e.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16596059",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/himali-gurkha-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16596371
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16596371",
                "name": "Sensations En Ardross",
                "url": "https://www.zomato.com/perth/sensations-en-ardross-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "15-19 Kearns Crescent, Ardross, Melville, Perth",
                    "locality": "Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0207892076",
                    "longitude": "115.8353715017",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Ardross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Cafe, Healthy Food",
                "average_cost_for_two": 40,
                "price_range": 2,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16596371_RESTAURANT_5b6aaab2d566168c3ab1550735dc949f.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "3.5",
                    "rating_text": "Good",
                    "rating_color": "9ACD32",
                    "votes": "95"
                },
                "photos_url": "https://www.zomato.com/perth/sensations-en-ardross-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/sensations-en-ardross-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16596371_RESTAURANT_5b6aaab2d566168c3ab1550735dc949f.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16596371",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/sensations-en-ardross-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16597005
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16597005",
                "name": "Spirit House",
                "url": "https://www.zomato.com/perth/spirit-house-1-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "Suite 4/18-22 Riseley Street, Ardross, Ardross, Perth",
                    "locality": "Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0209864879",
                    "longitude": "115.8351146802",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Ardross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Thai",
                "average_cost_for_two": 45,
                "price_range": 2,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16597005_RESTAURANT_9154b47efc43e83dc07f9bcb55482f55.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "4.3",
                    "rating_text": "Very Good",
                    "rating_color": "5BA829",
                    "votes": "510"
                },
                "photos_url": "https://www.zomato.com/perth/spirit-house-1-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/spirit-house-1-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16597005_RESTAURANT_9154b47efc43e83dc07f9bcb55482f55.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16597005",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/spirit-house-1-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16541772
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16541772",
                "name": "Pearl Restaurant",
                "url": "https://www.zomato.com/perth/pearl-restaurant-applecross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "11 Riseley Street, Applecross, Perth Applecross",
                    "locality": "Applecross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0211178183",
                    "longitude": "115.8343998715",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Applecross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Asian, Vietnamese",
                "average_cost_for_two": 70,
                "price_range": 3,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16541772_RESTAURANT_75155b740d7814a5857db2692f25ab61.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "2.5",
                    "rating_text": "Average",
                    "rating_color": "FFBA00",
                    "votes": "69"
                },
                "photos_url": "https://www.zomato.com/perth/pearl-restaurant-applecross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/pearl-restaurant-applecross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16541772_RESTAURANT_75155b740d7814a5857db2692f25ab61.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16541772",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/pearl-restaurant-applecross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16599880
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16599880",
                "name": "Bad Apples Bar",
                "url": "https://www.zomato.com/perth/bad-apples-bar-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "Shop 6, 16 Riseley Street, Ardross, Melville, Perth",
                    "locality": "Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0211641534",
                    "longitude": "115.8349195495",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Ardross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Pizza, Tapas",
                "average_cost_for_two": 79,
                "price_range": 3,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16599880_RESTAURANT_62f0f428e6349a65cc82bf131e748b07.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "3.8",
                    "rating_text": "Good",
                    "rating_color": "9ACD32",
                    "votes": "597"
                },
                "photos_url": "https://www.zomato.com/perth/bad-apples-bar-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/bad-apples-bar-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16599880_RESTAURANT_62f0f428e6349a65cc82bf131e748b07.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16599880",
                "has_table_booking": 1,
                "book_url": "https://www.zomato.com/perth/bad-apples-bar-ardross/book?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "events_url": "https://www.zomato.com/perth/bad-apples-bar-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16596069
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16596069",
                "name": "Il Ciao",
                "url": "https://www.zomato.com/perth/il-ciao-applecross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "771 Canning Highway, Applecross, Melville, Perth",
                    "locality": "Applecross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0207860000",
                    "longitude": "115.8334200000",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Applecross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Italian, Pizza",
                "average_cost_for_two": 89,
                "price_range": 3,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16596069_RESTAURANT_746390afa6cb6f491fedf38afb5a67b5.JPG?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "3.8",
                    "rating_text": "Good",
                    "rating_color": "9ACD32",
                    "votes": "701"
                },
                "photos_url": "https://www.zomato.com/perth/il-ciao-applecross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/il-ciao-applecross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16596069_RESTAURANT_746390afa6cb6f491fedf38afb5a67b5.JPG",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16596069",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/il-ciao-applecross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16601529
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16601529",
                "name": "Grill'd - Applecross",
                "url": "https://www.zomato.com/perth/grilld-applecross-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "18 Riseley Street, Ardross, Melville, Perth",
                    "locality": "Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0212490000",
                    "longitude": "115.8351670000",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Ardross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Burger, Healthy Food",
                "average_cost_for_two": 35,
                "price_range": 2,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16597105_CHAIN_b68e0f59bcab1cb12c0cecdd60ee4102.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "3.4",
                    "rating_text": "Average",
                    "rating_color": "CDD614",
                    "votes": "123"
                },
                "photos_url": "https://www.zomato.com/perth/grilld-applecross-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/grilld-applecross-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16597105_CHAIN_b68e0f59bcab1cb12c0cecdd60ee4102.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16601529",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/grilld-applecross-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 18355983
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "18355983",
                "name": "Paste Thai",
                "url": "https://www.zomato.com/perth/paste-thai-applecross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "Unit 3-4, Rear 3 Kearns Crescent, Ardross, Applecross, Perth",
                    "locality": "Applecross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0213096968",
                    "longitude": "115.8338587359",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Applecross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Thai",
                "average_cost_for_two": 75,
                "price_range": 3,
                "currency": "$",
                "offers": [],
                "thumb": "",
                "user_rating": {
                    "aggregate_rating": "3.2",
                    "rating_text": "Average",
                    "rating_color": "CDD614",
                    "votes": "16"
                },
                "photos_url": "https://www.zomato.com/perth/paste-thai-applecross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/paste-thai-applecross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/18355983",
                "has_table_booking": 1,
                "book_url": "https://www.zomato.com/perth/paste-thai-applecross/book?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "events_url": "https://www.zomato.com/perth/paste-thai-applecross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16596677
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16596677",
                "name": "Dome",
                "url": "https://www.zomato.com/perth/dome-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "20 Risely Street, Applecross, Ardross, Perth",
                    "locality": "Riseley Street, Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0214230000",
                    "longitude": "115.8351210000",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Riseley Street, Ardross, Perth, WA"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Cafe, Coffee and Tea",
                "average_cost_for_two": 43,
                "price_range": 2,
                "currency": "$",
                "offers": [],
                "thumb": "",
                "user_rating": {
                    "aggregate_rating": "3.1",
                    "rating_text": "Average",
                    "rating_color": "CDD614",
                    "votes": "119"
                },
                "photos_url": "https://www.zomato.com/perth/dome-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/dome-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16596677",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/dome-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16595832
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16595832",
                "name": "C15 Espresso",
                "url": "https://www.zomato.com/perth/c15-espresso-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "15 Riseley Street, Applecross, Ardross, Perth",
                    "locality": "Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0215440000",
                    "longitude": "115.8344770000",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Ardross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Deli, Coffee and Tea",
                "average_cost_for_two": 45,
                "price_range": 2,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16595832_RESTAURANT_ae199cfb0be28f698427a41471ef1374.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "3.4",
                    "rating_text": "Average",
                    "rating_color": "CDD614",
                    "votes": "429"
                },
                "photos_url": "https://www.zomato.com/perth/c15-espresso-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/c15-espresso-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16595832_RESTAURANT_ae199cfb0be28f698427a41471ef1374.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16595832",
                "has_table_booking": 1,
                "book_url": "https://www.zomato.com/perth/c15-espresso-ardross/book?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "events_url": "https://www.zomato.com/perth/c15-espresso-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16600159
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16600159",
                "name": "Melting Pot Cafe",
                "url": "https://www.zomato.com/perth/melting-pot-cafe-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "Shop 7, 3 Kearns Crescent, Ardross, Melville, Perth",
                    "locality": "Kearns Crescent, Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0215288642",
                    "longitude": "115.8341953531",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Kearns Crescent, Ardross, Perth, WA"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Asian, Malaysian",
                "average_cost_for_two": 45,
                "price_range": 2,
                "currency": "$",
                "offers": [],
                "thumb": "https://b.zmtcdn.com/data/res_imagery/16600159_RESTAURANT_4c32c61cbcfce2fff04dfc2b9cc7b07c.jpg?fit=around%7C200%3A150&crop=200%3A150%3B%2A%2C%2A",
                "user_rating": {
                    "aggregate_rating": "3.6",
                    "rating_text": "Good",
                    "rating_color": "9ACD32",
                    "votes": "105"
                },
                "photos_url": "https://www.zomato.com/perth/melting-pot-cafe-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/melting-pot-cafe-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "https://b.zmtcdn.com/data/res_imagery/16600159_RESTAURANT_4c32c61cbcfce2fff04dfc2b9cc7b07c.jpg",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16600159",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/melting-pot-cafe-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 16597934
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "16597934",
                "name": "Gelare",
                "url": "https://www.zomato.com/perth/gelare-ardross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "3 Kearns Crescent, Ardross, Melville, Perth",
                    "locality": "Kearns Crescent, Ardross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0214893000",
                    "longitude": "115.8338848000",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Kearns Crescent, Ardross, Perth, WA"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Desserts, Coffee and Tea",
                "average_cost_for_two": 35,
                "price_range": 2,
                "currency": "$",
                "offers": [],
                "thumb": "",
                "user_rating": {
                    "aggregate_rating": "3.4",
                    "rating_text": "Average",
                    "rating_color": "CDD614",
                    "votes": "94"
                },
                "photos_url": "https://www.zomato.com/perth/gelare-ardross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/gelare-ardross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/16597934",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/gelare-ardross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        },
        {
            "restaurant": {
                "R": {
                    "res_id": 17973905
                },
                "apikey": "c81803edf91fa0a8305673c069887e1d",
                "id": "17973905",
                "name": "Applecross SK Cuisine",
                "url": "https://www.zomato.com/perth/applecross-sk-cuisine-applecross?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "location": {
                    "address": "755 Canning Highway, Applecross, Melville, Perth",
                    "locality": "Applecross",
                    "city": "Perth",
                    "city_id": 296,
                    "latitude": "-32.0217224475",
                    "longitude": "115.8321934193",
                    "zipcode": "6153",
                    "country_id": 14,
                    "locality_verbose": "Applecross"
                },
                "switch_to_order_menu": 0,
                "cuisines": "Chinese",
                "average_cost_for_two": 47,
                "price_range": 2,
                "currency": "$",
                "offers": [],
                "thumb": "",
                "user_rating": {
                    "aggregate_rating": "2.8",
                    "rating_text": "Average",
                    "rating_color": "FFBA00",
                    "votes": "16"
                },
                "photos_url": "https://www.zomato.com/perth/applecross-sk-cuisine-applecross/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                "menu_url": "https://www.zomato.com/perth/applecross-sk-cuisine-applecross/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                "featured_image": "",
                "has_online_delivery": 0,
                "is_delivering_now": 0,
                "deeplink": "zomato://restaurant/17973905",
                "has_table_booking": 0,
                "events_url": "https://www.zomato.com/perth/applecross-sk-cuisine-applecross/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "establishment_types": []
            }
        }
    ]
}`);
}