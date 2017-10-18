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


// =========================================================================================================================
// ********************************* SET INTERVAL TO AUTO DELETE RECORD EVERY 2 YEARS***************************************
// =========================================================================================================================

setInterval( ()=>{

  let intervalWork = "DELETE FROM workplan WHERE ticket_id = (SELECT ticket_id FROM ticket WHERE date < NOW() - INTERVAL 2 YEAR)";
  let intervalTicket = "DELETE FROM ticket WHERE date < NOW() - INTERVAL 2 YEAR";
  con.query(intervalWork, (err)=> {
    if (err) {
      console.log("Cannot delete workplan internal 2 years");
    }
    else {
      con.query(intervalTicket, (err) => {
        if (err) {
          console.log("Cannot delete ticket interval 2 years");
        }
        else {
          console.log("Delete record in workplan & ticket interval 2 years");
        }
      })
    }
  })
}, 86400000);


// =========================================================================================================================
// ********************************************** Login Authentication *****************************************************
// =========================================================================================================================

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
              team_id: users[0].team_id,
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


// =========================================================================================================================
// ********************************************** Admin Managed User *******************************************************
// =========================================================================================================================

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

// =========================================================================================================================
// ************************************************** CM Assign Work *******************************************************
// =========================================================================================================================

// Select employees on status available & in the team that selected
app.get('/available/:id', (req,res) => {
  id = req.params.id;
  console.log(id);
  queryAvailable = "SELECT * FROM employees INNER JOIN skill ON employees.skill_id = skill.skill_id WHERE emp_status = 'available' AND employees.team_id = '"+id+"'";

  con.query(queryAvailable, (err,data) => {
    if (err) {
      console.log("Error to get data available status");
    }
    else {
      res.send(data);
      console.log("Get available status complete");
    }
  });
});

// Select employees on status in progress & in the team that selected
app.get('/progress/:id', (req,res) => {
  id = req.params.id;
  console.log(id);

  queryProgress = "SELECT * FROM employees INNER JOIN workplan ON employees.em_id = workplan.em_id INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id WHERE workplan.status_work = 'active' AND date(ticket.date) >= cast(now() as date) AND employees.team_id = '"+id+"'";

  con.query(queryProgress, (err,data) => {
    if (err) {
      console.log("Error to get data in progress status");
    }
    else {
      res.send(data);
      console.log("Get progress status complete");
    }
  });
});

// Select employees on status in busy & in the team that selected
app.get('/busy/:id', (req,res) => {

  id = req.params.id;
  console.log(id);

  queryBusy = "SELECT * FROM employees INNER JOIN workplan ON employees.em_id = workplan.em_id INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id WHERE workplan.status_work = 'doing' AND employees.team_id = '"+id+"'";

  con.query(queryBusy, (err,data) => {
    if (err) {
      console.log("Error to get data Busy status");
    }
    else {
      res.send(data);
      console.log("Get available Busy complete");
    }
  });
});


// Assign work to engineer
app.post('/cm/assignwork', (req,res) => {
  let ticket_id = req.body.ticket_id;
  let em_id = req.body.em_id;

  console.log(ticket_id, em_id);
  queryAssign = "INSERT INTO `workplan` (`workplan_id`, `em_id`, `ticket_id`, `status_work`) VALUES (NULL, '"+em_id+"', '"+ticket_id+"', 'active');";
  queryUpdate = "UPDATE ticket SET state = 'in progress' WHERE ticket_id = '"+ticket_id+"'";
                // console.log(queryAssign);

  con.query(queryAssign, (err,workplan) => {
    if (err) {
      console.log("Cannot assign Ticket : " + ticket_id + " to engineer " + em_id );
    }
    else {
      con.query(queryUpdate, (err,ticket) => {
        if (err) {
          console.log("Cannot update ticket state ");
        }
        else {
          console.log("Assign work engineer "+ em_id + "ticket ID: " + ticket_id);
        }
      })

    }
  })
})

// Delete the workplan that cm assign to engineer
app.get('/cm/delete/:id',(req,res) => {
  let id = req.params.id;
  console.log(id);
  let queryDelWorkplan = "DELETE FROM workplan WHERE workplan_id = '"+id+"'";
  let queryUpdate = "UPDATE workplan INNER JOIN employees ON workplan.em_id = employees.em_id INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id "+
                    " SET employees.emp_status = 'available', ticket.state = 'active' WHERE workplan.workplan_id = '"+id+"'";

  con.query(queryUpdate, (err,result) =>{
    if (err) {
      throw err;
      console.log("cannot update before delete this workplan " + id);
    }
    else {
      con.query(queryDelWorkplan, (err,work)=> {
        if (err) {
          console.log("cannot delete this workplan");
        }
        else {
          console.log("Delete Record " + id + " Completed. " +result.affectedRows);
        }
      })
    }
  });
});


