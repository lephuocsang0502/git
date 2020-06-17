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
router.get('/getData01/:Idroom', async function(req, res, next) {
  const Idroom = parseInt(req.params.Idroom);
  try {
    const roomById = await pool.query('SELECT * FROM public.room WHERE  "Idroom"=$1',[Idroom]);
    console.log(roomById.rows)
    res.send(roomById.rows)
  }
  catch(e) {
    console.log(e)
  }
 
});
router.get('/getDataTypeClient', function(req, res, next) {
  
  pool.query('SELECT * FROM public.typeclient', (err, response)=>{
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
    'update room SET roomnum=$1,type=$2, price=$3, note=$4 where("Idroom" = $5)',
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

router.get('/getDataOrder', function(req, res, next) {
  
  pool.query('SELECT * FROM public."Client"', (err, response)=>{
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

router.get('/addorder', function(req, res, next) {
  res.render('addorder',{});
});
router.post('/addorder', function (req, res, next) {
  var  roomnum = req.body.roomnum;
    TypeClient = req.body.TypeClient;
    CMND = req.body.CMND; 
    Name = req.body.Name; 
    Address = req.body.Address; 
    DateAgent = req.body.DateAgent;
    Price = req.body.Price;
    

  pool.query('insert into "Client"(roomnum,"TypeClient","CMND","Address","DateAgent","Name","Price") values($1,$2,$3,$4,$5,$6,$7)', [roomnum,TypeClient,CMND,Address,DateAgent,Name,Price],
    (err, response) => {
      console.log(response);
      if (err) {
        console.log("Loi "+err);
       return res.sendStatus(500);
      }
      else {
       return res.status(200).send(response);
      }
    }
  )

});

router.get('/deforder', function(req, res, next) {
  console.log('delete view');
  res.render('deforder',{});
});

router.delete('/deforder/:ID', function(req, res) {
  const ID = Number(req.params.ID);
  console.log('test AAAAAAAA', ID);

  const deleteQuery = 'DELETE FROM "Client" WHERE ("ID" = $1)';
  pool.query(deleteQuery,[ID],
  (err, result) => {
    if (err) {
      console.log('err', err);
    } else {
      res.sendStatus(200);
    }
    pool.end;
  });
  
});


router.put('/updateorder/:ID', function (req, res, next) {
  const {roomnum,TypeClient,CMND,Address,DateAgent,Name,DateSolve,Days,Total}=req.body
    const ID = parseInt(req.params.ID)
    console.log('start');

  pool.query(
    'update "Client" SET roomnum=$1,"TypeClient"=$2, "CMND"=$3, "Address"=$4 ,"DateAgent"=$5,"Name"=$6,"DateSolve"=$7,"Days"=$8,"Total"=$9 where("ID" = $10)',
     [roomnum,TypeClient,CMND,Address,DateAgent,Name,DateSolve,Days,Total,ID],
    (err, response) => {
      console.log(response);
      if (err) {
        console.log("loi",err)
        res.sendStatus(500);
      }
      else {
        res.sendStatus(200);
      }
      pool.end;
    }
  )

});

router.put('/updatestatusroom/:Idroom', async function (req, res, next) {
  
  const Idroom = parseInt(req.params.Idroom);
  try {
    const roomById = await pool.query('SELECT * FROM public.room WHERE  "Idroom"=$1',[Idroom]);
    // console.log("roomId",roomById)
    
    const updateStatus = await pool.query('update room SET status=$1 WHERE "Idroom"=$2',[!roomById.rows[0].status,Idroom])
    console.log(updateStatus);
    res.send(updateStatus)
  }
  catch(e) {
    console.log(e)
  }

});
// get roomId by params => get status's this room => use update postgre to update specific status 
// roomById.status => !roomById.status

module.exports = router;
