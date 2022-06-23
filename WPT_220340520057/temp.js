const express = require('express');
const app = express();



const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'test',
	port:3306
});


app.use(express.static('abc'));




app.get('/getAllbooks',  (req, res)=> {
	connection.query("select * from books ", [], 
	(err, rows) => {
		if (err) {
			console.log("faliure " + err);
		} else {
			if(rows.length>0){
				console.log("success" );
			}
			
			
		}
		res.send(rows);
		
	});
	
});

app.get('/Addbook',  (req, res)=> {
	let input={bookid:req.query.x,bookname:req.query.y,price:req.query.z};
	let output={status:false};
	connection.query("insert into books values(?,?,?) ", [input.bookid,input.bookname,input.price], 
(err, res1) => {
    if (err) {
        console.log("faliure " + err);
    } else {
        if(res1.affectedRows==0){
            console.log("not poassible" );
        }
        else{
            console.log("succes" );
			output.status=true;
        }

    }
    res.send(output);
});

	
});




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});