document.getElementById('new-thread-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const userInput = document.getElementById('user-input').value;

    // Start a new conversation thread
    fetch('/forum/discuss', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
        .then(response => response.json())  // Convert response to JSON
        .then(data => {
            console.log('Server response:', data);  // Log the response for debugging
            const conversationDiv = document.getElementById('conversation');
            conversationDiv.innerHTML = ''; // Clear existing conversation

            // Display the received message
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            messageDiv.textContent = `Server: ${data.content}`;
            conversationDiv.appendChild(messageDiv);
        })
        .catch(error => console.error('Error:', error));
});
