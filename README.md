# _ness Plugin for Sketch

## What is this project ?
This project is meant to be a Sketch plugin responsible for generating a predefined JSON that 
should be captured by another application called [_ness Listener](https://github.com/nagueva/htmlfy), responsible for generating an HTML 
file containing the markups and the CSS of the art designed on Sketch.

## Instalation
Download the plugin and double click to install it.

## Configuration
To start generating HTML file, you need to configure _ness Listener. See instructions on how to do that [here](https://github.com/nagueva/htmlfy))

## HTML Generation
On the tab plugins, go to _ness and click Generate HTML. An HTML page should go to your Desktop with the named export.html

## Designing on Sketch
In order to generate an HTML page properly, the designer must follow some rules defined below:

### Symbol Creation
It's important that every component should be a symbol on Sketch.

#### Examples:

a. If you want to create a button, you should give your symbol a name starting with a (denotating the anchor tag in HTML5).

b. If you want to create a header, you should give your symbol a name starting with header (denoting the header tag in HTML5).

### Adding Classes to a symbol 

If you want to add a class to your tag, just name (or rename) your symbol with the class name preceded by a dot ".".

#### Example:

If you want to create a button with a class named warning you should create a symbol named a.warning

### Naming your rectangle objects
It's important to name shape objects like rectangles to _base, so that the parser knows where to extract the properties like background, border, border-radius etc.
