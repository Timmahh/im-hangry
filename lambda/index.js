var request = require('request');
var requestPromise = require('request-promise-native');

exports.handler = (event, context, callback) => {
    process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

    let lat = event.queryStringParameters ? event.queryStringParameters.lat : event.lat;
    let long = event.queryStringParameters ? event.queryStringParameters.long : event.long;
    let rad = event.queryStringParameters ? event.queryStringParameters.rad : event.rad;

    console.log("Request: " + JSON.stringify(event));
    console.log(`Latitude: ${lat}; Longitude: ${long}; Radius: ${rad}`);

    let createResponse = (body) => {
        return { 
            "statusCode": 200, 
            "headers": {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials' : true,
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                "restaurants": body.restaurants.map(r => {
                    return {
                        "id": r.restaurant.id,
                        "name": r.restaurant.name,
                        "address": r.restaurant.location.address,
                        "cuisines": r.restaurant.cuisines.split(/,/).map(c => {
                            return c.trim();
                        }),
                        "image": r.restaurant.thumb
                    };
                })
            })
        }
    };

    request.get(`https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${long}&radius=${rad}&sort=real_distance`, 
        {headers: {'user-key': process.env['ZOMATO_API_KEY']}},
        (err, res) => {
            let body = JSON.parse(res.body);

            console.log(`Results Found: ${body.results_found}`);

            if(body.results_found > 20) {
                let additionalRequests = [];
                for(let i = 20; i < body.results_found && i <= 100; i += 20) {
                    additionalRequests.push(requestPromise.get(`https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${long}&radius=${rad}&sort=real_distance&start=${i}`, 
                        {headers: {'user-key': process.env['ZOMATO_API_KEY']}}));
                }
                Promise.all(additionalRequests)
                    .then(values => {
                        for(let j = 0; j < values.length; j++) {
                            let value = JSON.parse(values[j]);
                            body.restaurants = body.restaurants.concat(value.restaurants);
                        }

                        console.log(`Results Returned: ${body.restaurants.length}`);
                        callback(err, createResponse(body));
                    });
            } else {
                console.log(`Results Returned: ${body.restaurants.length}`);
                callback(err, createResponse(body));
            }
        });
};