app.get('/cm/getdata/:id', (req,res) => {

  let id = req.params.id;
  console.log(id);

  let queryGetdata = "SELECT * FROM workplan INNER JOIN employees ON workplan.em_id = employees.em_id INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id WHERE workplan_id = '"+id+"'";

  con.query(queryGetdata, (err, data) => {
    if (err) {
      console.log("Cannot get data " + queryGetdata);
    }
    else {
      res.send(data);
      console.log("Send data success " + data);
    }
  });

});
// ===========================================================================================
// ********************************* CM Managed Ticket ************************************
// ===========================================================================================


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

app.get('/ticketstate', (req,res) => {

  queryTicket = "SELECT * FROM ticket WHERE state = 'active'";
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

  let ticket_name = req.body.ticket_name;
  let owner = req.body.owner;
  let customer_name = req.body.customer_name;
  let tel = req.body.tel;
  let description = req.body.description;
  let state = req.body.state;
  let date = req.body.date;
  let end_date = req.body.end_date;
  let so_number = req.body.so_number;
  let person_contact = req.body.person_contact;


  // console.log(ticket_name ,owner, customer_name, tel, description, state, date, end_date);
  queryTicket2 = "INSERT INTO ticket (`ticket_id`,`ticket_name`, `customer_name`, `owner`, `tel`,`description`, `date`, `end_date`, `state`, `so_number`, `person_contact` )"
                 + "VALUES (NULL,'"+ticket_name+"', '"+customer_name+"', '"+owner+"', '"+tel+"', '"+description+"', '"+date+"','"+end_date+"', '"+state+"', '"+so_number+"', '"+person_contact+"')";
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
  let ticket_name = req.body.ticket_name;
  let owner = req.body.owner;
  let so_number = req.body.so_number;
  let customer_name = req.body.customer_name;
  let person_contact = req.body.person_contact;
  let tel = req.body.tel;
  let description = req.body.description;
  let date = req.body.date;
  let end_date = req.body.end_date;
  // let state = req.body.state;

    // console.log(id,name);
    // console.log(req.body.em_id);
    console.log(id, owner, customer_name, tel, description,end_date);
  //
  let queryEdit = "UPDATE ticket SET `ticket_name`='"+ticket_name+"', `owner`='"+owner+"', `customer_name`='"+customer_name+"', `tel`='"+tel+"', `description`='"+description+"'"
                  +",`date`='"+date+"',`end_date`='"+end_date+"',`so_number`='"+so_number+"',`person_contact`='"+person_contact+"' WHERE ticket.ticket_id = "+id+"";

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
  let queryDelTicket = "DELETE FROM ticket WHERE ticket_id = '"+id+"'";
  let queryDelWorkplan = "DELETE FROM workplan WHERE workplan.ticket_id = '"+id+"'";
  let querySetstatus = "UPDATE "

  con.query(queryDelWorkplan, (err,result) =>{
    if (err) {
      throw err;
    }
    else {
      console.log("Delete Workplan complete");
      con.query(queryDelTicket, (err,ticket) => {
        if (err) {
            throw err;
        }
        else {
          console.log("delete Ticket Complete");
          console.log("Delete Record " + id + " Completed. " +result.affectedRows);
        }
      })

    }
  });
});

