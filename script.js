
// Basic functionality for the send button
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn').addEventListener('click', function() {
        const messageText = document.getElementById('messageText').value;
        if (messageText.trim() !== '') {
            const listGroup = document.querySelector('.list-group');
            const newMessage = document.createElement('li');
            newMessage.className = 'list-group-item';
            newMessage.textContent = messageText;
            listGroup.appendChild(newMessage);
            document.getElementById('messageText').value = '';
        }
    });
});
