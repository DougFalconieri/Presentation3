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
* The application code will be included in the `src` folder in the presentation directory.
    * I will link to relevant files as I discuss them.
* The application itself will also be hosted on github.

##Getting Started

* Since we are building a single-page web app we will start with a single HTML page.
    * We will call it `app.html` and you can look at the final version [here](src/app.html).
* In the head section of the page, we will import the JavaScript files for jQuery, Handlebars and Ember.
    * Ember must be imported after the other two libraries.
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
    
## Routing