let model = require("../models/vip.js");
var async = require("async");

// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = function(request, response){
    let lettre = request.params.lettre;
    let num = request.params.num;

    response.title = 'Répertoire des stars';
    async.parallel ([
        function(callback) {
            model.getLettreVip(function(err, result) { callback(null, result) });
        },
        function(callback) {
            model.getInfoVips(lettre, (function(errE, resE) { callback(null, resE)}));
        },
        function(callback) {
            model.getInfoOneVip(num, (function(errS, resS) { callback(null, resS)}));
        },
        function(callback) {
            model.getPhotoOneVip(num, (function(errR, resR) { callback(null, resR)}));
        },
        function(callback) {
            model.getMariageOneVip(num, (function(errT, resT) { callback(null, resT)}));
        },
        function(callback) {
            model.getLiaisonOneVip(num, (function(errU, resU) { callback(null, resU)}));
        },
        function(callback) {
            model.getChanteurOneVip(num, (function(errV, resV) { callback(null, resV)}));
        },
        function(callback) {
            model.getActeurOneVip(num, (function(errW, resW) { callback(null, resW)}));
        },
        function(callback) {
            model.getRealisateurOneVip(num, (function(errX, resX) { callback(null, resX)}));
        },
        function(callback) {
            model.getCouturierOneVip(num, (function(errY, resY) { callback(null, resY)}));
        },
        function(callback) {
            model.getMannequinOneVip(num, (function(errZ, resZ) { callback(null, resZ)}));
        }
    ],
    function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.lettre = result[0];
        response.lettreNom = result[1];
        response.num = result[2];
        response.photo = result[3];
        response.mariage = result[4];
        response.liaison = result[5];
        response.chanteur = result[6];
        response.acteur = result[7];
        response.realisateur = result[8];
        response.couturier = result[9];
        response.mannequin = result[10];

        response.render('repertoireVips', response); 
    }); 
};


