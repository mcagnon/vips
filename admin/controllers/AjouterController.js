let model = require("../models/vip.js");
var async = require("async");

//  A J O U T E R    U N E    S T A R 

module.exports.Repertoire = function(request, response){
    let num = request.params.num;
    
    

    response.title = 'Ajouter une star';
    async.parallel ([
        function(callback) {
            model.getNationalite(function(err, result) { callback(null, result) });
        },
        function(callback) {
            model.getInfoOneVip(num, function(err, result) { callback(null, result) });
        },
        
    ],
    function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.nationalite = result[0];
        response.netio = result[1];

        let data = request.body.ajout;
        console.log(data);
        model.setVip(data, function(err, result) { if (err) {
            console.log(err);
            return;
        } });

        response.render('ajouterVip', response); 
    }); 
};


