/*
* @Author: 张驰阳
* @Date:   2016-12-13 16:31:20
* @Last Modified by:   张驰阳
* @Last Modified time: 2016-12-13 17:26:28
*/

'use strict';

var express=require("express");
var router=express.Router();

router.use(function timeLog(req,res,next) {
	console.log("Time:",Date.now());
	next();
});

router.get("/",function(req,res){
	res.send("Birds home page");
});

router.get("/about",function(req,res){
	res.send("About birds");
});

router.get("/user/:id",function(req,res,next){
	if(req.params.id==0){
		next("route");
	}else next();
},function(req,res,next){
	console.log("error");
	res.send("error");
})
router.get("/user/:id",function(req,res){
	console.log("good");
	res.send("good");
})
module.exports=router;