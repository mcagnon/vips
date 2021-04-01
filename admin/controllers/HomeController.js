
// A C C U E I L

module.exports.Index = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    let login = request.body.login;
    let password = request.body.password;

    response.render('home', response);
};

module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};
