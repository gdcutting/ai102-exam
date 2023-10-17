module.exports = function (context, myQueueItem) {
    context.log('Processing queue message', myQueueItem);
    let https = require('https');
    let accessKey = 'DVJB7sUkju7fzdwnW9O2s8n8PnCQxt-C1AHyDSPyhM3lAzFupj5x7g==';
    let uri = 'westus.api.cognitive.microsoft.com';
    let path = '/text/analytics/v2.0/sentiment';
    let response_handler = function(response){
        let body = '';
        response.on('data', function(chunk){body += chunk;});
        response.on('end', function(){
            let body_ = JSON.parse(body);
            if (body_.documents && body_.documents.length == 1) {
                let score = body_.documents[0].score;
                let messageWithScore == JSON.stringify ({
                    originalMessage: myQueueItem,
                    score: score
                });

                if (score > 0.8) {
                    context.log ('Positive message arrived');
                    context.bindings.PositiveFeedbackQueueItem = messageWithScore;
                } else if (score > 0.3) {
                    context.log ('Negative message arrived');
                    context.bindings.NegtiveFeedbackQueueItem = messageWithScore;
                } else {
                    context.log ('Neutral message arrived');
                    context.bindings.NeutralFeedbackQueueItem = messageWithScore;
                }
            }

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