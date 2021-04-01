let model = require("../models/article.js");
var async = require("async");

// A R T I C L E S    D E S     S T A R S

module.exports.Article = function(request, response){
    //let lettre = request.params.lettre;
    let num = request.params.num;
    response.title = 'Articles des stars';
    async.parallel ([
        function(callback) {
            model.getVipArticle(function(err, result) { callback(null, result) });
        },
        function(callback) {
            model.getArticlesOneVip(num, (function(errE, resE) { callback(null, resE)}));
        }
    ],
    function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.vip = result[0];
        response.articles = result[1];

        response.render('articleVips', response); 
    }); 
};
