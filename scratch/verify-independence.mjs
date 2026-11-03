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

async function verifyIndependence() {
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
      // 1. Initial measurement
      const before = await send('Runtime.evaluate', {
        expression: `(() => {
          const heritage = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]');
          const visitGuide = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]')?.parentElement?.nextElementSibling?.firstElementChild;
          const announcements = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]')?.parentElement?.nextElementSibling?.nextElementSibling?.firstElementChild;
          return {
            heritageH: heritage.offsetHeight,
            visitGuideH: visitGuide.offsetHeight,
            announcementsH: announcements.offsetHeight
          };
        })()`,
        returnByValue: true
      });

      console.log('Before adding announcements:', before.result?.value);

      // 2. Inject 20 extra announcements into the DOM inside the track
      await send('Runtime.evaluate', {
        expression: `(() => {
          const track = document.querySelector('div.will-change-transform');
          if (track) {
            for (let i = 0; i < 20; i++) {
              const clone = track.firstElementChild.firstElementChild.cloneNode(true);
              clone.querySelector('h4').textContent = 'Test Announcement ' + (i + 1);
              track.appendChild(clone);
            }
          }
        })()`
      });
      await new Promise(r => setTimeout(r, 500));

      // 3. Measure after adding 20 announcements
      const after = await send('Runtime.evaluate', {
        expression: `(() => {
          const heritage = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]');
          const visitGuide = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]')?.parentElement?.nextElementSibling?.firstElementChild;
          const announcements = document.querySelector('section[aria-label="Discover the Heritage of Matabari"]')?.parentElement?.nextElementSibling?.nextElementSibling?.firstElementChild;
          return {
            heritageH: heritage.offsetHeight,
            visitGuideH: visitGuide.offsetHeight,
            announcementsH: announcements.offsetHeight
          };
        })()`,
        returnByValue: true
      });

      console.log('After adding 20 extra announcements:', after.result?.value);

      const unchangedHeritage = before.result.value.heritageH === after.result.value.heritageH;
      const unchangedVisitGuide = before.result.value.visitGuideH === after.result.value.visitGuideH;
      const unchangedAnnouncements = before.result.value.announcementsH === after.result.value.announcementsH;

      console.log('Verification Results:', {
        heritageIndependent: unchangedHeritage,
        visitGuideIndependent: unchangedVisitGuide,
        announcementsContained: unchangedAnnouncements,
        allPassed: unchangedHeritage && unchangedVisitGuide && unchangedAnnouncements
      });

      ws.close();
      resolve();
    };
  });
}

verifyIndependence().catch(console.error);

