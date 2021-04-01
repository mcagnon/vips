let model = require("../models/album.js");
var async = require("async");

// L I S T E R     A L B U M S

module.exports.Album = 	function(request, response){
   let num = request.params.num;

   response.title = 'Album des stars';

   async.parallel ([
      function(callback) {
          model.getAlbumVip(function(err, result) { callback(null, result) });
      },
      function(callback) {
          model.getAlbumOneVip(num, (function(errE, resE) { callback(null, resE)}));
      }
   ],
   function(err, result) {
      if (err) {
          console.log(err);
          return;
      }
      response.album = result[0];
      response.vip = result[1];

      response.render('listerAlbum', response);
  });


   
  } ;
