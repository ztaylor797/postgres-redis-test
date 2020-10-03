var Queue = require('bull');

export default function makeQueue(name) {
    const queue = new Queue(name, process.env.REDIS_URL);
    // console.log(`queue => ${JSON.stringify(queue, undefined, 2)}`);
    return queue;
}