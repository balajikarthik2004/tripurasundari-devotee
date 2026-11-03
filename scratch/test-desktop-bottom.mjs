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

async function testDesktopBottom() {
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

      // Scroll the custom-scrollbar container down to the bottom
      await send('Runtime.evaluate', {
        expression: `(() => {
          const scrollable = document.querySelector('.custom-scrollbar');
          if (scrollable) {
            scrollable.scrollTop = scrollable.scrollHeight;
          }
        })()`
      });
      await new Promise(r => setTimeout(r, 800));

      const evalRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const heritage = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]');
          const visitGuide = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]')?.parentElement?.nextElementSibling?.firstElementChild;
          const announcements = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]')?.parentElement?.nextElementSibling?.nextElementSibling?.firstElementChild;
          
          return {
            heritage: {
              h: heritage?.offsetHeight,
              top: heritage ? Math.round(heritage.getBoundingClientRect().top) : null,
              bottom: heritage ? Math.round(heritage.getBoundingClientRect().bottom) : null
            },
            visitGuide: {
              h: visitGuide?.offsetHeight,
              top: visitGuide ? Math.round(visitGuide.getBoundingClientRect().top) : null,
              bottom: visitGuide ? Math.round(visitGuide.getBoundingClientRect().bottom) : null
            },
            announcements: {
              h: announcements?.offsetHeight,
              top: announcements ? Math.round(announcements.getBoundingClientRect().top) : null,
              bottom: announcements ? Math.round(announcements.getBoundingClientRect().bottom) : null
            }
          };
        })()`,
        returnByValue: true
      });

      console.log('Scrolled Viewport Positions:', JSON.stringify(evalRes.result?.value, null, 2));

      // Capture screenshot of the bottom row
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/home-bottom-cards.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved home-bottom-cards.png');

      ws.close();
      resolve();
    };
  });
}

testDesktopBottom().catch(console.error);
