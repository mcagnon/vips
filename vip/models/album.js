let db = require('../configDb');

module.exports.getAlbumVip = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT photo.VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PHOTO FROM photo JOIN vip ON vip.VIP_NUMERO=photo.VIP_NUMERO WHERE PHOTO_NUMERO=1 ORDER BY VIP_NOM;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getAlbumOneVip = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT photo.VIP_NUMERO AS NUM, VIP_NOM AS NOM, VIP_PRENOM AS PRENOM, PHOTO_COMMENTAIRE AS COMMENTAIRE, PHOTO_ADRESSE AS PHOTO FROM photo JOIN vip ON vip.VIP_NUMERO=photo.VIP_NUMERO WHERE vip.VIP_NUMERO = "+num+" AND PHOTO_NUMERO NOT IN (SELECT PHOTO_NUMERO FROM photo WHERE PHOTO_NUMERO=1);";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};