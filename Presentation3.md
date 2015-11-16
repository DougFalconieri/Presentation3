#Presentation 2: Ember.js

##Information Sources

* [Ember.js Website](http://emberjs.com/)
* Kelonye, Mitchel. *Mastering Ember.js.* Packt Publishing, October 27, 2014.

##What is Lift?

* A JavaScript framework for creating single-page web applications.

##Why is it Interesting?

* Single-page web applications have become much more popular over the last several years.
    * Can provide faster performance than traditional web applications.
    * Feel more like native applications.
* However, moving to a single-page model requires replacing several useful services like templating and routing that are typically provided by server-side web application frameworks.
* Single-page applications also require very large amounts of JavaScript code.
    * Need a way to organize and structure it.
* Single-page web application frameworks provide services and structure for these kinds of applications.
* Angular.js and Ember.js seem to be two of the most popular frameworks.
* I have used Angular.js at work and am curious to see how Ember.js compares.

##Installation

* One nice thing about JavaScript frameworks is that installation is a breeze -- just download the JavaScript file.
* Ember.js is available on the [project website](http://emberjs.com).
* Ember.js does require two other JavaScript frameworks as dependencies.
    * [jQuery](https://jquery.com/) - an ultra-popular JavaScript framework for working with HTML pages.
    * [Handlebars](http://handlebarsjs.com/) - a JavaScript templating engine.
    * This is one difference with Angular.js which is self-contained and has no dependencies.
* If you are using `npm`, the package management tool that ships with the node.js server-side JavaScript platform, you can use it to install a tool called `ember-cgi` that can generate project templates automatically.

##Creating an Application

* In this presentation, I plan to cover various aspects of the Ember.js framework by using to build a sample app.
    * I always finding that creating a somewhat realistic application is the best way to learn a new technology.
* The application will be (the start of) an Agile-planning tool that tracks tasks.
* The application code is included in the `src` folder in the presentation directory.
* The application itself is hosted [here](http://dougfalconieri.github.io/Presentation3).

##Getting Started

* Since we are building a single-page web app we will start with a single HTML page.
    * We will call it `index.html` and you can look at the final version [here](src/index.html).
* In the head section of the page, we will import the JavaScript files for jQuery and Ember.
    * Ember requires two JavaScript files: ember.js and ember-template-compiler.js.
* We will also include our own JavaScript file for our app-specific code.
    * We'll call it app.js and you can view it [here](src/app.js).
* An Ember.js application is created using the `create` method.
    * `var myApp = Ember.application.create();`
* The `create` method can optionally take a `rootElement` argument that limits the Ember application to only part of the page.
    * This is useful for creating widgets, but not necessary for our sample application.
* `myApp` is an `ApplicationInstance` object that stores the state for the application.

## The Ember Object System

* The `create` method is part of Ember's general object framework that extends JavaScript to simulate object-oriented features like inheritance.
* An Ember class can be created by calling `Ember.object.extend()` and passing it a map of properties and methods.
    * Classes created this way can be extended themselves to create subclasses.
* Ember classes all have a `create` method that can be used to create instances of the class.
* Ember automatically creates `get` and `set` methods to encapsulate all the properties in a class.
    * Also, creates `getProperties` and `setProperties` methods that allow you to access and modify multiple properties at once.
* Methods in Ember classes can call the implementation of the method in the class's superclass by using `this._super()`.
* If a class defines a method called `init`, it is called when an instance is created and acts as a constructor.
* A computed property is a property who's value is calculated based on other properties instead of set directly.
    * An Ember method can be turned into a computed property by calling the `property` function on it and passing a list of the properties it depends on.
* One of the main reasons to encapsulate properties inside getters and setters is to support change notifications.
* An observer function can be created by calling the `observes` method on a function and passing it the names of the properties that it should observe.
    * The function will then get called every time an observed property is changed.
* A bound property can be created by calling `Ember.computed.alias` and passing the name of a property.
    * This creates a two-way binding -- each property will be updated when the other one changes.
* Ember also supports mixins: a set of functions that can be added to any class.
    * Mixins are created by calling `Em.mixin.create`.
    * Mixins can be added to an object when it is created by calling `createWithMixins` instead of `create` and passing it one or more mixins.
* Ember objects also have several functions to trigger and subscribe to events.
    * `on` subscribes to an event while `trigger` emits an event.
    * There are several other event functions as well.
    
## Creating the Landing Page

* We'll start our example application by creating the home page.
* In Ember, HTML is generated by Handlebars templates.
* Like most web applications, our application requires a header and footer to appear on every page.
* We put this global HTML in a route template called the application template.
* We define the application in a `script` tag in our `index.html` file with its `type` attribute set to `text/x-handlebars` and no `id` attribute.
* Inside the application template, we add the header and footer for our application.
* We also need to indicate where the content for the individual pages will be added to template.
    * We do this by adding `{{outlet}}` to the template.
* Now that we have our application template, we need to add a second template for our home page.
* To render an application's home page, Ember by default looks for a template with its `id` attribute set to `index`.
    * So we add a second script tag to `index.html` containing our index template.
* It won't be an issue for our small sample app, but a large real-world app could require many templates.
    * Having all of the HTML for the entire application in one giant HTML file is not very maintainable.
    * It is possible to split each template out into a separate `hbs` file, but this requires using a JavaScript build tool like gulp or grunt to compile the `hbs` files into a single JavaScript file.
    * This feels inconvenient compared to Angular which allows you to put templates into separate files without any external tooling.

## Displaying Data

* Now that we've got our home page, it's time to fill it with some content.
* The homepage will display a list of tasks, but first we need some tasks to display.
* In a real app, the tasks would likely be loaded from a web service, but since we don't have a back-end for the sample app we'll just hard code the data in `app.js`.
* In Ember terminology, the data object for a template is called the model.
* We associate our list of tasks with our `index` template with the following code in `app.js`.

`App.IndexRoute = Ember.Route.extend({
  model: function() {
    return tasks;
  }
});`

* Whatever is returned from the model function is available in the route's template as a variable called `model`.

## Side Note: Ember Data

* For applications that load data from a web service, Ember comes with a library called Ember Data.
* With this framework, you create model objects that extend `DS.Model` and define attributes on them.
* You can also define relationships between models.
* You can retrieve models using the methods `this.store.findRecord` and `this.store.findAll`.
    * Ember automatically translates these method calls to web service calls.
    * You can supply an adaptor to customize how the calls are translated to web service calls.
    * The methods return a `Promise` object with a `then` method that you can use to do something with the data once it loads.
* Ember data automatically caches data returned by queries.
* You can also modify data using `store.createRecord` and the `set` and `delete` methods on each model.

## Handlebars Templates

* Back to our example application, we need to loop through our model object and generate HTML for each item.
* Ember uses a framework called Handlebars for its templating component.
* In templates you can use the syntax `{{ variable }}` to write the value of a variable into your HTML.
* Handlebar also has "helpers" that generate HTML elements automatically.
* We'll use the `each` helper to loop through and display our tasks.
    * We start the `each` helper like this: `{{#each model as |task|}}`.
    * We end the `each` block like this: `{{/each}}`
    * Any HTML inside the block will be repeated for each item in the model object.
    * For each iteration of the loop, the `task` variable is set to the current task object.
    * We use the `task` variable to write the task name into our HTML like this: `{{task.name}}`.
    * We do the same for all of the other attributes of our task object.
    * You can also supply a second variable name in the #each declaration to access the index of the current item.
* Another useful helper is `if` which can be used to implement conditional logic.
    * In the example app, we use `if` to write "Unassigned" if the `assignedTo` property of a task is missing.
* You can also create your own custom helpers to reduce duplicate code.
    * To do this, you create a JavaScript file with the name that you want your helper to have.
    * The JavaScript file needs to export a function wrapped in a call to `Ember.Helper.helper`.
    * Custom helpers can take parameters which are passed to the helper function as an array parameter.

## Digression: Bootstrap

* Our home page is working well, but it looks pretty ugly with unstyled HTML.
* This can be easily fixed by using one of my favorite web development tools, Twitter's Bootstrap library.
* Bootstrap gives attractive styling for almost every element you would want in your web page.
* Also, apps designed with Bootstrap are responsive -- they automatically adjust themselves to screen size so the app looks good even on a tablet or smart phone.
* Since Bootstrap styling is done with simple CSS classes, you can easily add your own CSS file to tweak any aspect of the default styles that you don't like.
* For me this framework really hits the sweet spot between having lots of functionality out of the box and still having the flexibility to customize the functionality.
* With some Bootstrap styling, our site looks much better with a snazzy black and purple color scheme.
    
## Creating a Second Screen

* Now that we have our homepage, we need to make a second screen to allow users to modify a task.
* The `index` route is defined automatically, but for the second screen we need to define ourselves.
* We create a `task` route in `app.js` like this:

`App.Router.map(function() {
  this.resource('task', { path: '/task/:task_id' });
});`

* When we call our task screen, we need specify which task we want to edit.
* The `/:task_id` part of the path tells Ember that the URL will include a task ID variable.
* Like we did for the index route, we need to tell Ember what model to use for the new task route.
* We do that with the following code:

`App.TaskRoute = Ember.Route.extend({
  model: function(params) {
    return tasks[findTaskIndex(params.task_id)];
  }
});`

* The `model` function takes a parameter that we can use to access the `task_id` variable from the URL.
    * The model function uses the task id to look up the corresponding task object from the task list.
* Now that we have defined a route, we can link to it from our homepage.
    * We use the {{link-to}} helper in Handlebars to generate links for each task.
    * We only need to pass the helper the route name and model object and it automatically generates the URL for us.
    * The helper automatically looks for an attribute on the model object called `id` and adds it to the end of the URL.
    * We can also add other attributes which will be added to the generated link tag.
        * We use the feature to set the `class` attribute on the link tag to the relevant Bootstrap class.
* When you define a route, Ember uses a naming convention to look for the corresponding template.
    * For our `task` route, the template should also be named `task`.
    * We add a new script tag in `index.html` with its `id` attribute set to `task` to contain our template for the task screen.
    
## Building a Form

* In the new task template, we want to build form controls.
* To do this, we use some new Handlebars helpers.
* We use the {{input}} helper to generate a text box control so user's can modify the name of the current task.

`{{input type="text" value=model.name class="form-control" id="nameInput"}}`

* The `value` attribute associates the text box with the `name` attribute of the current task object.
* The other attributes of the {{input}} helper and just passed through and added to the generated HTML input element.
* This is all it takes to create a basic edit form. 
    * If we load the app now, we can click on a task and see our task screen.
    * The task screen contains a text box pre-populated with the name of task.
    * If we change the name in the text box and then use the back button to go back to our home page, we see that the name of the task has been updated.
* We finish our form by creating text boxes for the other attributes of our task object.
* For the `description` field we use a {{textarea}} helper instead of the {{input}} one.
    * This works almost exactly the same, but generates a `textarea` HTML control instead of an `input` control for more easy entry of large text.
* In a real app, we would probably want to use a drop-down list instead a text box for the `status` and `assignedTo` fields since they each only have a small number of permitted values.
    * Surprisingly (and disappointing), Ember doesn't seem to have an out of the box solution for generating drop-down lists.
    * Previous versions of Ember had a solution for this which is now deprecated without a clear replacements.
    * Online examples of generating a drop-down list in the newest version of Ember are surprisingly complicated for such a common use case.
    
## Adding a Controller

* Next, lets add a button to go from the task screen back to the task list screen.
* We do this by creating a `button` HTML element and then adding an `action` helper within it like this: `{{action "back"}}`.
* This `action` helper will cause a JavaScript function called `back` to be called when the button is pressed.
* But, first we need a place to put our `back` function.
* To do this, we will add a controller for our task route.
* Like with templates, Ember uses a naming convention to associate a controller to a route.
* For our `task` route, the controller should be called `TaskController`.
* We define the `TaskController` in our `app.js` file like this:

`App.TaskController = Ember.Controller.extend({
  actions: {
    back() {
        this.transitionToRoute('index');
    }
  }
});`

* The controller has an `actions` property that defines functions that can be called from the template.
* Our `back` action, uses the `transitionToRoute` function to navigate to the task list screen.
* To make a less trivial example of an action, lets add a second button to the task screen that deletes the current task.
* To do this, we add a second action to the controller called `deleteTask`.
* The `deleteTask` action uses a call to `get("model")` to access the current task object and then deletes it from the list of tasks.
* Finally, the action navigates back to the home page.
* If we run the app and press the delete button, we can see that the current task is deleted from the task list.
* Our example application is complete!

## Other Ember Features

* In our simple example app, all of our JavaScript code is in a single file and can access our data directly.
* In a more realistic app, there would likely be multiple JavaScript files that would need a way to access shared data.
* One possible solution to this is Ember's dependency injection framework which uses the App object to register and access shared data from any file in the app.
* Ember also contains a feature called components which allow you to create a reusable piece of functionality consisting of a template and associated JavaScript code.
* According to Ember documentation, components in the future will replace controllers although they currently lack the ability to be routed to.

## Final Thoughts

* Ember is certainly a powerful framework for creating single-page web apps.
* Overall though I found it less intuitive to learn than its competitor Angular.js.
* Ember takes advantage of existing JavaScript frameworks like jQuery and Handlebars.
    * But I feel like this gives it a bit of a cobbled-together feeling with a less coherent design than Angular.
* I actually prefer Angular's templating engine to Handlebars'.
    * Handlebars' limit on inserting JavaScript code into the template may be philosophically pure, but it makes typical tasks like generating drop-down lists much more complicated than it should be.
* My biggest complaint with Ember is that it feel immature and unstable.
    * The application seems to still be undergoing major design changes.
    * Several features like controllers and the select helper are marked as deprecated without an obvious replacement.
    * There are numerous ways to do everything, making it hard to know where to start.
    * When I learned Angular a few months ago, it felt much easier to pick up.
* Overall, I will personally continue to use Angular for my single-page web applications for now. 
    * The design simply feels more intuitive and stable.
* However, Ember is a powerful tool and it was very interesting to see a different approach toward solving the same problem.
