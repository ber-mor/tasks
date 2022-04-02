const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: ''
})

db.connect(err=>{
	if (err) throw err
	console.log('Database connected')
})

app.get('/get', (req,res)=>{
	const sql = 'SELECT * FROM task'
	db.query(sql, (error, result)=>{
		if (error) throw error
		res.send(result)
	})
})

app.post('/add', (req, res)=>{
	const sql = 'INSERT INTO task SET ?'
	const values = {
		text: req.body.text,
		day: req.body.day,
		reminder: req.body.reminder
	}
	db.query(sql, values, (error, result)=>{
		if (error) throw error
		res.send(result)
		console.log('Values inserted in database')
	})
})

app.delete('/delete/:id', (req, res)=>{
	id = req.params.id
	const sql = 'DELETE FROM task WHERE id = ?'
	db.query(sql, id, (error, result)=>{
		if (error) throw error
		res.send(result)
		console.log(`Value with id ${id} deleted from database` )
	})
})

app.put('/update/:id', (req,res)=>{
	const id = req.params.id
	const reminder = req.body.reminder
	const sql = 'UPDATE task SET reminder = ? WHERE id = ?'
	db.query(sql, [reminder,id], (error, result) => {
		if(error) throw error
		res.send(result)
		console.log(`Reminder updated to ${reminder} in database`)
	})
})

app.listen(3001, (err)=>{
	if (err) throw err
	console.log('Running on port 3001')
})