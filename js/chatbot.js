/* DM Keepsies — AI Chat Widget (Kei) */
(function () {
  'use strict';

  // ── Conversation history ───────────────────────────────────────
  const history = [];

  // ── Inject styles ──────────────────────────────────────────────
  const css = `
    #kei-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #F2789F 0%, #ED4F86 50%, #D6336C 100%);
      border: none;
      cursor: pointer;
      box-shadow: 0 0 28px rgba(237,79,134,0.7), 0 6px 18px rgba(214,51,108,0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform .2s ease, box-shadow .2s ease;
      font-size: 1.5rem;
    }
    #kei-btn:hover {
      transform: scale(1.08) translateY(-2px);
      box-shadow: 0 0 38px rgba(237,79,134,0.85), 0 10px 24px rgba(214,51,108,0.6);
    }
    #kei-panel {
      position: fixed;
      bottom: 96px;
      right: 24px;
      z-index: 9998;
      width: 360px;
      max-height: 540px;
      border-radius: 20px;
      background: #fff;
      box-shadow: 0 0 32px rgba(242,120,159,0.3), 0 16px 48px rgba(214,51,108,0.2);
      border: 1px solid rgba(242,120,159,0.4);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: scale(0.92) translateY(16px);
      opacity: 0;
      pointer-events: none;
      transition: transform .25s ease, opacity .25s ease;
      font-family: 'Montserrat', sans-serif;
    }
    #kei-panel.kei-open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }
    #kei-header {
      background: linear-gradient(135deg, #D6336C 0%, #ED4F86 60%, #F2789F 100%);
      padding: 16px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    #kei-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      flex-shrink: 0;
    }
    #kei-header-text { flex: 1; }
    #kei-header-text strong {
      display: block;
      color: #fff;
      font-size: .95rem;
      font-weight: 700;
    }
    #kei-header-text span {
      color: rgba(255,255,255,.8);
      font-size: .75rem;
    }
    #kei-online {
      width: 8px;
      height: 8px;
      background: #5DF083;
      border-radius: 50%;
      box-shadow: 0 0 6px #5DF083;
      margin-right: 4px;
      display: inline-block;
      vertical-align: middle;
    }
    #kei-close {
      background: rgba(255,255,255,.2);
      border: none;
      color: #fff;
      font-size: 1.2rem;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background .2s;
      flex-shrink: 0;
      line-height: 1;
    }
    #kei-close:hover { background: rgba(255,255,255,.35); }
    #kei-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #FFF3F7;
      scroll-behavior: smooth;
    }
    #kei-messages::-webkit-scrollbar { width: 4px; }
    #kei-messages::-webkit-scrollbar-thumb { background: rgba(242,120,159,0.4); border-radius: 4px; }
    .kei-msg {
      max-width: 82%;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: .875rem;
      line-height: 1.55;
      word-wrap: break-word;
    }
    .kei-msg-bot {
      align-self: flex-start;
      background: #fff;
      color: #3D1022;
      border: 1px solid rgba(242,120,159,0.35);
      box-shadow: 0 2px 8px rgba(242,120,159,0.15);
      border-bottom-left-radius: 4px;
    }
    .kei-msg-user {
      align-self: flex-end;
      background: linear-gradient(135deg, #ED4F86, #D6336C);
      color: #fff;
      border-bottom-right-radius: 4px;
      box-shadow: 0 2px 10px rgba(214,51,108,0.35);
    }
    .kei-typing {
      align-self: flex-start;
      background: #fff;
      border: 1px solid rgba(242,120,159,0.35);
      box-shadow: 0 2px 8px rgba(242,120,159,0.15);
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      padding: 12px 16px;
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .kei-typing span {
      width: 7px;
      height: 7px;
      background: #F2789F;
      border-radius: 50%;
      animation: kei-bounce .9s infinite ease-in-out;
    }
    .kei-typing span:nth-child(2) { animation-delay: .15s; }
    .kei-typing span:nth-child(3) { animation-delay: .30s; }
    @keyframes kei-bounce {
      0%, 80%, 100% { transform: translateY(0); opacity: .5; }
      40%            { transform: translateY(-6px); opacity: 1; }
    }
    #kei-footer {
      padding: 12px 14px;
      border-top: 1px solid rgba(242,120,159,0.25);
      background: #fff;
      display: flex;
      gap: 8px;
      align-items: center;
      flex-shrink: 0;
    }
    #kei-input {
      flex: 1;
      padding: 10px 14px;
      border-radius: 999px;
      border: 1.5px solid rgba(242,120,159,0.4);
      font-family: 'Montserrat', sans-serif;
      font-size: .875rem;
      color: #3D1022;
      background: #FFF3F7;
      outline: none;
      transition: border-color .2s;
    }
    #kei-input:focus { border-color: #ED4F86; }
    #kei-input::placeholder { color: #B0A0A5; }
    #kei-send {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #F2789F, #ED4F86, #D6336C);
      border: none;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 14px rgba(237,79,134,0.5);
      transition: filter .2s, transform .2s;
      flex-shrink: 0;
    }
    #kei-send:hover { filter: brightness(1.1); transform: scale(1.06); }
    #kei-send:disabled { opacity: .5; cursor: default; transform: none; }
    #kei-branding {
      text-align: center;
      font-size: .68rem;
      color: #B0A0A5;
      padding: 6px 0 4px;
      background: #fff;
      flex-shrink: 0;
    }
    @media (max-width: 420px) {
      #kei-panel { width: calc(100vw - 24px); right: 12px; bottom: 84px; }
      #kei-btn   { right: 16px; bottom: 16px; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Build HTML ─────────────────────────────────────────────────
  document.body.insertAdjacentHTML('beforeend', `
    <button id="kei-btn" aria-label="Chat with Kei, DM Keepsies AI assistant" title="Chat with us">
      💬
    </button>

    <div id="kei-panel" role="dialog" aria-label="Kei — DM Keepsies AI chat">
      <div id="kei-header">
        <div id="kei-avatar">💗</div>
        <div id="kei-header-text">
          <strong>Kei</strong>
          <span><span id="kei-online"></span>DM Keepsies AI · Always here to help</span>
        </div>
        <button id="kei-close" aria-label="Close chat">✕</button>
      </div>

      <div id="kei-messages"></div>

      <div id="kei-footer">
        <input
          id="kei-input"
          type="text"
          placeholder="Ask about products, pricing, orders…"
          maxlength="400"
          autocomplete="off"
        />
        <button id="kei-send" aria-label="Send message">➤</button>
      </div>
      <div id="kei-branding">Powered by AI · DM Keepsies</div>
    </div>
  `);

  // ── Element refs ───────────────────────────────────────────────
  const btn      = document.getElementById('kei-btn');
  const panel    = document.getElementById('kei-panel');
  const closeBtn = document.getElementById('kei-close');
  const messages = document.getElementById('kei-messages');
  const input    = document.getElementById('kei-input');
  const send     = document.getElementById('kei-send');

  let greeted = false;

  // ── Toggle panel ───────────────────────────────────────────────
  function openPanel() {
    panel.classList.add('kei-open');
    btn.textContent = '✕';
    input.focus();
    if (!greeted) {
      greeted = true;
      setTimeout(() => addBotMessage(
        "Hi po! 💗 I'm Kei, your DM Keepsies assistant. How can I help you today? Ask me about our products, pricing, or how to place an order!"
      ), 350);
    }
  }

  function closePanel() {
    panel.classList.remove('kei-open');
    btn.textContent = '💬';
  }

  btn.addEventListener('click', () => {
    panel.classList.contains('kei-open') ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);

  // ── Add messages ───────────────────────────────────────────────
  function addBotMessage(text) {
    const el = document.createElement('div');
    el.className = 'kei-msg kei-msg-bot';
    el.textContent = text;
    messages.appendChild(el);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const el = document.createElement('div');
    el.className = 'kei-msg kei-msg-user';
    el.textContent = text;
    messages.appendChild(el);
    scrollToBottom();
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'kei-typing';
    el.id = 'kei-typing-indicator';
    el.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(el);
    scrollToBottom();
    return el;
  }

  function removeTyping() {
    const el = document.getElementById('kei-typing-indicator');
    if (el) el.remove();
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  // ── Send message ───────────────────────────────────────────────
  async function sendMessage() {
    const text = input.value.trim();
    if (!text || send.disabled) return;

    input.value = '';
    send.disabled = true;

    addUserMessage(text);
    history.push({ role: 'user', content: text });

    const typing = showTyping();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();
      removeTyping();

      const reply = data.reply || data.error || 'Sorry, something went wrong. Please try again!';
      history.push({ role: 'assistant', content: reply });
      addBotMessage(reply);
    } catch {
      removeTyping();
      addBotMessage('Oops! I had trouble connecting. Please try again in a moment. 💗');
    } finally {
      send.disabled = false;
      input.focus();
    }
  }

  send.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
})();
