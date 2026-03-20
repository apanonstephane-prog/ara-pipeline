export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const predId = searchParams.get('id')
    const apiKey = request.headers.get('x-replicate-key')
    if (!apiKey || !predId) return Response.json({ error: 'Paramètres manquants' }, { status: 400 })

    const res = await fetch(`https://api.replicate.com/v1/predictions/${predId}`, {
      headers: { Authorization: `Token ${apiKey}` }
    })
    if (!res.ok) return Response.json({ error: `HTTP ${res.status}` }, { status: res.status })

    const pred = await res.json()
    const output = pred.status === 'succeeded'
      ? (Array.isArray(pred.output) ? pred.output[0] : pred.output)
      : null

    return Response.json({ status: pred.status, output, error: pred.error || null })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
