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

module.exports.getLettreVip = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT SUBSTR(VIP_NOM,1,1) AS NOM FROM vip ORDER BY 1 ASC;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getInfoVips = function(lettre, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT vip.VIP_NUMERO AS NUM, VIP_NOM AS NOM, VIP_PRENOM AS PRENOM, PHOTO_ADRESSE AS PHOTO FROM vip, photo WHERE vip.VIP_NUMERO=photo.VIP_NUMERO AND SUBSTR(VIP_NOM,1,1) LIKE '"+lettre+"' AND PHOTO_NUMERO=1 ORDER BY 1 ASC;";
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

module.exports.getPhotoOneVip = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_ADRESSE AS PHOTO FROM photo JOIN vip ON vip.VIP_NUMERO=photo.VIP_NUMERO WHERE vip.VIP_NUMERO = "+num+" AND PHOTO_NUMERO NOT IN (SELECT PHOTO_NUMERO FROM photo WHERE PHOTO_NUMERO=1);";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getMariageOneVip = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT NUM, VIP_NOM AS NOM, VIP_PRENOM AS PRENOM, DATE_DEBUT, DATE_FIN FROM ( SELECT VIP_VIP_NUMERO AS NUM, DATE_EVENEMENT AS DATE_DEBUT, MARIAGE_FIN AS DATE_FIN FROM MARIAGE WHERE VIP_NUMERO="+num+")t1 JOIN VIP ON VIP.VIP_NUMERO=t1.NUM UNION SELECT NUM, VIP_NOM AS NOM, VIP_PRENOM AS PRENOM, DATE_DEBUT, DATE_FIN FROM ( SELECT VIP_NUMERO AS NUM, DATE_EVENEMENT AS DATE_DEBUT, MARIAGE_FIN AS DATE_FIN FROM MARIAGE WHERE VIP_VIP_NUMERO="+num+")t1 JOIN VIP ON VIP.VIP_NUMERO=t1.NUM";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getLiaisonOneVip = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT NUM,VIP_NOM AS NOM, VIP_PRENOM AS PRENOM, DATE_DEBUT, MOTIF FROM ( SELECT VIP_VIP_NUMERO AS NUM, DATE_EVENEMENT AS DATE_DEBUT, LIAISON_MOTIFFIN AS MOTIF FROM LIAISON WHERE VIP_NUMERO="+num+")t1 JOIN VIP ON VIP.VIP_NUMERO=t1.NUM UNION SELECT NUM,VIP_NOM AS NOM, VIP_PRENOM AS PRENOM, DATE_DEBUT, MOTIF FROM ( SELECT VIP_NUMERO AS NUM, DATE_EVENEMENT AS DATE_DEBUT, LIAISON_MOTIFFIN AS MOTIF FROM LIAISON WHERE VIP_VIP_NUMERO="+num+")t1 JOIN VIP ON VIP.VIP_NUMERO=t1.NUM";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getActeurOneVip = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT acteur.VIP_NUMERO, FILM_TITRE AS TITRE, ROLE_NOM AS ROLE FROM acteur LEFT JOIN joue ON joue.VIP_NUMERO=acteur.VIP_NUMERO LEFT JOIN film ON film.FILM_NUMERO=joue.FILM_NUMERO WHERE acteur.VIP_NUMERO="+num+";";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getRealisateurOneVip = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT realisateur.VIP_NUMERO, FILM_TITRE AS TITRE FROM realisateur LEFT JOIN film ON film.VIP_NUMERO=realisateur.VIP_NUMERO WHERE realisateur.VIP_NUMERO="+num+";";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getMannequinOneVip = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT mannequin.VIP_NUMERO, VIP_PRENOM AS PRENOM, VIP_NOM AS NOM, DEFILE_LIEU AS LIEU, DEFILE_DATE FROM mannequin LEFT JOIN defiledans ON defiledans.VIP_NUMERO=mannequin.VIP_NUMERO LEFT JOIN defile ON defile.DEFILE_NUMERO=defiledans.DEFILE_NUMERO LEFT JOIN vip ON vip.VIP_NUMERO=defile.VIP_NUMERO WHERE mannequin.VIP_NUMERO="+num+";";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getChanteurOneVip = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT chanteur.VIP_NUMERO, ALBUM_TITRE AS TITRE, ALBUM_DATE FROM chanteur LEFT JOIN composer ON composer.VIP_NUMERO=chanteur.VIP_NUMERO LEFT JOIN album ON album.ALBUM_NUMERO=composer.ALBUM_NUMERO WHERE chanteur.VIP_NUMERO="+num+";";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getCouturierOneVip = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT couturier.VIP_NUMERO, DEFILE_LIEU AS LIEU, DEFILE_DATE FROM couturier LEFT JOIN defile ON defile.VIP_NUMERO=couturier.VIP_NUMERO WHERE couturier.VIP_NUMERO="+num+";";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};