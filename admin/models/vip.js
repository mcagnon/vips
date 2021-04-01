let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getAllVip = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NUMERO AS NUM, VIP_NOM AS NOM, VIP_PRENOM AS PRENOM FROM vip ORDER BY 2 ASC;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getInfoOneVip = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM AS NOM, VIP_PRENOM AS PRENOM, VIP_NAISSANCE AS NAISSANCE, NATIONALITE_NOM AS NATIONALITE, PHOTO_ADRESSE AS PHOTO, VIP_TEXTE AS TEXTE FROM vip JOIN nationalite ON vip.NATIONALITE_NUMERO=nationalite.NATIONALITE_NUMERO JOIN photo ON vip.VIP_NUMERO=photo.VIP_NUMERO WHERE vip.VIP_NUMERO = "+num+" AND PHOTO_NUMERO=1;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getNationalite = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT NATIONALITE_NUMERO AS NUM, NATIONALITE_NOM AS NOM FROM nationalite ORDER BY 2 ASC;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getConnexion = function(login, password, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = 'SELECT * FROM parametres WHERE LOGIN="'+login+'" AND PASSWD="'+password+'";';
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.insertVip = function(ajout, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = 'INSERT INTO vip (NOM_VIP) VALUES (:'+ajout+');';
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};