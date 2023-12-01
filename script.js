window.onload = function() {
    document.getElementById('textInput').focus();}

    document.getElementById('submitBtn').addEventListener('click', function() {
    var textInput = document.getElementById('textInput').value;
    var lines = textInput.split('\n');
    var jsonObject = lines.map(function(line) { 
        return { 'barcode': line.trim() }; 
    });
    document.getElementById('jsonOutput').textContent = JSON.stringify(jsonObject, null, 2);
});

document.addEventListener('DOMContentLoaded', function() {
    var textInput = document.getElementById('textInput');
    var uniqueCountDisplay = document.getElementById('uniqueCount');

    // Function to update unique values count
    function updateUniqueCount() {
        var lines = textInput.value.split('\n').filter(Boolean);
        var uniqueLines = new Set(lines.map(line => line.trim()));
        uniqueCountDisplay.textContent = 'Unique Values Count: ' + uniqueLines.size;
    }

    // Set initial focus and refocus on blur
    textInput.focus();
    textInput.addEventListener('blur', function() {
        setTimeout(function() { textInput.focus(); }, 0);
    });

    // Event listener for keyup event on Enter key
    textInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            updateUniqueCount();
        }
    })});

document.getElementById('submitBtn').addEventListener('click', function() {
    var textInput = document.getElementById('textInput').value;
    var lines = textInput.split('\n');

    // Create a Set to store unique lines
    var uniqueLines = new Set(lines.map(line => line.trim()));

    // Generate a JSON object from the unique lines
    var jsonObject = Array.from(uniqueLines).map(function(line) {
        return line !== '' ? { 'value': line } : null;
    }).filter(Boolean); // Filter out any null entries (from empty lines)

    document.getElementById('jsonOutput').textContent = JSON.stringify(jsonObject, null, 2);
    });


document.getElementById('postBtn').addEventListener('click', function() {
    var jsonText = document.getElementById('jsonOutput').textContent;
    fetch('https://lga6ws.apps.connect.claris.com/api/webhook/v1/barcodes20via20browser/catch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonText
    })
    .then(response => response.json())
    .then(data => {
        alert('Success:', data);
    })
    .catch((error) => {
        alert('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var textInput = document.getElementById('textInput');

    // Set initial focus to the textarea
    textInput.focus();

    // Event listener to refocus on the textarea whenever it loses focus
     textInput.addEventListener('blur', function() {
        setTimeout(function() { textInput.focus(); }, 0);
     });
});
