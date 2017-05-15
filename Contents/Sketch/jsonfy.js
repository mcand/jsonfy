// Jsonfy, by André Furquim
//
// This plugin exports your project as JSON

@import "utils.js"

function generateJson(context){
  var context = context.actionContext

  var documentPath = getDocumentPath(context)
  var jsonFileName = getJsonFileName(context)
  var destinationPath = getDestination(context)

  var jsonFilePath = generateJsonFile(documentPath, destinationPath, jsonFileName)
  var sketchJson = readSketchGenaratedJson(jsonFilePath)

  log('Loga o Sketch Gerado Pelo JSON')
  log(sketchJson);

  // Manda parsear essas coisa e pegar o que e interessante
}
