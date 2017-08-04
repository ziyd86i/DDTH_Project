var express = require('express');
var app = express();
var mysql = require('mysql');
var server = require('http').createServer(app);
// var io = require('socket.io')(server);
var cors = require('cors');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var apiRoutes = express.Router();
var config = require('./config');
let data_employees = [];
app.use(cors());

//connect mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "03721165",
  database: "ddth_workplan"
});

con.connect();

var queryString = "SELECT * FROM employees";
var authen = "SELECT username, password from employees";
var query2 = "SELECT * FROM `workplan` INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id INNER JOIN employees ON workplan.em_id = employees.em_id";

//ดึงข้อมูลจาก db มาใส่ใน data_employees
// con.query(queryString,(err, users) => {
//   if (err) {
//     throw err;
//   }
//   else {
//     data_employees = users;
//     console.log(data_employees);
//   }
// });

app.set('SecretOfDdth', config.secret); //secret variable

//use body parser we can get info from POST and/or URL params

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api', apiRoutes);
apiRoutes.get('/', (req,res) => {
  res.json({ message: 'Welcome to the coolest API !'});
  // console.log(data_employees);
});


apiRoutes.post('/authenticate', (req,res) => {

  //find user
  data_employees.findOne({
    user: req.body.username
  }, (err,user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      res.json({success: false, message: 'Failed to authenticate token.'});
    }

    else if (user) {
      //check password dont matches
      if(user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.'})
      }
      else {
        //if user found and password is right then create token
        var token = jwt.sign(user, app.get('SecretOfDdth'), {
          expiresInMinutes: 1440 //expire in 24 hr
        });

        res.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        });
      }
    }
  });
});




app.get('/', (req, res) => {
  res.send('<h1> Hello Node.js</h1>');
});

app.get('/data', (req,res) => {
  con.query(queryString,(err,users) => {
    if (err) {
      res.status(400).send('Error in database.');
    }
    else {
    res.send(users);
     data_employees = users;
     console.log(data_employees);
    }
  });
});

app.get('/data/:id', (req,res) => {
  id = req.params.id;
  // res.send('Get Request !!' + id);
  // console.log(req.params.id);
  let queryId = "SELECT * FROM employees where em_id = '"+id+"'";
  // console.log(queryId);
  con.query(queryId,(err,users) => {
    if(err) {
      res.status(400).send('Error to get user!');
    }
    else {
      res.send(users);
      console.log("SEND DATA ALREADY");
    }
  });

});

app.post('/edit/:id', (req,res) => {
  id = req.params.id;
  let name = req.body.name;
  let lname = req.body.lname;
  // this.user_data.birthday = req.body.birthday;
  let tel = req.body.tel;
  let email = req.body.email;
  let skill = req.body.skill;
  let cid = req.body.cid;
  let username = req.body.username;
  let password = req.body.password;
  let type = req.body.type;
  let dep_id = req.body.dep_id;
  let position_id = req.body.position_id;
  let car_id = req.body.car_id;
    // console.log(id,name);
    // console.log(req.body.em_id);
    console.log(name, lname,tel,email, cid,username,password,type,dep_id,position_id, car_id);
  //
  let queryEdit = "UPDATE employees SET `name`='"+name+"', `lname`='"+lname+"', `tel`='"+tel+"', `email`='"+email+"', `skill`='"+skill+"', `cid`='"+name+"', `username`='"+username+"', `password`='"+password+"', `type`='"+type+"', `dep_id`='"+dep_id+"', `position_id`='"+position_id+"', `car_id`='"+car_id+"'"
                  +" WHERE employees.em_id = "+id+"";

    con.query(queryEdit, (err,users) => {
      if (err) {
        console.log("Error to Edit User !! " + queryEdit);
      }
      else {
        console.log("Edit User complete !!" + users);
      }
    });

});

// app.post('/authenticate', (req,res) => {
//   let authen = {username: 'test', password:'test'};
//
//   con.query(queryString,(err,users,fields) => {
//     if (err) {
//       res.status(400).send('Error to authen.');
//     }
//     else {
//       res.send();
//     }
//   });
// });

app.get('/delete/:id',(req,res) => {
  id = req.params.id;
  console.log(id);
  queryDel = "DELETE FROM employees WHERE em_id = '"+id+"'";

  con.query(queryDel, (err,result) =>{
    if (err) {
      throw err;
    }
    else {
      console.log("Delete Record " + id + " Completed. " +result.affectedRows);
    }
  });
});

app.post('/adduser', (req,res) => {
  let em_id = req.body.em_id;
  let name = req.body.name;
  let lname = req.body.lname;
  // this.user_data.birthday = req.body.birthday;
  let tel = req.body.tel;
  let email = req.body.email;
  let skill = req.body.skill;
  let cid = req.body.cid;
  let username = req.body.username;
  let password = req.body.password;
  let type = req.body.type;
  let dep_id = req.body.dep_id;
  let position_id = req.body.position_id;
  let car_id = req.body.car_id;
    // console.log(req.body.em_id);

  queryInsert = "INSERT INTO `employees` (`em_id`, `name`, `lname`, `birthday`, `tel`, `email`, `skill`, `cid`, `username`, `password`, `type`, `dep_id`, `position_id`, `car_id`)"
                +" VALUES ('"+em_id+"', '"+name+"', '"+lname+"','','"+tel+"','"+email+"','"+skill+"','"+cid+"','"+username+"','"+password+"', '"+type+"','"+dep_id+"','"+position_id+"','"+car_id+"')";
  console.log(em_id, name, lname,tel,email, cid,username,password,type,dep_id,position_id, car_id);
  con.query(queryInsert, (err,users) => {
    if (err) {
      // res.status(400).send('Error to insert.');
      console.log("Error Insert Users" + queryInsert);
    }
    else {
      console.log("Add user complete !" + users);
    }
  });

});

//กำหนด port ที่ api จะแสดงผล
server.listen(3300, () => {
  console.log('Express server is lisening on port 3300');
});

exports.findAll = () => {
  return users;
};

exports.findById = (id) => {
  for (var i = 0; i < users.length; i++) {
    if(users[i].id == id) return users[i];
  }
};
