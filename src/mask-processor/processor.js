// module.exports = function(job) {
//     // Do some heavy work
    
//     return Promise.resolve(result);
// }

import makeObjectMask from '../mask/object-mask';
// import makeFieldMask from '../mask/field-mask';
import { makeFieldMaskExecutor } from './executor-factory';

export default function makeProcessor ({ dataTransformer }) {
    return Object.freeze({
        processObjectMask
    });
    
    async function processObjectMask (job, done) {
        // dataTransformer;
        console.log(`processObjectMask: job.data => ${JSON.stringify(job.data, undefined, 2)}`);
        const objectMask = makeObjectMask(job.data);
        console.log(`processObjectMask: objectMask => ${JSON.stringify(objectMask, undefined, 2)}`);

        const allSuccessful = true;
        await Promise.all(objectMask.fieldMasks.map(async (fieldMask) => {
            console.log(`Processing fieldMask: ${JSON.stringify(fieldMask, undefined, 2)}`);
            const fieldMaskExecutor = makeFieldMaskExecutor({ dataTransformer, rule: fieldMask.rule });
            const success = await fieldMaskExecutor({
                objectName: objectMask.objectName,
                ...fieldMask
            });
            if (!success) {
                allSuccessful = false;
            }
        }));
        console.log(`Finished processing object: ${objectMask.objectName}. ${allSuccessful ? 'All updates passed!' : 'One or more updates failed!'}`);

        done();
    }
}