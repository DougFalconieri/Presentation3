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