export default function adaptRequest (req = {}) {
    const frozenReq = Object.freeze({
        path: req.path,
        method: req.method,
        pathParams: req.params,
        queryParams: req.query,
        body: req.body
    });
    // console.log(JSON.stringify(frozenReq, undefined, 2));
    return frozenReq;
}