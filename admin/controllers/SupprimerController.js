let model = require("../models/vip.js");
var async = require("async");

// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = function(request, response){
    let num = request.params.num;

    response.title = 'Supprimer une star';
    async.parallel ([
        function(callback) {
            model.getAllVip(function(err, result) { callback(null, result) });
        },
        function(callback) {
            model.getInfoOneVip(num, (function(errE, resE) { callback(null, resE)}));
        }
    ],
    function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.vip = result[0];
        response.lettreNom = result[1];

        

        response.render('supprimerVip', response); 
    }); 
};


