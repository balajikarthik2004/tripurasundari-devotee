import http from 'http';

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function verifyInteractive() {
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
      // 1. Check toggle button click
      const pauseBtnRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const btn = document.querySelector('button[aria-label*="auto-scroll"]');
          if (!btn) return 'not found';
          btn.click();
          return btn.textContent;
        })()`,
        returnByValue: true
      });
      console.log('After clicking Pause button:', pauseBtnRes.result?.value);

      // Verify that while paused, transform does not move
      const t1 = await send('Runtime.evaluate', {
        expression: `document.querySelector('div.will-change-transform')?.style.transform`,
        returnByValue: true
      });
      await new Promise(r => setTimeout(r, 600));
      const t2 = await send('Runtime.evaluate', {
        expression: `document.querySelector('div.will-change-transform')?.style.transform`,
        returnByValue: true
      });
      console.log('Pause verification (should be identical):', { t1: t1.result?.value, t2: t2.result?.value });

      // Click resume again
      await send('Runtime.evaluate', {
        expression: `document.querySelector('button[aria-label*="auto-scroll"]')?.click()`
      });
      await new Promise(r => setTimeout(r, 600));
      const t3 = await send('Runtime.evaluate', {
        expression: `document.querySelector('div.will-change-transform')?.style.transform`,
        returnByValue: true
      });
      console.log('Resumed verification (should move):', { t3: t3.result?.value });

      ws.close();
      resolve();
    };
  });
}

verifyInteractive().catch(console.error);