// =============================================================================================
// ********************************* CM Management Workplan ************************************
// =============================================================================================


  app.get('/workplan/:team', (req,res) => {
    let team_id = req.params.team;
    console.log(team_id);
    let queryAll = "SELECT * FROM workplan INNER JOIN employees ON workplan.em_id = employees.em_id INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id WHERE employees.team_id = '"+team_id+"'";

    con.query(queryAll, (err,workplan) => {
      if (err) {
        console.log("Cannot select Workplan data ");
      }
      else {
        res.send(workplan);
        console.log("Send DATA workplan success !");
      }
    })
  })

  app.post('/workplan/dateselect/:team', (req,res) => {
    let team_id = req.params.team;
    let month = req.body.month;
    let year = req.body.year;

    console.log(team_id, month, year);
    let queryDate = "SELECT employees.em_id, employees.name, employees.lname , ticket.ticket_id, ticket.so_number, ticket.customer_name, ticket.person_contact, ticket.description, team.team_name, ticket.date, ticket.end_date "
                    +"FROM workplan INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id INNER JOIN employees ON workplan.em_id = employees.em_id INNER JOIN team ON employees.team_id = team.team_id "
                    +"WHERE team.team_id = '"+team_id+"' AND month(date) = '"+month+"' AND year(date) = '"+year+"'"

    con.query(queryDate, (err,workplan) => {
      if (err) {
        console.log("Select Data from month&year fail");
      }
      else {
        res.send(workplan);
        console.log("Select Data from month&year success!");
      }
    })
  })

  app.get('/workplan/id/:id', (req,res) => {
    let id = req.params.id;

    let queryID = "SELECT * FROM workplan INNER JOIN employees ON employees.em_id = workplan.em_id INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id WHERE employees.em_id = '"+id+"'";

    con.query(queryID, (err,workplan) => {
      if (err) {
        console.log("Cannot select workplan data from id");
      }
      else {
        res.send(workplan);
        console.log("Send data workplan from ID success!");
      }
    })
  })

// =============================================================================================
// ********************************* Engineer Management ************************************
// =============================================================================================


app.get('/eng/workplan/:id', (req,res) => {
  let id = req.params.id;

  let queryWork = "SELECT * FROM `workplan` INNER JOIN employees ON workplan.em_id = employees.em_id"+
  " INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id WHERE workplan.em_id = '"+id+"' AND date(ticket.date) = cast(now() as date) AND status_work = 'active'";

  // console.log(queryWork);
  con.query(queryWork, (err,workplan) => {
    if (err) {
      console.log("Failed to select workplan user " + id);
    }
    else {
      res.send(workplan);
      console.log("Success select data !!");
      console.log(workplan);
    }
  });
});

app.get('/eng/workonweek/:id', (req,res) => {
  let id = req.params.id;

  let queryWorkOnWeek = "SELECT * FROM `workplan` INNER JOIN employees ON workplan.em_id = employees.em_id"+
  " INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id WHERE workplan.em_id = '"+id+"' AND  date(ticket.date) > cast((now()) as date) AND date(ticket.date) <= cast((now() + interval 7 day) as date)";

  con.query(queryWorkOnWeek, (err,workplan) => {
    if (err) {
      console.log("Failed to select workplan on week");
    }
    else {
      res.send(workplan);
      console.log("Success to select data on week");
      console.log(workplan);
    }
  })
});

app.get('/eng/workdoing/:id', (req,res) => {
  let id = req.params.id;

  let queryWorkdoing = "SELECT * FROM `workplan` INNER JOIN employees ON workplan.em_id = employees.em_id"+
  " INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id WHERE workplan.em_id = '"+id+"' AND status_work = 'doing'"

  con.query(queryWorkdoing, (err,workplan) => {
    if (err) {
      console.log("Failed to select Doing work");
    }
    else {
      res.send(workplan);
      console.log("Success to select data Doing work");
      console.log(workplan);
    }
  });
});

// Changing status engineer to 'busy' & state work to 'doing' when engineer who get the ticket and accept to work
app.post('/eng/accept/:id', (req,res) => {

  let work_id =  req.params.id;
  console.log(work_id);

  let queryAccept = "UPDATE workplan INNER JOIN employees ON workplan.em_id = employees.em_id  SET `status_work`= 'doing', employees.emp_status = 'busy' WHERE workplan_id = '"+work_id+"'";

  con.query(queryAccept, (err,workplan) => {
    if (err) {
      console.log("Cannot update workplan_id");
    }
    else {
      console.log("Change status to Doing complete!");
    }
  });
});

// Changing status engineer 'available' and state work to 'done' when engineer done this work
app.post('/eng/donework/:id', (req,res) => {
  let work_id = req.params.id;
  console.log(work_id);
  let queryDone = "UPDATE workplan INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id INNER JOIN employees ON workplan.em_id = employees.em_id SET `status_work` = 'done', ticket.state = 'done', employees.emp_status = 'available' WHERE workplan_id = '"+work_id+"'";

  con.query(queryDone, (err,workplan) => {
    if (err) {
      console.log("Cannot update done work");
    }
    else {
      console.log("Change status to Done Complete!");
    }
  });
});

