import http from 'http';
import fs from 'fs';

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function snapRow3() {
  const pages = await getJson('http://127.0.0.1:9222/json');
  const page = pages.find(p => p.type === 'page' && p.url.includes('localhost:5173'));
  if (!page) return;

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params = {}) => new Promise(resolve => {
    const curId = id++;
    const handler = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id === curId) {
        ws.removeEventListener('message', handler);
        resolve(data.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  return new Promise((resolve) => {
    ws.onopen = async () => {
      // Close any open modal
      await send('Runtime.evaluate', {
        expression: `(() => {
          const closeBtn = document.querySelector('div[role="dialog"] button');
          closeBtn?.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 400));

      await send('Runtime.evaluate', {
        expression: `document.querySelector('.custom-scrollbar').scrollTop = 700`
      });
      await new Promise(r => setTimeout(r, 600));

      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/prasad-grid-row3.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved row 3');
      ws.close();
      resolve();
    };
  });
}

snapRow3().catch(console.error);
