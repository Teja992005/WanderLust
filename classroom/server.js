const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// const cookieParser = require("cookie-parser");
// // app.use(cookieParser());

// //signed cookies
// app.use(cookieParser("secretcode"));
// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed: true});
//     res.send("signed cookie sent");
// });

// app.get("/verify",(req,res)=>{
//     // to access signed cookies we use below line
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/",(req,res) =>{
    

//     console.dir(req.cookies);
//     res.send("I am root");
// });


// app.get("/getcookies",(req,res) =>{
//     // creating cookies  in name-value pair;
//     res.cookie("greet","namaste");
//     res.cookie("MadeIn","India");
//     res.cookie("color","red");
//     res.send("sent you some cookies");
// });

// app.get("/greet",(req,res)=>{
//     let{name="anonymous"} = req.cookies;
//     res.send(`Hi, ${name}`);
// });

const sessionOptions = {
    secret: "mysupersecretstring", resave: false, saveUninitialized: true
}
app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});
app.get("/register",(req,res)=>{
    let{name="anonymous"} = req.query;
    req.session.name = name;
    if(name==="ananymous"){
        req.flash("error","uesr not registered");
    }else{
        req.flash("success","user registered successfully!");
    }
   
    
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name: req.session.name});
});
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// });
// app.get("/test",(req,res)=>{
//     res.send("test successful!");
// });
app.listen(3000,()=>{
    console.log("Server is listening to 3000");
});
