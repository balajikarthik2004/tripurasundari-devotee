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

async function verifyRedesign() {
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

      // 1. Reload page on #accommodation
      await send('Page.navigate', { url: 'http://localhost:5173/#accommodation' });
      await new Promise(r => setTimeout(r, 1200));

      let ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/redesign-1-main-card.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved redesign-1-main-card.png');

      // 2. Click "Enquire About Accommodation" CTA
      await send('Runtime.evaluate', {
        expression: `(() => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Enquire About Accommodation'));
          btn?.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 500));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/redesign-2-enquiry-modal.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved redesign-2-enquiry-modal.png');

      // 3. Fill enquiry form and submit
      await send('Runtime.evaluate', {
        expression: `(() => {
          const nameInput = document.querySelector('input[placeholder*="Full name"]');
          const mobileInput = document.querySelector('input[placeholder*="10-digit"]');
          const setVal = (el, val) => {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            setter.call(el, val);
            el.dispatchEvent(new Event('input', { bubbles: true }));
          };
          if (nameInput) setVal(nameInput, 'Debasish Sharma');
          if (mobileInput) setVal(mobileInput, '9862155443');
          const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit Enquiry'));
          submitBtn?.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 600));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/redesign-3-enquiry-submitted.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved redesign-3-enquiry-submitted.png');

      // 4. Click "View in My Requests"
      await send('Runtime.evaluate', {
        expression: `(() => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('View in My Requests'));
          btn?.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 500));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/redesign-4-my-requests.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved redesign-4-my-requests.png');

      // 5. Click "View Details" on the submitted card
      await send('Runtime.evaluate', {
        expression: `(() => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('View Details'));
          btn?.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 500));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/redesign-5-view-details-modal.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved redesign-5-view-details-modal.png');

      ws.close();
      resolve();
    };
  });
}

verifyRedesign().catch(console.error);

