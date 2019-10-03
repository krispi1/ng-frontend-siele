const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files from the turing-frontend-siele directory
app.use(express.static(__dirname + '/dist/turing-frontend-siele'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/turing-frontend-siele/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
