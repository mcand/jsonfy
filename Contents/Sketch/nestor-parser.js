// nestor-parser.js
// This file contains the class responsible for generating a JSON with all information
// needed to create an HTML and a CSS for anything designed in Sketch
@import 'utils.js'

function NestorParser(sketchFile){
  NestorParser = function(sketchFile){
    this.sketchFile = sketchFile
  }

  NestorParser.prototype.generateNestorJSON = function(){
    log("Generating Nestor JSON....")
  }

  NestorParser.staticMethod = function(){
    log("This is a static method.")
  }

  return new NestorParser(sketchFile)
}
