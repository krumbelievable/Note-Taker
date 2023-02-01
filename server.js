const fs = require('fs');
const express = require('express');
const path = require('path');   // we call path, express and fs here.

const app = express(); // this runs express.

const PORT = process.env.PORT || 3001; // this is our port for our server.

app.use(express.static('public'));
app.use(express.urlencoded({extended : true})); 
app.use(express.json());

app.post('/api/notes', (req, res) => {  // here is where we are using post to write our notes on the left side and save them to the db.json database. 
    let noteEl = req.body
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err
        let database = JSON.parse(data)
        database.push(noteEl)
        console.log(database)
        fs.writeFile('./db/db.json', JSON.stringify(database), err => {
            if(err) throw err;
            console.log('database updated')
        })
    }) 
   res.redirect('/notes')
})


app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '/public/index.html'))  // here is where we make our get requests for the index.html, notes.html and our db.json.
}); 

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});


app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT} `)  // here is where we listen for the port we have created and helps us access it from a local host.
); 