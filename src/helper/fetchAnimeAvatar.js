async function fetchAnimeAvatar() {
  try {
    const res = await fetch('https://api.waifu.pics/sfw/waifu')
    if (!res.ok) throw new Error('waifu.pics responded with ' + res.status)
    const data = await res.json()
    return data.url
  } catch (err) {
    console.warn('[avatar] Fallback avatar used:', err.message)
    return 'https://placehold.co/60/0095BE/fff?text=U'
  }
}

module.exports = fetchAnimeAvatar
