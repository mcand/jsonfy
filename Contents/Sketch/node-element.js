function NodeElement(nodeName, parentObject, layers, objectID){
    NodeElement = function(nodeName, parentObject, layers, objectID){
	    this.nodeName = nodeName
		this.parentObject = parentObject
		this.layers = layers
		this.objectID = objectID
        this.classes = setClassesFromNodeName(nodeName)
        this.tag = setTagName(nodeName)
        this.attributes = []
    }

    function setTagName(nodeName){
        var tagName = nodeName.split(/[.,\[\]]+/)
        tagName = tagName[0]
        return tagName
    }

    function setClassesFromNodeName(nodeName){
        var pattern = /(\.[\w\d\-_@=‘“]+)/gi
        var classes = []
        var c = nodeName.match(pattern)
        for(i=0; i < c.length; c++){
            var h = c.shift()
            h = h.replace('.', '')
            classes.push(h)
        }
        return classes
    }
	return new NodeElement(nodeName, parentObject, layers, objectID)
}