// =============================================================================================
// ********************************* Engineer Workplan ************************************
// =============================================================================================


app.get('/eng/workplan/get/:id' , (req,res) => {
  let id = req.params.id;

  let queryGetWorkplan = "SELECT * FROM `workplan` INNER JOIN employees ON workplan.em_id = employees.em_id"+
                         " INNER JOIN ticket ON workplan.ticket_id = ticket.ticket_id WHERE workplan.em_id = '"+id+"'"

  con.query(queryGetWorkplan, (err,workplan) => {
    if (err) {
      console.log("Failed to select data workplan user : " + id);
    }
    else {
      res.send(workplan);
      console.log("Succes to select workplan user: " + id);
    }
  })
})

app.post('/eng/addwork/:id', (req,res) => {
  let em_id = req.params.id;
  let ticket_name = req.body.ticket_name;
  let owner = req.body.owner;
  let customer_name = req.body.customer_name;
  let tel = req.body.tel;
  let description = req.body.description;
  let date = req.body.date;
  let end_date = req.body.end_date;
  let so_number = req.body.so_number;
  let person_contact = req.body.person_contact;

  console.log(em_id,ticket_name,owner,customer_name,tel,description,date,end_date,so_number,person_contact);

   var sqlTicket = "INSERT INTO ticket (`ticket_id`,`ticket_name`, `customer_name`, `owner`, `tel`,`description`, `date`, `end_date`, `state`, `so_number`, `person_contact`)"
                   + " VALUES (NULL,'"+ticket_name+"', '"+customer_name+"', '"+owner+"', '"+tel+"', '"+description+"', '"+date+"','"+end_date+"', 'in progress', '"+so_number+"', '"+person_contact+"')";
   var sqlSelect = "SELECT ticket_id FROM `ticket` WHERE ticket_id = (SELECT MAX(ticket_id) from ticket) AND ticket_name = '"+ticket_name+"'";


  con.query(sqlTicket, (err,ticket) => {
    if (err) {
      console.log("Cannot insert Ticket");
    }
    else {

      console.log("Insert ticket complete!");
      con.query(sqlSelect, (err,select) => {
        if (err) {
          console.log("Cannot select Ticket");
        }
        else {
          // console.log(select[0].ticket_id);
          let tick_id = select[0].ticket_id;
          // console.log(tick_id);

          var sqlWorkplan = "INSERT INTO `workplan` (`workplan_id`, `em_id`, `ticket_id`, `status_work`) VALUES (NULL, '"+em_id+"', '"+tick_id+"', 'active')";
          console.log("Select ticket_id success");
          console.log(sqlWorkplan);
          con.query(sqlWorkplan, (err,workplan) => {
            if (err) {
              console.log("Cannot insert Workplan");
            }
            else {
              console.log("Insert Workplan Complete!");
            }
          })
        }
      })
    }
  })
});

app.post('/eng/updatework', (req,res) => {
  let ticket_id = req.body.ticket_id;
  let em_id = req.body.em_id;
  let ticket_name = req.body.ticket_name;
  let owner = req.body.owner;
  let customer_name = req.body.customer_name;
  let tel = req.body.tel;
  let description = req.body.description;
  let date = req.body.date;
  let end_date = req.body.end_date;
  let so_number = req.body.so_number;
  let person_contact = req.body.person_contact;
  // console.log(em_id,description);

  sqlupdate = "UPDATE ticket SET ticket_name = '"+ticket_name+"', so_number = '"+so_number+"', owner = '"+owner+"', customer_name = '"+customer_name+"', person_contact = '"+person_contact+"', tel = '"+tel+"'"
              +", description = '"+description+"', date = '"+date+"', end_date = '"+end_date+"' WHERE ticket_id = '"+ticket_id+"'"
  console.log(sqlupdate);

  con.query(sqlupdate, (err,update) => {
    if (err) {
      console.log("Error to update ticket id : "+ ticket_id);
    }
    else {
      console.log("Update Complete!");
    }
  })

})

app.get('/eng/removework/:id', (req,res) => {
  let id = req.params.id;

  console.log(id);

  sqlRemove = "DELETE FROM workplan WHERE workplan_id = '"+id+"'";

  con.query(sqlRemove, (err) => {
    if (err) {
      console.log("Error to remove workplan");
    }
    else {
      console.log("Remove Workplan complete");
    }
  })
})



// =============================================================================================
//  *************************** กำหนด port ที่ api จะแสดงผล ***************************
// =============================================================================================

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
