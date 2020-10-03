import makeQueue from '../queue';
// import makeMaskQueue from '../mask/mask-queue';
import makeDb from '../db';
import makeDataTransformer from './data-transformer';
import makeProcessor from './processor';

// Should the queue be based on the object name? Or a single shared queue? Depends on resource usage and other factors.
const consumerQueue = makeQueue("default");
const database = makeDb(); // Postgres pg connection, promise
// const maskQueue = makeMaskQueue({ queue: consumerQueue });
const dataTransformer = makeDataTransformer({ database });

const processor = makeProcessor({ dataTransformer });

export default function startMaskProcessor() {
    console.log("Starting object-mask-processor...");
    consumerQueue.process(processor.processObjectMask);
}

// consumerQueue.process('object-mask-processor', 1, './processor.js');
// export default makeDataTransformer;