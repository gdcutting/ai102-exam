const { app } = require('@azure/functions');

app.storageQueue('storageQueueTriggerPy', {
    queueName: 'py-queue-items',
    connection: 'ai102storage123_STORAGE',
    handler: (queueItem, context) => {
        context.log('Storage queue function processed work item:', queueItem);
    }
});
