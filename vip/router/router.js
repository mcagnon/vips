let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let ArticleController = require('./../controllers/ArticleController');


// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoire/:lettre', VipController.Repertoire);
    app.get('/repertoire/info/:num', VipController.Repertoire);


 // albums
   app.get('/album', AlbumController.Album);
   app.get('/album/:num', AlbumController.Album);

// articles
    app.get('/articles', ArticleController.Article);
    app.get('/articles/:num', ArticleController.Article);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
