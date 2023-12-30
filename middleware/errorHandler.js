import { logEvents } from './logEvents';

const errorHandler = app.use(function (err, req, res, next){
    // logEvents(`{$err.name}`, 'errorLog.txt')
    console.error(err.stack)
    res.status(500).res.send(err.message)
});

export default errorHandler();