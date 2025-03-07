
// Basic functionality for the send button
document.addEventListener('DOMContentLoaded', function() {
    const messageList = document.getElementById('message-list');
    
    // Add messages from the initial data if needed
    // This can be populated from a separate source if needed
    
    document.querySelector('.btn').addEventListener('click', function() {
        const messageText = document.getElementById('messageText').value;
        if (messageText.trim() !== '') {
            const newMessage = document.createElement('li');
            newMessage.className = 'list-group-item';
            newMessage.textContent = messageText;
            messageList.appendChild(newMessage);
            document.getElementById('messageText').value = '';
        }
    });
});
