export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;
  const data = await import('../data/data.json', { with: { type: 'json' } }).then(m => m.default).catch(async () => {
    const fs = await import('fs');
    return JSON.parse(fs.readFileSync(process.cwd() + '/data/data.json', 'utf8'));
  });
  const item = data.find(v => String(v.id) === String(id) || String(v.title).includes('matamatik') );
  const video = item || data[0];
  if (!video ||!video.url) {
    return res.status(404).send('Video bulunamadi');
  }
  return res.redirect(302, video.url);
}
