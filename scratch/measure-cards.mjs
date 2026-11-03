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

async function measure() {
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
      // Reload page to get latest Vite HMR code
      await send('Page.reload');
      await new Promise(r => setTimeout(r, 1500));

      const evalRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const heritage = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]');
          const visitGuide = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]')?.parentElement?.nextElementSibling?.firstElementChild;
          const announcements = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]')?.parentElement?.nextElementSibling?.nextElementSibling?.firstElementChild;
          
          return {
            windowInner: { w: window.innerWidth, h: window.innerHeight },
            heritage: heritage ? {
              h: heritage.offsetHeight,
              top: heritage.getBoundingClientRect().top,
              bottom: heritage.getBoundingClientRect().bottom
            } : null,
            visitGuide: visitGuide ? {
              h: visitGuide.offsetHeight,
              top: visitGuide.getBoundingClientRect().top,
              bottom: visitGuide.getBoundingClientRect().bottom
            } : null,
            announcements: announcements ? {
              h: announcements.offsetHeight,
              top: announcements.getBoundingClientRect().top,
              bottom: announcements.getBoundingClientRect().bottom
            } : null
          };
        })()`,
        returnByValue: true
      });

      console.log('Measurements:', JSON.stringify(evalRes.result?.value, null, 2));

      // Capture screenshot
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/home-aligned.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved home-aligned.png');

      ws.close();
      resolve();
    };
  });
}

measure().catch(console.error);

