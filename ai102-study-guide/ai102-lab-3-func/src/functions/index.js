module.exports = function (context, myQueueItem) {
    context.log('Processing queue message', myQueueItem);
    let https = require('https');
    let accessKey = 'r3bga4IlDOvsNI8EcJI_-R_MFZ8gvuO0F9XIU9R3LefRAzFu8v34CQ==';
    let uri = 'westus.api.cognitive.microsoft.com';
    let path = '/text/analytics/v2.0/sentiment';
    let response_handler = function(response){
        let body = '';
        response.on('data', function(chunk){body += chunk;});
        response.on('end', function(){
            let body_ = JSON.parse(body);
            let body__ = JSON.stringify(body_, null, '  ');
            context.log(body__);
            context.done();
            return;});
        response.on('error', function(e){
            context.log('Error ' + e.message);
            context.done;
            return;
        });
    };
    let get_sentiments = function (documents) {
        let body = JSON.stringify(documents);
        let request_params = {
            method : 'POST',
            hostname : uri,
            path : path,
            headers: {'Ocp-Apim-Subscription-Key': accessKey, }
        };
        let req = https.request(request_params,response_handler);
        req.write(body);
        req.end();
    };
    let documents = {'documents': [{'id': '1', 'language': 'en', 'text': myQueueItem}]};

    get_sentiments(documents);
};