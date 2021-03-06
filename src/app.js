var tasks = [
    {
        id: 1,
        name: "Design Data Model",
        description: "Define database schema for application",
        assignedTo: "Anne",
        status: "Complete",
        points: 3
    },
    {
        id: 2,
        name: "Load Sample Data",
        description: "Add sample data to database for development and testing purposes",
        assignedTo: "Bob",
        status: "In Work",
        points: 1
    },
    {
        id: 3,
        name: "Build Web Services",
        description: "Build backend web services that the application will require",
        assignedTo: "Christine",
        status: "Not started",
        points: 3
    },
    {
        id: 4,
        name: "Build Front-end Application",
        description: "Develop single-page application front-end using Ember.js",
        status: "Not started",
        points: 3
    }
];

function findTaskIndex(id) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id)
            return i;
    }
}

var App = Ember.Application.create();


App.Router.map(function() {
  this.resource('task', { path: '/task/:task_id' });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return tasks;
  }
});

App.TaskRoute = Ember.Route.extend({
  model: function(params) {
    return tasks[findTaskIndex(params.task_id)];
  }
});

App.TaskController = Ember.Controller.extend({
  actions: {
    deleteTask() {
      var index = findTaskIndex(this.get("model").id);
      tasks.splice(index, 1);
      this.transitionToRoute('index');
    },
    
    back() {
        this.transitionToRoute('index');
    }
  }
});
