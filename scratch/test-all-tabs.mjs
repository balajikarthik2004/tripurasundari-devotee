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

async function testAllTabs() {
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

      // 1. Click "Submit Request" button by text content
      await send('Runtime.evaluate', {
        expression: `(() => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit Request'));
          if (btn) btn.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 600));
      let ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/accommodation-form.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved accommodation-form.png');

      // 2. Fill form and submit
      await send('Runtime.evaluate', {
        expression: `(() => {
          const nameInput = document.querySelector('input[placeholder*="Debashis"]');
          const mobileInput = document.querySelector('input[type="tel"]');
          if (nameInput) {
            nameInput.value = 'Ramesh Chandra Barman';
            nameInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
          if (mobileInput) {
            mobileInput.value = '9862012345';
            mobileInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
          const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit Accommodation Request'));
          if (submitBtn) submitBtn.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 600));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/accommodation-submitted.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved accommodation-submitted.png');

      // 3. Click "My Requests" tab
      await send('Runtime.evaluate', {
        expression: `(() => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('My Requests'));
          if (btn) btn.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 600));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/accommodation-my-requests.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved accommodation-my-requests.png');

      // 4. Open tracking modal
      await send('Runtime.evaluate', {
        expression: `(() => {
          const viewBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('View Tracking Details'));
          if (viewBtn) viewBtn.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 600));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/accommodation-modal-open.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved accommodation-modal-open.png');

      ws.close();
      resolve();
    };
  });
}

testAllTabs().catch(console.error);

