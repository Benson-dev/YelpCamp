//all middleware goes in here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    console.log("params", req.params);
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                console.log('campground', foundCampground);
                    //does user own a campground?
            if(foundCampground.author._id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have the permission to do that");
                res.redirect("back"); 
            } 
            }   
         });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    console.log("params", req.params);
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                console.log('campground', foundComment);
                //does user own a comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have the permission to do that");
                res.redirect("back"); 
            }
        }    
        });
    } else {
        req.flash("error", "You have to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;