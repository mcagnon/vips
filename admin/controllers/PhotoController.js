let model = require("../models/vip.js");
var async = require("async");

// G E S T I O N    D E S     P H O T O S

module.exports.Repertoire = function(request, response){
    let num = request.params.num;

    response.title = 'Photos de star';
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
        response.oneVip = result[1];

        response.render('photo', response); 
    }); 
};


