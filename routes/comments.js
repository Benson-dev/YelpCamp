var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Commments New
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

//Comments Create
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
    console.log("req.params", req.params);
    console.log("req.body", req.body);
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added successfully");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//comments edit route
router.get("/campgrounds/:campground_id/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    console.log("params", req.params);
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.campground_id, comment: foundComment});
        }
    })
})

//comment update route
router.put("/campgrounds/:campground_id/:comment_id", middleware.checkCommentOwnership, function(req, res){
    console.log('params edit comment', req.params);
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.campground_id);
        }
    })
})

//comment delete route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back") 
        } else {
            req.flash("success", "Comment removed");
            res.redirect("back");
        }
    })
})


module.exports = router;