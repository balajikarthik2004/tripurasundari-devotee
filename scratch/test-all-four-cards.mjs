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

async function testAllFourCards() {
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

      const scrollRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const scrollable = document.querySelector('.custom-scrollbar');
          if (scrollable) {
            scrollable.scrollTop = scrollable.scrollHeight;
          }
        })()`
      });
      await new Promise(r => setTimeout(r, 800));

      const cardMeasurements = await send('Runtime.evaluate', {
        expression: `(() => {
          const heritageCards = document.querySelectorAll('section[aria-label="Discover the Heritage of Matabari"] .grid > div');
          const kalyanSagar = heritageCards[0];
          const matabariPeda = heritageCards[1];
          const visitGuide = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]')?.parentElement?.nextElementSibling?.firstElementChild;
          const announcements = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]')?.parentElement?.nextElementSibling?.nextElementSibling?.firstElementChild;

          const roundRect = (el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
              top: Math.round(r.top),
              bottom: Math.round(r.bottom),
              height: Math.round(r.height),
              width: Math.round(r.width)
            };
          };

          return {
            kalyanSagar: roundRect(kalyanSagar),
            matabariPeda: roundRect(matabariPeda),
            visitGuide: roundRect(visitGuide),
            announcements: roundRect(announcements)
          };
        })()`,
        returnByValue: true
      });

      console.log('Individual Card Measurements:', JSON.stringify(cardMeasurements.result?.value, null, 2));

      // Capture screenshot
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/gwc/.gemini/antigravity/brain/12b895ad-9776-4761-a212-e64109420f1b/all-four-cards-aligned.png', Buffer.from(ss.data, 'base64'));
      console.log('Saved all-four-cards-aligned.png');

      ws.close();
      resolve();
    };
  });
}

testAllFourCards().catch(console.error);

