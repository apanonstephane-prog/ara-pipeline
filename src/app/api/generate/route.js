export async function POST(request) {
  try {
    const { prompt, ratio, refUrl } = await request.json()
    const apiKey = request.headers.get('x-replicate-key')
    if (!apiKey) return Response.json({ error: 'Clé API manquante' }, { status: 401 })

    const input = { prompt, aspect_ratio: ratio, output_format: 'jpg' }
    if (refUrl) input.image = refUrl

    const res = await fetch('https://api.replicate.com/v1/models/google/nano-banana-pro/predictions', {
      method: 'POST',
      headers: { Authorization: `Token ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return Response.json({ error: err.detail || `HTTP ${res.status}` }, { status: res.status })
    }

    const pred = await res.json()
    return Response.json({ id: pred.id, status: pred.status })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
