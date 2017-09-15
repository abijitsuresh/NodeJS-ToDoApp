var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://test:test@ds135364.mlab.com:35364/abijittododb');

// create schema
var todoSchema = mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'Buy food'}).save(function(err){
//     if(err) throw err;
//     console.log('Item saved!');
// });

//var data = [{item: 'Get milk'}, {item: 'walk dog'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    app.get('/todo', function(req, res){
        // get data from mongodb
        Todo.find({}, function(err, data){
            if(err) throw err;           
            res.render('todo', {todoData: data}); 
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // add data to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;    
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        // delete from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;    
            res.json(data);
        });
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, '-') != req.params.item;
        // });
        // res.json(data);
    });
};