let HomeController = require('./../controllers/HomeController');
let SupprimerController = require('../controllers/SupprimerController');
let ModifierController = require('./../controllers/ModifierController');
let AjouterController = require('./../controllers/AjouterController');
let PhotoController = require('./../controllers/PhotoController');


// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// ajouter VIP
    app.get('/ajouter', AjouterController.Repertoire);

// modifier VIP
    app.get('/modifier', ModifierController.Repertoire);
    app.get('/modifier/:num', ModifierController.Repertoire);
    
// supprimer VIP
    app.get('/supprimer', SupprimerController.Repertoire);

// photos VIP
    app.get('/photo', PhotoController.Repertoire);
    app.get('/photo/supprimer', PhotoController.Repertoire);
    app.get('/photo/ajouter', PhotoController.Repertoire);


// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
