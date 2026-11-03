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

async function testDesktop() {
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
      // 1. Set 1366x768 desktop viewport
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1366,
        height: 768,
        deviceScaleFactor: 1,
        mobile: false
      });
      await send('Page.reload');
      await new Promise(r => setTimeout(r, 2000));

      // 2. Measure heights and alignments
      const evalRes1 = await send('Runtime.evaluate', {
        expression: `(() => {
          const heritage = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]');
          const visitGuide = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]')?.parentElement?.nextElementSibling?.firstElementChild;
          const announcements = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]')?.parentElement?.nextElementSibling?.nextElementSibling?.firstElementChild;
          
          return {
            windowInner: { w: window.innerWidth, h: window.innerHeight },
            heritage: heritage ? {
              h: heritage.offsetHeight,
              top: Math.round(heritage.getBoundingClientRect().top),
              bottom: Math.round(heritage.getBoundingClientRect().bottom)
            } : null,
            visitGuide: visitGuide ? {
              h: visitGuide.offsetHeight,
              top: Math.round(visitGuide.getBoundingClientRect().top),
              bottom: Math.round(visitGuide.getBoundingClientRect().bottom)
            } : null,
            announcements: announcements ? {
              h: announcements.offsetHeight,
              top: Math.round(announcements.getBoundingClientRect().top),
              bottom: Math.round(announcements.getBoundingClientRect().bottom)
            } : null
          };
        })()`,
        returnByValue: true
      });

      console.log('1366x768 Measurements:', JSON.stringify(evalRes1.result?.value, null, 2));

      // 3. Check motion over 1.5 seconds
      const t1 = await send('Runtime.evaluate', {
        expression: `document.querySelector('div.will-change-transform')?.style.transform`,
        returnByValue: true
      });
      await new Promise(r => setTimeout(r, 1500));
      const t2 = await send('Runtime.evaluate', {
        expression: `document.querySelector('div.will-change-transform')?.style.transform`,
        returnByValue: true
      });
      console.log('Continuous motion verification:', { transform1: t1.result?.value, transform2: t2.result?.value });

      // 4. Capture Full Page Screenshot
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/home-desktop-verified.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved home-desktop-verified.png');

      ws.close();
      resolve();
    };
  });
}

testDesktop().catch(console.error);

