var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')

// đoạn code kết nối csdl với nodenode{}
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hotel',
  password: '123',
  port: 5432,
})



router.get('/', function(req, res, next) {});
//tạo đường dẫn để node lấy dữ liệuliệu
router.get('/getData', function(req, res, next) {
  
    pool.query('SELECT * FROM public.typeroom', (err, response)=>{
      if(err)
      {
        console.log(err);
      }
      else{

        res.send(response.rows)
       
      }    
      pool.end;
    }) 
    
    
});

router.get('/addtype', function(req, res, next) {
  res.render('addtype',{});
});
router.post('/addtype', function (req, res, next) {
  var type = req.body.type,
    price = req.body.price;

    console.log('start');

  pool.query("insert into typeroom(type,price) values($1,$2)", [type, price],
    (err, response) => {
      console.log(response);
      if (err) {
        res.sendStatus(500);
      }
      else {
        res.sendStatus(200);
      }
      pool.end;
    }
  )

});

router.get('/deftype', function(req, res, next) {
  console.log('delete view');
  res.render('deftype',{});
});

router.delete('/deftype/:Idtype', function(req, res) {
  const Idtype = Number(req.params.Idtype);
  console.log('test AAAAAAAA', Idtype);

  const deleteQuery = 'DELETE FROM typeroom WHERE ("Idtype" = $1)';
  pool.query(deleteQuery,[Idtype],
  (err, result) => {
    if (err) {
      console.log('err', err);
    } else {
      res.sendStatus(200);
    }
    pool.end;
  });
  
});

router.put('/update/:Idtype', function (req, res, next) {
  const {type,price}=req.body
    const Idtype = parseInt(req.params.Idtype)
    console.log('start');

  pool.query(
    'update typeroom SET type=$1, price=$2 where("Idtype" = $3)',
     [type, price,Idtype],
    (err, response) => {
      console.log(response);
      if (err) {
        res.sendStatus(500);
      }
      else {
        res.sendStatus(200);
      }
      pool.end;
    }
  )

});

router.get('/getData01', function(req, res, next) {
  
  pool.query('SELECT * FROM public.room', (err, response)=>{
    if(err)
    {
      console.log(err);
    }
    else{

      res.send(response.rows)
     
    }    
    pool.end;
  }) 
 
});

router.get('/addroom', function(req, res, next) {
  res.render('addroom',{});
});
router.post('/addroom', function (req, res, next) {
  var  roomnum = req.body.roomnum;
    type = req.body.type,
    price = req.body.price; 
    note = req.body.note;
    console.log('start');

  pool.query('insert into room(roomnum,type,price,note) values($1,$2,$3,$4)', [roomnum,type, price,note],
    (err, response) => {
      console.log(response);
      if (err) {
        res.sendStatus(500);
      }
      else {
        res.sendStatus(200);
      }
      pool.end;
    }
  )

});


router.get('/defroom', function(req, res, next) {
  console.log('delete view');
  res.render('defroom',{});
});

router.delete('/defroom/:Idroom', function(req, res) {
  const Idroom = Number(req.params.Idroom);
  console.log('test AAAAAAAA', Idroom);

  const deleteQuery = 'DELETE FROM room WHERE ("Idroom" = $1)';
  pool.query(deleteQuery,[Idroom],
  (err, result) => {
    if (err) {
      console.log('err', err);
    } else {
      res.sendStatus(200);
    }
    pool.end;
  });
  
});

router.put('/updateroom/:Idroom', function (req, res, next) {
  const {roomnum,type,price,note}=req.body
    const Idroom = parseInt(req.params.Idroom)
    console.log('start');

  pool.query(
    'update typeroom SET roomnum=$1,type=$2, price=$3, note=$4 where("Idroom" = $5)',
     [roomnum,type, price,note,Idroom],
    (err, response) => {
      console.log(response);
      if (err) {
        res.sendStatus(500);
      }
      else {
        res.sendStatus(200);
      }
      pool.end;
    }
  )

});
module.exports = router;
