import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const p1 = path.join(process.cwd(), 'TONGUC.txt');
    const p2 = path.join(process.cwd(), 'data', 'TONGUC.txt');
    const file = fs.existsSync(p1) ? p1 : p2;
    const content = fs.readFileSync(file, 'utf8');
    res.status(200).send(content);
  } catch (e) {
    res.status(200).send('#EXTM3U\n# HATA TONGUC.txt bulunamadi: ' + e.message);
  }
}
