import http from 'http';
import fs from 'fs';
import { execSync } from 'child_process';

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function capture() {
  let pages;
  try {
    pages = await getJson('http://127.0.0.1:9222/json');
  } catch (e) {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const profile = 'C:\\Users\\gwc\\.gemini\\antigravity\\brain\\12b895ad-9776-4761-a212-e64109420f1b\\scratch\\chrome-profile';
    execSync(`start "" "${chromePath}" --headless --remote-debugging-port=9222 --user-data-dir="${profile}" --disable-gpu http://localhost:5173/#home`, { shell: 'cmd.exe' });
    await new Promise(r => setTimeout(r, 2500));
    pages = await getJson('http://127.0.0.1:9222/json');
  }

  const page = pages.find(p => p.type === 'page');
  if (!page) {
    console.error('No page found');
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
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
      });
      await send('Page.reload');
      await new Promise(r => setTimeout(r, 1500));

      // Scroll the main container down so the lower dashboard is centered
      await send('Runtime.evaluate', {
        expression: `
          const scrollable = document.querySelector('.overflow-y-auto') || window;
          scrollable.scrollTop = 420;
        `
      });
      await new Promise(r => setTimeout(r, 600));

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:\\Users\\gwc\\.gemini\\antigravity\\brain\\12b895ad-9776-4761-a212-e64109420f1b\\announcements-scrolled.png', Buffer.from(screenshot.data, 'base64'));
      console.log('Saved announcements-scrolled.png');
      ws.close();
      resolve();
    };
  });
}

capture().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });
