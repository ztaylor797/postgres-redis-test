import express from 'express';
import bodyParser from 'body-parser';

import adaptRequest from '../helpers/adapt-request';

import handleCustomersRequest from '../customers';
import handleMaskRequest from '../mask-endpoint';

export default function startExpress () {
    const app = express();
    app.use(bodyParser.json());

    const port = process.env.PORT || 3000;

    app.get('/', (req, res) => {
        res.send('Try navigating to /customers!')
    });

    app.all('/customers', customersController);
    app.get('/customers/:id', customersController);

    app.all('/mask', maskController);

    // app.get('/mask', maskController);

    function customersController (req, res) {
        const httpRequest = adaptRequest(req);

        handleCustomersRequest(httpRequest)
            .then(({ headers, statusCode, data }) =>
                res
                .set(headers)
                .status(statusCode)
                .send(data)
            )
            .catch(e => {
                console.error(e);
                res.status(500).end();
            });
    }

    function maskController (req, res) {
        const httpRequest = adaptRequest(req);

        handleMaskRequest(httpRequest)
            .then(({ headers, statusCode, data }) =>
                res
                .set(headers)
                .status(statusCode)
                .send(data)
            )
            .catch(e => {
                console.error(e);
                res.status(500).end();
            });
    }

    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`)
    });
}