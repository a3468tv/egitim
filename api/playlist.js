import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'audio/x-mpegurl; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'data.json');
    const raw = fs.readFileSync(filePath, 'utf8');
    const videos = JSON.parse(raw);

    let m3u = '#EXTM3U\n';
    const host = `https://${req.headers.host}`;

    videos.forEach(v => {
      const title = v.title || 'Video';
      const id = v.id || '1';
      m3u += `#EXTINF:-1,${title}\n`;
      m3u += `${host}/api/stream?id=${id}\n`;
    });

    res.status(200).send(m3u);
  } catch (e) {
    res.status(200).send(`#EXTM3U\n#EXTINF:-1,Test Video - Matematik\nhttps://${req.headers.host}/api/stream?id=1\n`);
  }
}
