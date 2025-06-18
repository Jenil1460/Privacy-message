const inputMessage = document.getElementById('inputMessage');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const outputSection = document.getElementById('outputSection');
const outputMessage = document.getElementById('outputMessage');
const copyBtn = document.getElementById('copyBtn');

const emojiMap = {
  'a': '😀', 'b': '😁', 'c': '😂', 'd': '😃', 'e': '😄',
  'f': '😅', 'g': '😆', 'h': '😇', 'i': '😈', 'j': '😉',
  'k': '😊', 'l': '😋', 'm': '😌', 'n': '😍', 'o': '😎',
  'p': '😏', 'q': '😐', 'r': '😑', 's': '😒', 't': '😓',
  'u': '😔', 'v': '😕', 'w': '😖', 'x': '😗', 'y': '😘',
  'z': '😙', ' ': '🙈', '.': '🙦', '!': '🙤'
};

const reverseEmojiMap = Object.fromEntries(
  Object.entries(emojiMap).map(([k, v]) => [v, k])
);

function encryptToEmoji(text) {
  return text.toLowerCase().split('').map(char => emojiMap[char] || char).join('');
}

function decryptFromEmoji(text) {
  return [...text].map(emoji => reverseEmojiMap[emoji] || '?').join('');
}

function showOutput(text) {
  outputMessage.textContent = text;
  outputSection.style.display = 'block';
  outputSection.classList.add('fade-in');
  setTimeout(() => outputSection.classList.remove('fade-in'), 500);
}

encryptBtn.addEventListener('click', () => {
  const message = inputMessage.value.trim();
  if (message) {
    showOutput(encryptToEmoji(message));
  } else {
    alert('Please enter a message to encrypt.');
  }
});

decryptBtn.addEventListener('click', () => {
  const message = inputMessage.value.trim();
  if (message) {
    showOutput(decryptFromEmoji(message));
  } else {
    alert('Please enter an emoji message to decrypt.');
  }
});

copyBtn.addEventListener('click', () => {
  const text = outputMessage.textContent;
  if (!text) return;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy to Clipboard', 2000);
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
});

function fallbackCopy(text) {
  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = text;
  tempTextarea.style.position = 'fixed';
  tempTextarea.style.opacity = '0';
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy to Clipboard', 2000);
    } else {
      alert('Failed to copy.');
    }
  } catch (err) {
    alert('Failed to copy.');
  }
  document.body.removeChild(tempTextarea);
}
