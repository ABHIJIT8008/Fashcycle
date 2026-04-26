import https from 'https';

https.get('https://www.fashcycle.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const urls = new Set();
    const urlRegex = /https:\/\/[^"'\s]+\.(?:png|jpg|jpeg|webp|svg)[^"'\s]*/g;
    let match;
    while ((match = urlRegex.exec(data)) !== null) {
      urls.add(match[0]);
    }
    
    // Also look for strings containing unsplash or similar
    const unsplashRegex = /https:\/\/images\.unsplash\.com[^"'\s]+/g;
    while ((match = unsplashRegex.exec(data)) !== null) {
      urls.add(match[0]);
    }
    
    // Cloudinary or similar CDN
    const cdnRegex = /https:\/\/(?:res\.cloudinary\.com|firebasestorage\.googleapis\.com)[^"'\s]+/g;
    while ((match = cdnRegex.exec(data)) !== null) {
      urls.add(match[0]);
    }

    console.log("All extracted image-like URLs:");
    console.log(Array.from(urls).join('\n'));
  });
}).on('error', (err) => {
  console.error(err);
});
