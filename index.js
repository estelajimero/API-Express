let express = require("express"),
    app = express();
    http = require("http");
    server = http.createServer(app);
    mongoose = require('mongoose');

let methodOverride = require('method-override');

//Connection to DB
mongoose.connect('mongodb://localhost/agenda', function(err, res) {
    if(err) {
        console.log('ERROR: conectando a base de datos.' + err);
    } 
    app.listen(3000, function() {
        console.log("Node server running on http://localhost:3000");
    });
})

//Middelwares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride());

//Import Models and controllers
let contactoController = require('./controllers/contactoController');

//Example route
let router = express.Router();

router.get('/', function(req, res) {
    res.send("Hello World!");
});

app.use(router);

//API routes
let contactosRouter = express.Router();

contactosRouter.route('/contacto')
    .get(contactoController.findAllContactos)
    .post(contactoController.addContacto);

contactosRouter.route('/contacto/:id')
    .get(contactoController.findById)
    .put(contactoController.updateContacto)
    .delete(contactoController.deleteContacto);

app.use('/', contactosRouter);

