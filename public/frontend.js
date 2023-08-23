const userLatitude = 37.7749;
const userLongitude = -122.4194;

const map = L.map('map').setView([userLatitude, userLongitude], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const socket = io.connect('http://localhost:3000'); // Replace with your server URL

const userMarker = L.marker([userLatitude, userLongitude]).addTo(map);

socket.on('chat-message', message => {
  const messages = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messages.appendChild(messageElement);
});

document.getElementById('sendMessage').addEventListener('click', () => {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});
