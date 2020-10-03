import makeQueue from '../queue';
import makeMaskQueue from '../mask/mask-queue';
import makeMaskEndpointHandler from '../mask/mask-endpoint';

// Should the queue be based on the object name? Or a single shared queue? Depends on resource usage and other factors.
const producerQueue = makeQueue("default");
// console.log(`queue => ${JSON.stringify(queue, undefined, 2)}`);
const maskQueue = makeMaskQueue({ queue: producerQueue });
// console.log(`maskQueue => ${JSON.stringify(maskQueue, undefined, 2)}`);
const maskEndpointHandler = makeMaskEndpointHandler({ maskQueue });

export default maskEndpointHandler;