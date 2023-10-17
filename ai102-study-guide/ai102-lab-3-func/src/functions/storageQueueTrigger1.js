// module.exports = async function (context, myQueueItem) {
//    context.log('JavaScript queue trigger function processed work item', myQueueItem);
//};

module.exports = function(context, myQueueItem){
    context.log('Processing queue message', myQueueItem);
    let https = require('https');
    let accessKey = '49ee0dce446b43048191dee446fcf9dc';
    let uri = 'east.api.cognitive.microsoft.com';
    let path = 'text/analytics/v2.0/sentiment';
    let response_handler = function(response){
        let body = '';
        response.on('data', function(chunk){body += chunk;})
        response.on('end', function(){
            let body = JSON.parse(body);
            let body__ = JSON.stringify(body_, null, '  ');
            context.log(body__);
            context.done();
            return;})
        response.on('error', function(e){
            context.log('Error ' + e.message);
            context.done;
            return;
        })
    }
    let get_sentiments = function (documents) {
        let body = JSON.stringify(documents)
        let request_params = {
            method : 'POST',
            hostname : uri,
            path : path,
            headers: {'Ocp-Apim-Subscription-Key': accessKey, }
        }
        let req = https.request(request_params,response_handler);
        req.write(body);
        req.end();
    }
    let documents = {'documents': [{'id': '1', 'language': 'en', 'text': myQueueItem}]};

    get_sentiments(documents);
};