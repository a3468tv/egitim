import fs from 'fs'; import path from 'path';
export default async function handler(req,res){
  let id = (req.query.stream_id||'').replace(/\.[^/.]+$/,'');
  let ytId = id;
  try{
    const d = JSON.parse(fs.readFileSync(path.join(process.cwd(),'data/data.json'),'utf8'));
    for(const s of d.series||[]){
      const ep = (s.episodes||[]).find(e=>String(e.id)===String(id));
      if(ep?.url){ const m=ep.url.match(/v=([^&]+)/); if(m) ytId=m[1]; break; }
    }
  }catch(e){}

  // En sağlam 2 kaynak, direkt redirect
  const urls = [
    `https://piped.video/latest_version?id=${ytId}&itag=18`,
    `https://inv.nadeko.net/latest_version?id=${ytId}&itag=18`
  ];
  for(const u of urls){
    try{
      const h = await fetch(u,{method:'HEAD',signal:AbortSignal.timeout(3000)});
      if(h.ok||h.status===302) return res.redirect(302,u);
    }catch(e){}
  }
  return res.redirect(302,`https://www.youtube.com/watch?v=${ytId}`);
}
