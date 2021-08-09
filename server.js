const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const userRoute = require('./src/routes/Users');

app.use('/users' , userRoute);

/* 
    ! Not needed atm
    ! Use only for Deployment
    ! Serving static files for express
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/', (req,res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'))
    });
*/
app.listen(process.env.PORT || 3001,()=>{
    console.log(`Web Server is Listening at http:/localhost:3001`);
});