// Jsonfy, by André Furquim
//
// This plugin exports your project as JSON

@import "utils.js"
@import "nestor-parser.js"

function generateJson(context){
  var context = context.actionContext

  var documentPath = getDocumentPath(context)
  var jsonFileName = getJsonFileName(context)
  var destinationPath = getDestination(context)

  var jsonFilePath = generateJsonFile(documentPath, destinationPath, jsonFileName)
  var sketchJson = readSketchGenaratedJson(jsonFilePath)
  // delete file generated by sketchtool.
  deleteFileFromSystem(jsonFilePath)

  // the ideia is to generate the JSON using sketch dump and format
  // the generated json in a better way so we can build a
  // page using HTML and CSS
  log('Info: JSON generated by Sketch')
  log(sketchJson)

  // create an instace od the parser, passing the json generated by Sketch
  var nestorParser = NestorParser(sketchJson)
  // here we start parsing things..
  nestorParser.generateNestorJSON()
}
