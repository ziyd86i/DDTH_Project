var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "03721165",
  database: "ddth_workplan"
});

con.connect();

var queryString = "SELECT * FROM employees";

con.query(queryString,(err,users,fields) => {

  if(err) throw err;
  console.log(users);

});

//หาชื่อทั้งหมด
exports.findAll = () => {
  return users;
};

//ค้นหาตาม id
exports.findById = (id) => {
  for (var i = 0; i < users.length; i++) {
    if(users[i].em_id == id) return users[i];
  }
};
