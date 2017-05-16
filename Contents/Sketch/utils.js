function generateJsonFile(documentPath, destinationPath, jsonFileName){
  var destinationFilePath = destinationPath + '' + jsonFileName
  var command = '/usr/local/bin/sketchtool dump ' + documentPath  + ' > ' + destinationFilePath
  log('Executing command: ' + command)
  var args = ['-l', '-c', command]
  runCommand('/bin/bash', args)
  return destinationFilePath
}

function readSketchGenaratedJson(jsonFile){
  var jsonFromSketch = loadData(jsonFile)
  return jsonFromSketch
}

function getDocumentContext(context){
  return context.document
}

function deleteFileFromSystem(filePath){
  var command = 'rm ' + filePath
  var args = ['-l', '-c', command]
  runCommand('/bin/bash', args)
}

function getDestination(context){
  var documentPath = getDocumentPath(context)
  var sketchFileName = getSketchFileName(context)
  var regex = new RegExp(sketchFileName)
  return documentPath.replace(regex, '')
}

function getSketchFileName(context){
  return getFileNameInFormat(context, 'sketch')
}

function getJsonFileName(context){
  return getFileNameInFormat(context, 'json')
}

function getFileNameInFormat(context, format) {
  documentContext = getDocumentContext(context)
  return documentContext.displayName() + '.' + format
}

function getDocumentPath(context){
  var documentContext = getDocumentContext(context)
  var path = documentContext.fileURL()
  var documentPath = path + ''
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

function readFileAsText(path) {
  return [NSString stringWithContentsOfFile: path encoding: NSUTF8StringEncoding error: false];
}

function loadData(path) {
  var contents = readFileAsText(path)
  var data

  try {
    data = JSON.parse(contents);
  } catch(e) {
    context.document.showMessage("There was an error parsing data. Please make sure it's valid.")
    return
  }
  return data
}
