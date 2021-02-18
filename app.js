var express =           require("express");
const passport = require("passport");
const campgrounds =     require("./models/campgrounds");
    app =               express();
    bodyParser =        require ("body-parser");
    mongoose   =        require("mongoose");
    LocalStrategy =     require("passport-local"),
    methodOverride =   require("method-override"),
    User          =     require("./models/user"),
    flash       =       require("connect-flash"),
    Campground =        require("./models/campgrounds"),
    seedDB     =        require("./seeds"),
    Comment    =        require("./models/comment")

    //requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/index")

console.log(process.env.DATABASEURL);


mongoose.connect(process.env.DATABASEURL);
mongoose.connect("mongodb+srv://mr_benson:Thecollectors11@cluster0.fz6cf.mongodb.net/Yelp_Camp?retryWrites=true&w=majority");
process.env.databaseURL

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the database


app.locals.moment = require("moment");
//passport config
app.use(require("express-session")({
    secret: "Let's get this",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success")
    next();
});

app.use(authRoutes);
app.use(commentRoutes);
app.use("/campgrounds", campgroundRoutes);

const uri = process.env.MONGODB_URI;

app.listen(process.env.PORT || 3000, function(){
    console.log("Yelpcamp Server has started!");
});