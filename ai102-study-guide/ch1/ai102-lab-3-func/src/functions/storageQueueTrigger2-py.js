const { app } = require('@azure/functions');

app.storageQueue('storageQueueTrigger2-py', {
    queueName: 'new-feedback-q',
    connection: 'ai102storage123_STORAGE',
    handler: (queueItem, context) => {
        context.log('Storage queue function processed work item:', queueItem);
    }
});
