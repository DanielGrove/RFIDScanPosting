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

// Function to update unique values count and JSON output, and store data
function updateContent() {
    var lines = textInput.value.split('\n').filter(line => line.trim() !== '');

    // Update unique values count
    var uniqueLines = new Set(lines);
    uniqueCountDisplay.textContent = 'Unique Values Count: ' + uniqueLines.size;

    // Create JSON output with a single array of barcodes
    var jsonObject = {
        barcodes: Array.from(uniqueLines)
    };
    document.getElementById('jsonOutput').textContent = JSON.stringify(jsonObject, null, 2)
}

    // Event listener for input changes, including handling for '\n'
    textInput.addEventListener('input', function(event) {
        if (event.inputType === 'insertLineBreak') {
            updateContent();
        }
    });

    // Event listener for keyup event on Enter key
    textInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            updateContent();
        }
    });

    // Event listener for click event on submit button
    submitBtn.addEventListener('click', updateContent);

    // Event listener for click event on post button
    postBtn.addEventListener('click', function() {
        var jsonText = document.getElementById('jsonOutput').textContent;
        fetch('https://9sifs2.apps.connect.claris.com/api/webhook/v1/rfid20scan20app/catch', {
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
