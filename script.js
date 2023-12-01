document.addEventListener('DOMContentLoaded', function() {
    var textInput = document.getElementById('textInput');
    var uniqueCountDisplay = document.getElementById('uniqueCount');
    var submitBtn = document.getElementById('submitBtn');
    var postBtn = document.getElementById('postBtn');
    
    // Set initial focus to the textarea and refocus on blur
    textInput.focus();
    textInput.addEventListener('blur', function() {
        setTimeout(function() { textInput.focus(); }, 0);
    });

    // Function to update unique values count
    function updateUniqueCount() {
        var lines = textInput.value.split('\n').filter(Boolean);
        var uniqueLines = new Set(lines.map(line => line.trim()));
        uniqueCountDisplay.textContent = 'Unique Values Count: ' + uniqueLines.size;
    }

    // Event listener for keyup event on Enter key
    textInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            updateUniqueCount();
        }
    });

    // Event listener for click event on submit button
    submitBtn.addEventListener('click', function() {
        var lines = textInput.value.split('\n');
        var uniqueLines = new Set(lines.map(line => line.trim()));

        var jsonObject = Array.from(uniqueLines).map(function(line) {
            return line !== '' ? { 'value': line } : null;
        }).filter(Boolean); // Filter out any null entries (from empty lines)

        document.getElementById('jsonOutput').textContent = JSON.stringify(jsonObject, null, 2);
    });

    // Event listener for click event on post button
    postBtn.addEventListener('click', function() {
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
});