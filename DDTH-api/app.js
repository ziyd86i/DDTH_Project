var compression = require('compression');
var express = require('express');
var session = require('express-session');
var app = express();
var mysql = require('mysql');
var server = require('http').createServer(app);
// var io = require('socket.io')(server);
var cors = require('cors');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var morgan = require('morgan');
var apiRoutes = express.Router();
var config = require('./config');
var moment = require('moment-timezone');

var data_employees = [];
var data_ticket = [];

//รองรับ cors
app.use(cors());
// ใช้ session
// app.use(session({secret: 'ddth_workplan'}));
app.set('ddth_workplan', config.secret);
//support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// ใช้ compression เพื่อเพิ่มประสิทธิภาพในการส่ง req, res
app.use(compression());
// use morgan to log requests to the console
app.use(morgan('dev'));
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


//************************************** Login Authentication *************************************
app.use('/api', apiRoutes);

apiRoutes.post('/authenticate', (req,res) => {

    var username = req.body.username;
    var password = req.body.password;

    // console.log(username,password);
    queryAuthen = "SELECT * from employees WHERE username = '"+username+"'";
    // console.log(queryAuthen);

    con.query(queryAuthen,(err,users) => {
      if (err) {
        res.status(400).send('Error in database.');
      }
      if (!users[0]) {
        // console.log(users);
        // console.log(users[0].username);
        console.log("Cant Find USERNAME!!");
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      }
      else if (users[0]) {
        console.log("Find users " + users[0].name);
        console.log(password);
        if (users[0].password != password) {
          console.log("Password not match");
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
        else {
          console.log("success!!");
          var token = jwt.sign(users[0], 'ddth_workplan', {
            expiresIn: '24h'
          });

          res.json({
              success: true,
              em_id: users[0].em_id,
              name: users[0].name,
              lname: users[0].lname,
              type: users[0].type,
              token: token
          });
        }
      }


    });

});


apiRoutes.get('/', (req,res) => {
  res.json({ message: 'Welcome to the coolest API !', success: true});
  // console.log(data_employees);
});



//************************************** Test & data employees *************************************

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

//************************************** Admin Managed User *************************************

// get data user ตาม id
app.get('/data/:id', (req,res) => {
  id = req.params.id;
  // res.send('Get Request !!' + id);
  // console.log(req.params.id);
  let queryId = " SELECT * FROM employees where em_id = '"+id+"'";
  console.log(queryId);
  con.query(queryId,(err,users) => {
    if(err) {
      res.status(400).send('Error to get user!');
    }
    else {
      res.send(users);
      console.log("SEND DATA ALREADY");
      console.log(users);
    }
  });

});

// edit user
app.post('/edit/:id', (req,res) => {
  id = req.params.id;
  let name = req.body.name;
  let lname = req.body.lname;
  let hiredate = req.body.hiredate;
  let tel = req.body.tel;
  let email = req.body.email;
  let skill_id = req.body.skill_id;
  let skill_id1 = req.body.skill_id1;
  let skill_id2 = req.body.skill_id2;
  let username = req.body.username;
  let password = req.body.password;
  let type = req.body.type;
  let car_id = req.body.car_id;
  let team_id = req.body.team_id;
  let job_fam_id = req.body.job_fam_id;
  let job_pro_id = req.body.job_pro_id;
  let business_id = req.body.business_id;

    // console.log(id,name);
    // console.log(req.body.em_id);
    console.log(name, lname,tel,email,hiredate, skill_id ,skill_id1,skill_id2,username,password,type,team_id,job_fam_id,business_id,job_pro_id ,car_id);
  //
  let queryEdit = "UPDATE employees SET `name`='"+name+"', `lname`='"+lname+"', `hiredate`='"+hiredate+"', `tel`='"+tel+"', `email`='"+email+"', `skill_id`='"+skill_id+"' ,`skill_id1`='"+skill_id1+"',`skill_id2`='"+skill_id2+"', `username`='"+username+"', `password`='"+password+"', `type`='"+type+"', `car_id`='"+car_id+"', `team_id`='"+team_id+"', `job_fam_id`='"+job_fam_id+"', `job_pro_id`='"+job_pro_id+"', `business_id`='"+business_id+"'"
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

// ลบ user employee
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

// add user
app.post('/adduser', (req,res) => {
  let em_id = req.body.em_id;
  let name = req.body.name;
  let lname = req.body.lname;
  let hiredate = req.body.hiredate;
  let tel = req.body.tel;
  let email = req.body.email;
  let skill_id = req.body.skill_id;
  let skill_id1 = req.body.skill_id1;
  let skill_id2 = req.body.skill_id2;
  let username = req.body.username;
  let password = req.body.password;
  let type = req.body.type;
  let car_id = req.body.car_id;
  let team_id = req.body.team_id;
  let job_fam_id = req.body.job_fam_id;
  let job_pro_id = req.body.job_pro_id;
  let business_id = req.body.business_id;
    // console.log(req.body.em_id);

  queryInsert = "INSERT INTO `employees` (`em_id`, `name`, `lname`, `hiredate`, `tel`, `email`, `skill_id`,  `skill_id1`, `skill_id2`,`username`, `password`, `type`, `car_id`, `team_id`, `job_fam_id`, `job_pro_id`, `business_id`)"
                +" VALUES ('"+em_id+"', '"+name+"', '"+lname+"','"+hiredate+"','"+tel+"','"+email+"','"+skill_id+"','"+skill_id1+"','"+skill_id2+"','"+username+"','"+password+"','"+type+"', '"+car_id+"','"+team_id+"','"+job_fam_id+"','"+job_pro_id+"','"+business_id+"')";
        console.log(queryInsert);
  // console.log(em_id, name, lname,tel,hiredate ,email, skill_id ,username,password,type,team_id,job_fam_id,job_pro_id,business_id ,car_id);
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

// ********************************* CM Managed Ticket ************************************

app.get('/ticket', (req,res) => {

  queryTicket = "SELECT * FROM ticket";
  con.query(queryTicket,(err,ticket) => {
    if (err) {
      res.status(400).send('Error in database.');
    }
    else {
    res.send(ticket);
     data_ticket = ticket;
     console.log(data_ticket);
    }
  });
});

app.get('/ticket/:id', (req,res) => {
  id = req.params.id;
  console.log("Get ticket request = " + id);

  let queryIdTicket = "SELECT * FROM ticket WHERE ticket_id = '"+id+"'";
  console.log(queryIdTicket);
  con.query(queryIdTicket,(err,ticket) => {
    if(err) {
      res.status(400).send('Error to get ticket data!');
    }
    else {
      res.send(ticket);
      console.log("SEND DATA ALREADY");
      console.log(ticket);
    }
  });

});

app.post('/ticket/add', (req,res) => {

  let ticket_id = req.body.ticket_id;
  let owner = req.body.owner;
  let customer_name = req.body.customer_name;
  let tel = req.body.tel;
  let description = req.body.description;
  let state = req.body.state;
  let date = req.body.date;
  let time = req.body.time;



  console.log(ticket_id,owner, customer_name, tel, description, state, date, time);
  queryTicket2 = "INSERT INTO ticket (`ticket_id`, `customer_name`, `owner`, `tel`,`description`, `date`, `time`, `state`)"
                 + "VALUES ('"+ticket_id+"', '"+customer_name+"', '"+owner+"', '"+tel+"', '"+description+"', '"+date+"', '"+time+"', '"+state+"')";
  con.query(queryTicket2, (err,ticket) => {
    if (err) {
      res.status(400).send('Error insert Ticket ' + queryTicket2);
    }
    else {

      res.send(ticket);
      console.log("Insert into ticket success !! " + ticket);
    }
  });
});

app.post('/ticket/edit/:id', (req,res) => {
  let id = req.params.id;
  let owner = req.body.owner;
  let customer_name = req.body.customer_name;
  let tel = req.body.tel;
  let description = req.body.description;
  let date = req.body.date;
  let time = req.body.time;
  // let state = req.body.state;

    // console.log(id,name);
    // console.log(req.body.em_id);
    console.log(id, owner, customer_name, tel, description);
  //
  let queryEdit = "UPDATE ticket SET `owner`='"+owner+"', `customer_name`='"+customer_name+"', `tel`='"+tel+"', `tel`='"+tel+"', `description`='"+description+"'"
                  +",`date`='"+date+"',`time`='"+time+"' WHERE ticket.ticket_id = "+id+"";

    con.query(queryEdit, (err,ticket) => {
      if (err) {
        console.log("Error to Edit Ticket !! " + queryEdit);
      }
      else {
        console.log("Edit Ticket complete !!" + ticket);
      }
    });

});

app.get('/ticket/delete/:id',(req,res) => {
  let id = req.params.id;
  console.log(id);
  queryDelTicket = "DELETE FROM ticket WHERE ticket_id = '"+id+"'";

  con.query(queryDelTicket, (err,result) =>{
    if (err) {
      throw err;
    }
    else {
      console.log("Delete Record " + id + " Completed. " +result.affectedRows);
    }
  });
});





//  *************************** กำหนด port ที่ api จะแสดงผล ***************************
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
