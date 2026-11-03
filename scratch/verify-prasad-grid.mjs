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

async function verifyPrasadGrid() {
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
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1366,
        height: 768,
        deviceScaleFactor: 1,
        mobile: false
      });

      // Navigate to #prasad and reload
      await send('Page.navigate', { url: 'http://localhost:5173/#prasad' });
      await new Promise(r => setTimeout(r, 1500));

      // 1. Capture top of page (Row 1 + Spotlight)
      let ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/prasad-grid-top.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved prasad-grid-top.png');

      // 2. Scroll down to capture Row 2 & Row 3
      await send('Runtime.evaluate', {
        expression: `(() => {
          const scrollable = document.querySelector('.custom-scrollbar');
          if (scrollable) scrollable.scrollTop = 420;
        })()`
      });
      await new Promise(r => setTimeout(r, 600));

      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/prasad-grid-bottom.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved prasad-grid-bottom.png');

      // 3. Test Details Modal on one of the new items
      await send('Runtime.evaluate', {
        expression: `(() => {
          const eyeBtns = document.querySelectorAll('button[title="View details"]');
          if (eyeBtns.length >= 6) eyeBtns[5]?.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 500));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/prasad-details-modal.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved prasad-details-modal.png');

      ws.close();
      resolve();
    };
  });
}

verifyPrasadGrid().catch(console.error);

