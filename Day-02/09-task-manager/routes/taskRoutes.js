var express = require('express');
var router = express.Router();

var tasks = [
	{id : 1, name : 'Watch a movie', isCompleted : false},
	{id : 2, name : 'Fix that bug', isCompleted : true}
]
/* GET home page. */
router.get('/', function(req, res, next) {
  var viewData = {
  		completedCount : tasks.filter(function(task){ return task.isCompleted}).length,
  		list : tasks
  };
  res.render('tasks/index', viewData);
});

router.get('/new', function(req, res, next){
	res.render('tasks/new');
});

router.post('/new', function(req, res, next){
	var newTaskId = tasks.reduce(function(result, task){
		return  result > task.id ? result : task.id;
	}) + 1;
	var newTask = {
		id : newTaskId,
		name : req.body.newTaskName,
		isCompleted : false
	};
	tasks.push(newTask);
	res.redirect('/tasks');
});

router.post('/toggle', function(req, res, next){
	var taskId = parseInt(req.body.taskId);
	var task = tasks.filter(function(t){
		return t.id === taskId;
	})[0];
	if (task){
		task.isCompleted = !task.isCompleted;
	}
	res.redirect('/tasks');
});

module.exports = router;
