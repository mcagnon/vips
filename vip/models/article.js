let db = require('../configDb');

module.exports.getVipArticle = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NUMERO AS NUM, VIP_NOM AS NOM, VIP_PRENOM AS PRENOM FROM vip WHERE VIP_NUMERO IN (SELECT VIP_NUMERO FROM apoursujet) ORDER BY 1 ASC;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getArticlesOneVip = function(num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = 'SELECT vip.VIP_NUMERO AS NUM, VIP_NOM AS NOM, VIP_PRENOM AS PRENOM, ARTICLE_TITRE AS TITRE, ARTICLE_RESUME AS RESUME, ARTICLE_DATE_INSERT AS DATE FROM article JOIN apoursujet ON article.ARTICLE_NUMERO=apoursujet.ARTICLE_NUMERO JOIN vip ON vip.VIP_NUMERO=apoursujet.VIP_NUMERO WHERE apoursujet.VIP_NUMERO='+num+' ORDER BY 1 ASC;';
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};