import http from 'http';
import express from 'express';
import cors from 'cors';
import api from './api';
import logger from 'morgan';
import bodyParser from 'body-parser';
import multipartMiddleware from 'connect-multiparty';
import _ from 'lodash';
import { sendRes } from './lib/utils';

var app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit: '20mb'
}));

// internal middleware
app.use(multipartMiddleware());
app.use(logger('dev'));

app.use('/public', express.static(__dirname + '/../public'));

// api router
_.map(api, function(func, route){
    app.use('/' + route.toLowerCase(), func, sendRes);
});

// api router
app.use('/', (req, res, next) => {
    res.redirect('/public/login.html');
});

//uncaughtException
process.on('uncaughtException', function(err) {
    console.log(err);
});

app.server.listen(process.env.PORT || 8000);

console.log(`Started on port 8000`);

export default app;
