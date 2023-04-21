const chatMessages = document.getElementById('chat-messages');
const chatTextInput = document.getElementById('chat-text-input');
const chatSendBtn = document.getElementById('chat-send-btn');


const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

async function sendMessage() {
  
  const res = await instance.post('/', { prompt: chatTextInput.value })
 
  chatMessages.innerText = res.data.response
}

chatSendBtn.addEventListener('click', sendMessage);
chatTextInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});