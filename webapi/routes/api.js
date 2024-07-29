 //dependencies
const express  = require('express');
const router   =  express.Router();

//models
const khachhang =   require('../models/khachhang');
const khuvuc = require('../models/khuvuc');
const yeucau = require('../models/yeucau');
const chitietyeucau = require('../models/chitietyeucau');

const chamcong =   require('../models/chamcong');
const lichlamviec = require('../models/lichlamviec');
const nguoigiupviec = require('../models/nguoigiupviec');
const nhanvien = require('../models/nhanvien');

const phuong =   require('../models/phuong');
const quan = require('../models/quan');
const tieuchi = require('../models/tieuchi');
const ngvban = require('../models/ngvban');

const blog = require('../models/blog');
const blogimg = require('../models/blog-img');

const doitac = require('../models/doitac');

//routes
khachhang.methods(['get', 'put', 'post', 'delete']);
khachhang.route('recommend', function(req, res, next) {
  res.send('I have a recommendation for you!');
});
khachhang.route('recommend.get', function(req, res, next) {
	 
   res.send('get a recommendation OK');
});

khachhang.route('recommend.post', function(req, res, next) {
	const name =  req.body.name;
   res.send('post a recommendation OK '+name);
});

khachhang.route('recommend', ['get', 'post', 'put', 'delete'], function(req, res, next) {  res.send('What the hell is going on ?');  });
khachhang.register(router,'/khachhang');

khuvuc.methods(['get','put','post','delete']);
khuvuc.register(router,'/khuvuc'); 

yeucau.methods(['get','post','put','delete']);
yeucau.register(router,'/yeucau');

chitietyeucau.methods(['get','post','put','delete']);
chitietyeucau.register(router,'/chitietyeucau');

chamcong.methods(['get','put','post','delete']);
chamcong.register(router,'/chamcong'); 

lichlamviec.methods(['get','post','put','delete']);
lichlamviec.register(router,'/lichlamviec');

nguoigiupviec.methods(['get','post','put','delete']);
nguoigiupviec.register(router,'/nguoigiupviec');

nhanvien.methods(['get','put','post','delete']);
nhanvien.register(router,'/khuvuc'); 

phuong.methods(['get','post','put','delete']);
phuong.register(router,'/phuong');

quan.methods(['get','post','put','delete']);
quan.register(router,'/quan');

tieuchi.methods(['get','post','put','delete']);
tieuchi.register(router,'/tieuchi');

ngvban.methods(['get','post','put','delete']);
ngvban.register(router,'/ngvban');

blog.methods(['get','post','put','delete']);
blog.register(router,'/blog');

blogimg.methods(['get','post','put','delete']);
blogimg.register(router,'/blogimg');

doitac.methods(['get','post','put','delete']);
doitac.register(router,'/doitac');

const tc = {
   get: async (req, res) => {
    console.log(req.body)
     try {
       await tieuchi.find()
       .then(datas=>{
        console.log(datas)
        return datas;
      })
     } catch (error) {
       console.error("Error fetching tieuchi data:", error);
       res.status(500).json({ message: "Internal server error" }); // Send a more informative error message to the client
     }
   },
   // ... other methods
 };

 const q = {
  get: async (req, res) => {
   console.log(req.body)
    try {
      await quan.find()
      .then(datas=>{
       console.log(datas)
       return datas;
     })
    } catch (error) {
      console.error("Error fetching tieuchi data:", error);
      res.status(500).json({ message: "Internal server error" }); // Send a more informative error message to the client
    }
  },
  // ... other methods
};

const ngv={
  get:async(req,res)=>{
    try{
      await nguoigiupviec.find()
      .then(datas=>{
        return datas;
      })
    } catch (error) {
      console.error("Error fetching tieuchi data:", error);
      res.status(500).json({ message: "Internal server error" }); // Send a more informative error message to the client
    }
  }
}

const kh={
  get: async(req,res)=>{
    try{
      await khachhang.find({
        'sdt':req.body.sdt
      })
      .then(datas=> datas)
    }catch (error) {
      console.error("Error fetching tieuchi data:", error);
      res.status(500).json({ message: "Internal server error" }); // Send a more informative error message to the client
    }
  }
}

const dt={
  get:async(req,res)=>{
    try{
      await doitac.find()
      .then(datas=>datas)
    } catch (error) {
      console.error("Error fetching tieuchi data:", error);
      res.status(500).json({ message: "Internal server error" }); // Send a more informative error message to the client
    }
  }
}
router.get('/',tc.get);
router.get('/',q.get);
router.get('/',ngv.get);
router.get('/',kh.get)
router.get('/',dt.get)
//return router
module.exports = router; 