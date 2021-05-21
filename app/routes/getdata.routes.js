module.exports = (app) => {
    const go = require('../controllers/getdata.controller.js');
    app.get('/getdata', go.getdata);
    app.post('/postdata', go.postdata);
    app.delete('/deletedata', go.deleteitems);
    app.put('/updatedata', go.updatedata);
}