var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://pixabay.com/get/53e4d1424b56a814f1dc84609620367d1c3ed9e04e507748752a7ed0904cc4_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex,  in pretium orci vestibulum eget. aptent taciti sociosqu ad litora torquent",        
    },
    {
        name: "Borkoom Campgrounds",
        image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752a7ed0904cc4_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex,  in pretium orci vestibulum eget. aptent taciti sociosqu ad litora torquent"
    },
    {
        name: "VInewood Hills",
        image: "https://pixabay.com/get/53e2dc4b4d54a514f1dc84609620367d1c3ed9e04e507748752a73d39244c4_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex,  in pretium orci vestibulum eget. aptent taciti sociosqu ad litora torquent"
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }    
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground) {
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                     //create a comment
                    Comment.create(
                        {
                            text: "This place is great but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment._id);
                                campground.save();
                                console.log("Created new comment");
                            }                   
                        });
            }    
        });
     });
});       
     //add a few comments
}


module.exports = seedDB;