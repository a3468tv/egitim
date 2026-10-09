import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'audio/x-mpegurl; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  try {
    const cwd = process.cwd();
    // TONGUC.txt'yi kökte veya data içinde ara
    let filePath = '';
    if (fs.existsSync(path.join(cwd, 'TONGUC.txt'))) filePath = path.join(cwd, 'TONGUC.txt');
    else if (fs.existsSync(path.join(cwd, 'data', 'TONGUC.txt'))) filePath = path.join(cwd, 'data', 'TONGUC.txt');
    
    if (filePath) {
      const content = fs.readFileSync(filePath, 'utf8');
      return res.status(200).send(content);
    }

    // Yoksa data.json'dan oluştur
    const jsonPath = path.join(cwd, 'data', 'data.json');
    if (fs.existsSync(jsonPath)) {
      const videos = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      let m3u = '#EXTM3U\n';
      const host = `https://${req.headers.host}`;
      videos.forEach(v => {
        m3u += `#EXTINF:-1,${v.title}\n${v.url}\n`;
      });
      return res.status(200).send(m3u);
    }

    return res.status(200).send('#EXTM3U\n#EXTINF:-1,Test\nhttps://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4\n');
  } catch (e) {
    return res.status(200).send('#EXTM3U\n# Error: ' + e.message);
  }
}
