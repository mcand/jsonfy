// Jsonfy, by André Furquim 
//
// This plugin exports  your project as JSON

function generateJson(context){
  var context = context.actionContext

  var documentPath = getDocumentPath(context)
  var jsonFileName = getJsonFileName(context)
  var sketchFileName = getSketchFileName(context)
  var destinationPath = getDestination(context)

  generateJsonFile(documentPath, destinationPath, jsonFileName)
}

// TODO: Put all the methods below in a utilitary file

function generateJsonFile(documentPath, destinationPath, jsonFileName){
  var command = "/usr/local/bin/sketchtool dump " + documentPath  + " > " + destinationPath + "" + jsonFileName
  log("Executing command: " + command)
  var args = ["-l", "-c", command]  
  runCommand("/bin/bash", args)

}

function getDestination(context){
  var documentPath = getDocumentPath(context)
  var sketchFileName = getSketchFileName(context)
  var regex = new RegExp(sketchFileName)
  return documentPath.replace(regex, '')
}

function getSketchFileName(context){
  return getFileNameInFormat(context, "sketch")
}

function getJsonFileName(context){
  return getFileNameInFormat(context, "json")
}

function getFileNameInFormat(context, format) {
  return context.document.displayName() + "." + format
}

function getDocumentPath(context){
  var path = context.document.fileURL()
  var documentPath = path + ""
  return documentPath.replace(/file:[\/]{2}/i, '')
}

function runCommand(command, args){
  var task = NSTask.alloc().init();
  task.launchPath = command;
  task.arguments = args;
  task.launch();
  task.waitUntilExit();
  return (task.terminationStatus() == 0)
}
