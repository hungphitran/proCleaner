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
const p= {
  get: async (req, res) => {
   console.log(req.body)
    try {
      await phuong.find()
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
const kv= {
  get: async (req, res) => {
   console.log(req.body)
    try {
      await khuvuc.find()
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
const yc= {
  get: async (req, res) => {
   console.log(req.body)
    try {
      await yeucau.find()
      .then(datas=>{
       console.log(datas)
       return datas;
     })
    } catch (error) {
      console.error("Error fetching tieuchi data:", error);
      res.status(500).json({ message: "Internal server error" }); // Send a more informative error message to the client
    }
  },
  put:async (req,res)=>{
    let updateData=req.body;
    delete updateData.id;
    khachhang.findByIdAndUpdate(req.params.id,updateData, { new: true })
    .then(yeucau => {
      if (!yeucau) {
        return res.status(404).json({ error: 'request not found' });
      }
      res.json(yeucau);
    })
    .catch(err => res.status(400).json({ error: err.message }));
  }
  // ... other methods
};
const ctyc= {
  get: async (req, res) => {
   console.log(req.body)
    try {
      await chitietyeucau.find()
      .then(datas=>{
       console.log(datas)
       return datas;
     })
    } catch (error) {
      console.error("Error fetching tieuchi data:", error);
      res.status(500).json({ message: "Internal server error" }); // Send a more informative error message to the client
    }
  },
  put:async(req,res)=>{
    let updateData=req.body;
    delete updateData.id;
    khachhang.findByIdAndUpdate(req.params.id,updateData, { new: true })
    .then(chitietyeucau => {
      if (!chitietyeucau) {
        return res.status(404).json({ error: 'request not found' });
      }
      res.json(chitietyeucau);
    })
    .catch(err => res.status(400).json({ error: err.message }));
  }
  // ... other methods
};
const cc= {
  get: async (req, res) => {
   console.log(req.body)
    try {
      await chamcong.find()
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
const llv= {
  get: async (req, res) => {
   console.log(req.body)
    try {
      await lichlamviec.find()
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
const ngvb= {
  get: async (req, res) => {
   console.log(req.body)
    try {
      await ngvban.find()
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
const nv= {
  get: async (req, res) => {
   console.log(req.body)
    try {
      await nhanvien.find()
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
  }, post: (req,res)=>{
    const new_khachhang=req.body;
    console.log('api khach hang: ',req.body)
    new_khachhang.save()
    .then(khachhang => res.status(201).json(khachhang))
    .catch(err => res.status(400).json({ error: err.message }))
  },put:(req,res)=>{
    let updateData=req.body;
    delete updateData.id;
    khachhang.findByIdAndUpdate(req.params.id,updateData, { new: true })
    .then(khachhang => {
      if (!khachhang) {
        return res.status(404).json({ error: 'Khachhang not found' });
      }
      res.json(khachhang);
    })
    .catch(err => res.status(400).json({ error: err.message }));
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
const bl= {
  get: async (req, res) => {
   console.log(req.body)
    try {
      await blog.find()
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
const bli= {
  get: async (req, res) => {
   console.log(req.body)
    try {
      await blogimg.find()
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
router.get('/',tc.get);
router.get('/',q.get);
router.get('/',ngv.get);
router.get('/',kh.get)
router.post('/',kh.post)
router.put('/:id',kh.put)
router.get('/',dt.get)
router.get('/',bl.get);
router.get('/',bli.get);
router.get('/',p.get)
router.get('/',llv.get)
router.get('/',kv.get)
router.get('/',yc.get)
router.get('/',ctyc.get)
router.get('/',cc.get);
router.get('/',ngvb.get)
router.get('/',nv.get)

//return router
module.exports = router; 