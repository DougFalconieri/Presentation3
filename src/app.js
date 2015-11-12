var tasks = [
    {
        name: "Design Data Model",
        description: "Define database schema for application",
        assignedTo: "Anne",
        status: "Complete",
        points: 3
    },
    {
        name: "Load Sample Data",
        description: "Add sample data to database for development and testing purposes",
        assignedTo: "Bob",
        status: "In Work",
        points: 1
    },
    {
        name: "Build Web Services",
        description: "Build backend web services that the application will require",
        assignedTo: "Christine",
        status: "Not started",
        points: 3
    },
    {
        name: "Build Front-end Application",
        description: "Develop single-page application front-end using Ember.js",
        assignedTo: "Doug",
        status: "Not started",
        points: 3
    }
];

var App = Ember.Application.create();

App.IndexRoute = Ember.Route.extend({
  model: function() {
    alert(tasks.length);
    return tasks[0];
  }
});