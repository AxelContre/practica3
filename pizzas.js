var mongoose = require('mongoose');
const app = require('./app');
var port = process.env.PORT || 9000;

mongoose.connect('mongodb://127.0.0.1:27017/pizzas', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("conexión exitosa");
        app.listen(port, function() {
            console.log("Servidor de pizzas se puede visuzalizar en http://localhost:" + port)
        });
    }
})