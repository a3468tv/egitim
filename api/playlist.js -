import fs from 'fs'; import path from 'path';
export default function handler(req,res){
  const p = path.join(process.cwd(),'data','data.json');
  const data = JSON.parse(fs.readFileSync(p,'utf8'));
  let m3u = "#EXTM3U\n";
  for(const s of data.series||[]){
    for(const ep of s.episodes||[]){
      m3u += `#EXTINF:-1 tvg-logo="${s.cover||''}" group-title="${s.category||'Tonguc'}",${s.name} - ${ep.title}\n`;
      m3u += `${req.headers['x-forwarded-proto']||'https'}://${req.headers.host}/series/user/pass/${ep.id}.mp4\n`;
    }
  }
  res.setHeader('Content-Type','text/plain'); res.send(m3u);
}
