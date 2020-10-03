
export function makeRandomExecutor({ dataTransformer }) {
    return async function ({ objectName, fieldName, ...otherOptions }) {
        console.log(`Executing random rule on ${objectName}`);
        return {
            success: true
        };
    }
}

export function makeLibraryExecutor({ dataTransformer }) {
    return async function ({ objectName, fieldName, ...otherOptions }) {
        console.log(`Executing library rule on ${objectName}`);
        return {
            success: true
        };
    }
}

export function makeDeleteExecutor({ dataTransformer }) {
    return async function ({ objectName, fieldName }) {
        console.log(`Executing delete rule on ${objectName}`);
        try {
            const res = await dataTransformer.deleteAll({ objectName, fieldName });
            return {
                success: res.success
            };
        } catch (err) {
            console.error('deleteExecutor error: ', err);
            return {
                success: false
            };
        }
    }
}