let express = require('express');
let router = express.Router();

/* GET home page. */
function calcTime(offset) {
  d = new Date();
  utc = d.getTime();
  //  + (d.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000*offset));
}
router.get('/', function(req, res, next) {
  if(req.session.user==undefined||req.session.pass==undefined){
    res.render('index');
    return;
  }
  res.redirect('users');
});
router.get('/reset', function(req, res, next) {
  res.render('reset');
});
router.get('/forget', function(req, res, next) {
  res.render('forget');
})
// router.get('/fixed', function(req, res, next) {
//   if(req.session.user==undefined||req.session.pass==undefined){
//     res.render('index');
//     return;
//   }
//   let startt=calcTime(5.5);
//   startt=startt.toISOString();
//   // console.log(startt);
//   startt=startt.slice(0, -8);
  
//   res.render('fixed',{start:startt,id:'/users'});
// });
// router.get('/deadline', function(req, res, next) {
//   if(req.session.user==undefined||req.session.pass==undefined){
//     res.render('index');
//     return;
//   }
//   let startt=calcTime(5.5);
//   startt=startt.toISOString();
//   startt=startt.slice(0, -8);
//   res.render('deadline',{start:startt,id:'/users'});
// });

router.get('/combo', function(req, res, next) {
  if(req.session.user==undefined||req.session.pass==undefined){
    res.render('index');
    return;
  }
  let startt=calcTime(5.5);
  startt=startt.toISOString();
  startt=startt.slice(0, -8);
  res.render('comboform',{start:startt,id1:'/users',id2:'/users'});
});

// router.get('/addcontributer', function(req, res, next) {
//   if(req.session.user==undefined||req.session.pass==undefined){
//     res.render('index');
//     return;
//   }
 
//   res.render('addcontributer');
// });
// router.get('/home', function(req, res, next) {
//     res.render('homepage');
// });
module.exports = router;
// router.get('/contribute/:id/deadline', function(req, res, next) {
//   let id=req.params.id;
//   if(req.session.user==undefined||req.session.pass==undefined){
//     res.render('index');
//     return;
//   }
//   let startt=calcTime(5.5);
//   startt=startt.toISOString();
//   startt=startt.slice(0, -8);
//   res.render('deadline',{start:startt,id:'/users/contributer/'+id+'/deadline'});
// });
// router.get('/file',(req,res)=>{
//   res.render('file');
// });
router.get('/contribute/:id/combo', function(req, res, next) {
  let id=req.params.id;
  if(req.session.user==undefined||req.session.pass==undefined){
    res.render('index');
    return;
  }
  let startt=calcTime(5.5);
  startt=startt.toISOString();
  startt=startt.slice(0, -8);
  res.render('comboform',{start:startt,id1:'/users/contributer/'+id+'/deadline',id2:'/users/contributer/'+id+'/fixed'});
});
// router.get('/contribute/:id/fixed', function(req, res, next) {
//   let id=req.params.id;

//   if(req.session.user==undefined||req.session.pass==undefined){
//     res.render('index');
//     return;
//   }
//   let startt=calcTime(5.5);
//   startt=startt.toISOString();
//   startt=startt.slice(0, -8);
  
//   res.render('fixed',{start:startt,id:'/users/contributer/'+id+'/fixed'});
// });

