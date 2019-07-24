const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const secret = process.env.DB_TOKEN;
const withAuth = require('./middleware');
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
//const drinkRoutes = express.Router();

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('drink-app/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve('drink-app', 'client', 'build', 'index.html'));
//     });
// }

//var models = require('./Schema');
var Drink  = require('./Schema');
var User = require('./models/users');

//app.use('/drinks', drinkRoutes);

var uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log('Mongoose DB connected successfully');
});

// app.use('/', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//     res.setHeader('Access-Control-Allow-Credentials', true); // If needed

//     //res.send('cors problem fixed:)');
// });

//AUTHENTICATION
//Adding New
/* app.post('/api/register', function(req, res) {
    const { email, password } = req.body;
    const user = new User({ email, password });
    user.save(function(err) { 
        if(err) {
            res.status(500)
                .send("error registering new user");
        }
        else {
            res.status(200).send("Welcome")
        }
    })
}) */

app.post('/api/authenticate', function(req, res) {
    const { email, password } = req.body;
    console.log(email + ' ' + password );
    console.log(secret);
    User.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
          });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401)
              .json({
                error: 'Incorrect email or password'
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '2hr'
            });
            res.cookie('token', token, { httpOnly: true })
              .sendStatus(200);
              console.log('successful');
              console.log(token);
          }
        });
      }
    });
  });

app.get('/checkToken',withAuth, function(req, res) {
    res.sendStatus(200);
    console.log('succesful token');
})


//MAIN API CALLS
app.get('/:name', function (req, res) {
    Drink.findOne({ drink_name : req.params.name }, function(err, drink) {
        res.json(drink);
        //console.log(req.params.name);
    })
})

app.get('/filter/curated',function(req, res) {
    Drink.find({ curated: true }, function(err, drinks) {
        if(err){
            console.log(err);
        }
        else{
            res.json(drinks);
        }
    });
});

app.get('/filter/noncurated',function(req, res) {
    Drink.find({ curated : false }, function(err, drinks) {
        if(err){
            console.log(err);
        }
        else{
            res.json(drinks);
        }
    });
});

app.get('/',function(req, res) {
    Drink.find(function(err, drinks) {
        if(err){
            console.log(err);
        }
        else{
            res.json(drinks);
        }
    });
});

app.get('/byid/:id', function(req, res) {
    Drink.findById(req.params.id, function(err, drink) {
        res.json(drink);
    });
});

app.post('/add',function(req, res) {
    let drink = new Drink(req.body);
    drink.save()
        .then(drink => {
            res.status(200).json({'drink': 'drink added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new drink failed');
        });
});

app.post('/update/:id',function(req, res){
    Drink.findById(req.params.id, function(err, drink) {
        if(!drink){
            res.status(404).send('drink not found');
        }
        else {
            drink.drink_name = req.body.drink_name;
            drink.drink_base_ingredient = req.body.drink_base_ingredient;
            drink.drink_ingredients = req.body.drink_ingredients;
            drink.drink_liquors = req.body.drink_liquors;
            drink.curated = req.body.curated;

            drink.save()
                .then(drink => {
                    res.json('Todo updated');
                })
                .catch(err => {
                    res.status(404).send("update not possible");
                });
        }
    });
});

app.delete('/delete/:id',function(req,res){
    Drink.findByIdAndRemove(req.params.id, function(err, drink){ 
        if(!drink){
            res.status(404).send('drink not found');
        }
        else{
            drink.save()
                .then(drink => {
                    res.json('drink removed');
                });
        }
    });
});

//SPECIFIC QUERIES

app.get('/drinks/:search', function(req, res) {
    var ingredient = req.params.search;
    Drink.find({curated: true,drink_liquors: ingredient } , function(err, drink) {
        res.json(drink);
    }).sort({'drink_name' : 1})
});

app.get('/search/:search', function(req, res) {
    var term = req.params.search;
    Drink.find({ drink_name : { "$regex": term, "$options": "i" }}, function(err,drinks) {
        res.json(drinks);
    });
})

app.listen(PORT, function() {
    console.log("Server is running on: " + PORT);
});
