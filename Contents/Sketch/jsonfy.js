// Jsonfy, by André Furquim 
//
// This plugin exports  your project as JSON

function generateJSON(context) {
  context = context.actionContext;
  var documentPath = context.document.fileURL() + ""
  documentPath = documentPath.replace(/file:[\/]{2}/i, '')
  var jsonFile = context.document.displayName() + ".json"
  var sketchFileName = context.document.displayName()+".sketch"
  var regex = new RegExp(sketchFileName)
  var destinationPath = documentPath.replace(regex, '')
  var command = "/usr/local/bin/sketchtool dump " + documentPath  + " > " + destinationPath + "" + jsonFile

  var args = ["-l", "-c", command]

  runCommand("/bin/bash", args)
};

function runCommand(command, args) {
  var task = NSTask.alloc().init();
  task.launchPath = command;
  task.arguments = args;
  task.launch();
  task.waitUntilExit();
  return (task.terminationStatus() == 0)
}
