var currentFile = null,
    pollTimer = null,
    lastModified = 0

var converter = new Showdown.converter(),
    output = document.getElementById('output')

function renderFile() {
    getFileContents(function(markdown) {
        var html = converter.makeHtml(markdown)
        output.innerHTML = html
    })
}

function getFileContents(cb) {
    if (!currentFile)
        return
        
    var reader = new FileReader()    

    reader.onload = function(e) {
        cb(reader.result)
    }
    reader.onerror = function(e) {
        console.error('FileReader Error: code ' + reader.error.code)
    }
    
    reader.readAsText(currentFile)
}

function pollFile() {
    if (!currentFile)
        return
        
    var modified = currentFile.lastModifiedDate.getTime()
    
    if (modified > lastModified) {
        lastModified = modified
        renderFile()
    }

}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    currentFile = evt.dataTransfer.files[0]; // FileList object.
    
    var dz = document.getElementById('drop-zone').innerHTML = currentFile.name
    
    pollFile()
    
    if (pollTimer) {
        clearTimeout(pollTimer)
    }
    pollTimer = setInterval(pollFile, 1000)
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
function init() {
    var dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
}
