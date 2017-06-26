var request = require('request');

exports.handler = (event, context, callback) => {
    process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

    request.get(`https://developers.zomato.com/api/v2.1/search?lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=${radius}&sort=real_distance`, 
        { 'headers': { 'user-key': process.env['ZOMATO_API_KEY'] } },
        (res, err) => {
            console.log(res);
            console.error(err);
        });
};