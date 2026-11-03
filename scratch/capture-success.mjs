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

async function testSuccessCard() {
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
      await send('Page.reload');
      await new Promise(r => setTimeout(r, 1200));

      await send('Runtime.evaluate', {
        expression: `(() => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit Request'));
          btn?.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 400));

      await send('Runtime.evaluate', {
        expression: `(() => {
          const nameInput = document.querySelector('input[placeholder*="Debashis"]');
          const mobileInput = document.querySelector('input[type="tel"]');
          const setVal = (el, val) => {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            setter.call(el, val);
            el.dispatchEvent(new Event('input', { bubbles: true }));
          };
          setVal(nameInput, 'Dr. Bimalendu Debnath');
          setVal(mobileInput, '9436123456');
          const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit Accommodation Request'));
          submitBtn?.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 600));

      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/accommodation-success-card.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved success card');
      ws.close();
      resolve();
    };
  });
}

testSuccessCard().catch(console.error);

