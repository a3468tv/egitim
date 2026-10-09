export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const m3u = `#EXTM3U
#EXTINF:-1 group-title="Matematik" tvg-logo="https://i.ytimg.com/vi/5tTC-xwhV-4/maxresdefault.jpg",1.Sınıf Matematik Sayılar
https://www.youtube.com/watch?v=cqOPI7hUgoo
#EXTINF:-1 group-title="Matematik",1.Sınıf Matematik Toplama
https://www.youtube.com/watch?v=fjTNmhIBpZ4
#EXTINF:-1 group-title="Matematik",Test - Big Buck Bunny (MP4 Test)
https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
`;
  res.status(200).send(m3u);
}
