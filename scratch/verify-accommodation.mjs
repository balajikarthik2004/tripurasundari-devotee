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

async function verifyAccommodation() {
  const pages = await getJson('http://127.0.0.1:9222/json');
  const page = pages.find(p => p.type === 'page' && p.url.includes('localhost:5173'));
  if (!page) {
    console.log('No page found');
    return;
  }

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

      // 1. Navigate to #accommodation
      await send('Page.navigate', { url: 'http://localhost:5173/#accommodation' });
      await new Promise(r => setTimeout(r, 1500));

      // Capture Overview tab
      let ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/accommodation-tab1-overview.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved accommodation-tab1-overview.png');

      // 2. Click "Submit Request" tab
      await send('Runtime.evaluate', {
        expression: `document.querySelectorAll('header button')[1]?.click()`
      });
      await new Promise(r => setTimeout(r, 600));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/accommodation-tab2-submit.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved accommodation-tab2-submit.png');

      // 3. Fill form and submit
      const submitRes = await send('Runtime.evaluate', {
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
          const submitBtn = document.querySelector('form button[type="submit"]');
          if (submitBtn) {
            submitBtn.click();
            return 'submitted';
          }
          return 'btn not found';
        })()`,
        returnByValue: true
      });
      console.log('Submit action result:', submitRes.result?.value);
      await new Promise(r => setTimeout(r, 600));

      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/accommodation-tab2-success.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved accommodation-tab2-success.png');

      // 4. Click "Track in My Requests" or My Requests tab
      await send('Runtime.evaluate', {
        expression: `document.querySelectorAll('header button')[2]?.click()`
      });
      await new Promise(r => setTimeout(r, 600));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/accommodation-tab3-requests.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved accommodation-tab3-requests.png');

      // 5. Open tracking details modal for the first item
      await send('Runtime.evaluate', {
        expression: `document.querySelector('button:has(svg.lucide-chevron-right)')?.click()`
      });
      await new Promise(r => setTimeout(r, 600));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/accommodation-tracking-modal.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved accommodation-tracking-modal.png');

      ws.close();
      resolve();
    };
  });
}

verifyAccommodation().catch(console.error);

