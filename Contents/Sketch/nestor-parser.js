// nestor-parser.js
// This file contains the class responsible for generating a JSON with all information
// needed to create an HTML and a CSS for anything designed in Sketch
@import 'utils.js'
@import 'node-element.js'

function NestorParser(sketchFile){
  var nodes = []

  NestorParser = function(sketchJson){
    this.sketchJson = sketchJson
    this.nestorJson = null
  }

  NestorParser.prototype.generateNestorJson = function(){
    var mssymbollayers = getSymbolLayers.apply(this)
    var mssymbollayersIds = []
    var root = {
	    children: mssymbollayers
    }
    var newJson = {"root": {}}
    var zeros = {}
    var notzeros = {}

    mssymbollayers.forEach(function(sl){
      mssymbollayersIds.push(sl["objectID"])
    })

    for(var j = 0; j < root.children.length; j++){
      traverse(root.children[j], 0)
    }

    nodes.forEach(function(node, i, arr){
      if(mssymbollayersIds.includes(node.parentObject) == true){
        newJson["root"][node.nodeName] = { objId: node.objectID, parentId: node.parentObject }
        zeros[node.objectID] = node
      }
      else{
        notzeros[node.objectID] = node
      }
    })

    Object.getOwnPropertyNames(notzeros).forEach(function(name){
      var node = notzeros[name]
      var parent = zeros[node.parentObject] || notzeros[node.parentObject]
      parent.children = parent.children || []
      parent.children.push(node)
    })

    this.nestorJson = zeros
  }

  NestorParser.prototype.getSketchJson = function(){
    log(this.sketchJson)
  }

  NestorParser.prototype.getNestorJson = function(){
    return this.nestorJson
  }

  /* utilitary methods */
  var traverse = function(o, parentId){
    o["parentId"] = parentId
	  var objId = o["objectID"]
    //go one step down in the object tree
    if(typeof(o["layers"]) === 'undefined'){
  	  return
    }
    if (o["<class>"] == "MSLayerGroup"){
  	  o = new NodeElement(o["name"], parentId, o["layers"], objId)
  	  nodes.push(o)
    }
    for (var j = 0; j < o["layers"].length; j++){
  	  traverse(o["layers"][j], objId)
    }   
  }

  var getSymbolLayers = function(){
    log("Olha o sketchjson")
    log(this.sketchJson["pages"][1]["layers"])
    log("fim do olha")
    return this.sketchJson["pages"][1]["layers"]
  }

  // example of how we would implment static method
  NestorParser.staticMethod = function(){
    log("This is a static method.")
  }

  return new NestorParser(sketchFile)
}
