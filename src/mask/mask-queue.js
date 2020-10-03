import makeObjectMask from './object-mask';

export default function makeMaskQueue ({ queue }) {
    return Object.freeze({
        push
        // pop?
    });

    async function push(objectMask) {
        // console.log(`queue => ${JSON.stringify(queue, undefined, 2)}`);
        // const queue = queue;
        // Returns a bull "job" object
        return await queue.add(objectMask);
    }
    
}