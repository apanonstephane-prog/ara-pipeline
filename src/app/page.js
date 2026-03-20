'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { CHARACTERS, VILLES, VIMANAS, LIEUX, ARMES } from './data'

const POLL_INTERVAL = 3000
const MAX_POLLS = 60

const LS = {
  get: (key, fallback) => {
    if (typeof window === 'undefined') return fallback
    try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback } catch { return fallback }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  },
}

function addLog(setLogs, msg, type = 'info') {
  setLogs(prev => {
    const entry = { msg, type, ts: Date.now() }
    return [...prev.slice(-7), entry]
  })
}

export default function Page() {
  const [apiKey, setApiKey] = useState(() => LS.get('ara_apiKey', ''))
  const [connected, setConnected] = useState(() => LS.get('ara_connected', false))
  const [phase, setPhase] = useState(() => LS.get('ara_phase', 'characters'))
  const [images, setImages] = useState(() => LS.get('ara_images', {}))
  const [refs, setRefs] = useState(() => LS.get('ara_refs', {}))
  const [status, setStatus] = useState({})
  const [elapsed, setElapsed] = useState({})
  const [logs, setLogs] = useState([])

  useEffect(() => { LS.set('ara_apiKey', apiKey) }, [apiKey])
  useEffect(() => { LS.set('ara_connected', connected) }, [connected])
  useEffect(() => { LS.set('ara_phase', phase) }, [phase])
  useEffect(() => { LS.set('ara_images', images) }, [images])
  useEffect(() => { LS.set('ara_refs', refs) }, [refs])

  const generated = Object.keys(images).length

  const refsRef = useRef(LS.get('ara_refs', {}))
  const apiKeyRef = useRef(LS.get('ara_apiKey', ''))

  const syncRefs = (newRefs) => {
    refsRef.current = newRefs
    setRefs(newRefs)
  }

  const syncApiKey = (key) => {
    apiKeyRef.current = key
    setApiKey(key)
  }

  const entities = { characters: CHARACTERS, villes: VILLES, vimanas: VIMANAS, lieux: LIEUX, armes: ARMES }[phase] || CHARACTERS
  const totalImages = entities.reduce((acc, e) => acc + e.images.length, 0)
  const generatedInPhase = entities.reduce((acc, e) => {
    return acc + e.images.filter(img => images[img.id]).length
  }, 0)

  const generate = useCallback(async (entityId, imgId, prompt, ratio, isRef) => {
    const key = apiKeyRef.current
    if (!key) {
      addLog(setLogs, '⚠ Clé API requise', 'error')
      return
    }

    const currentRefs = refsRef.current
    if (!isRef && !currentRefs[entityId]) {
      addLog(setLogs, `⊘ Valide la référence avant de générer`, 'error')
      return
    }

    setStatus(prev => ({ ...prev, [imgId]: 'running' }))
    addLog(setLogs, `▶ ${imgId} — génération lancée`, 'info')

    const startTime = Date.now()
    const timer = setInterval(() => {
      setElapsed(prev => ({ ...prev, [imgId]: Math.floor((Date.now() - startTime) / 1000) }))
    }, 1000)

    try {
      const refUrl = isRef ? null : (refsRef.current[entityId] || null)
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-replicate-key': key },
        body: JSON.stringify({ prompt, ratio, refUrl }),
      })

      const data = await res.json()
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Erreur génération')
      }

      const predId = data.id
      let polls = 0

      const poll = async () => {
        if (polls >= MAX_POLLS) {
          clearInterval(timer)
          setStatus(prev => ({ ...prev, [imgId]: 'error' }))
          addLog(setLogs, `❌ ${imgId} — timeout`, 'error')
          return
        }
        polls++

        try {
          const pollRes = await fetch(`/api/poll?id=${predId}`, {
            headers: { 'x-replicate-key': key },
          })
          const pollData = await pollRes.json()

          if (pollData.status === 'succeeded' && pollData.output) {
            clearInterval(timer)
            setImages(prev => ({ ...prev, [imgId]: pollData.output }))
            setStatus(prev => ({ ...prev, [imgId]: 'done' }))
            addLog(setLogs, `✓ ${imgId} — succès`, 'success')
          } else if (pollData.status === 'failed' || pollData.error) {
            clearInterval(timer)
            setStatus(prev => ({ ...prev, [imgId]: 'error' }))
            addLog(setLogs, `❌ ${imgId} — ${pollData.error || 'échec'}`, 'error')
          } else {
            setTimeout(poll, POLL_INTERVAL)
          }
        } catch {
          setTimeout(poll, POLL_INTERVAL)
        }
      }

      setTimeout(poll, POLL_INTERVAL)
    } catch (err) {
      clearInterval(timer)
      setStatus(prev => ({ ...prev, [imgId]: 'error' }))
      addLog(setLogs, `❌ ${imgId} — ${err.message}`, 'error')
    }
  }, [])

  // Reçoit l'url directement depuis le call site — pas de lecture de state dans un updater
  const validateRef = useCallback((entityId, url) => {
    if (!url) return
    const newRefs = { ...refsRef.current, [entityId]: url }
    refsRef.current = newRefs
    setRefs(newRefs)
    addLog(setLogs, `✓ Référence ${entityId} validée`, 'success')
  }, [])

  const resetImage = useCallback((entityId, imgId, isRef, prompt, ratio, imgIsRef) => {
    setImages(prev => {
      const next = { ...prev }
      delete next[imgId]
      return next
    })
    setStatus(prev => {
      const next = { ...prev }
      delete next[imgId]
      return next
    })
    setElapsed(prev => {
      const next = { ...prev }
      delete next[imgId]
      return next
    })

    if (isRef) {
      const newRefs = { ...refsRef.current }
      delete newRefs[entityId]
      syncRefs(newRefs)
      addLog(setLogs, `↺ Référence ${entityId} réinitialisée — images suivantes verrouillées`, 'info')
    } else {
      addLog(setLogs, `↺ ${imgId} réinitialisé`, 'info')
    }

    setTimeout(() => generate(entityId, imgId, prompt, ratio, imgIsRef), 200)
  }, [generate])

  const styles = {
    app: { display: 'flex', minHeight: '100vh' },
    sidebar: {
      width: 190, flexShrink: 0, background: '#181612', borderRight: '1px solid rgba(184,150,62,0.15)',
      padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
    },
    main: { flex: 1, overflowY: 'auto', padding: '0 0 40px' },
    header: {
      background: '#181612', borderBottom: '1px solid rgba(184,150,62,0.2)', padding: '12px 24px',
      display: 'flex', alignItems: 'center', gap: 16, position: 'sticky', top: 0, zIndex: 10,
    },
    title: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 300, color: '#d4b86a', letterSpacing: 2 },
    input: {
      background: '#222018', border: '1px solid rgba(184,150,62,0.3)', color: '#c8bfb0',
      padding: '6px 10px', fontSize: 12, fontFamily: 'inherit', outline: 'none', flex: 1, maxWidth: 280,
    },
    btn: (variant = 'default') => ({
      background: variant === 'gold' ? 'rgba(184,150,62,0.15)' : variant === 'success' ? 'rgba(106,170,122,0.15)' : variant === 'danger' ? 'rgba(192,112,96,0.15)' : '#222018',
      border: `1px solid ${variant === 'gold' ? '#b8963e' : variant === 'success' ? '#6aaa7a' : variant === 'danger' ? '#c07060' : 'rgba(200,191,176,0.2)'}`,
      color: variant === 'gold' ? '#d4b86a' : variant === 'success' ? '#6aaa7a' : variant === 'danger' ? '#c07060' : '#c8bfb0',
      padding: '5px 10px', fontSize: 11, fontFamily: 'inherit', cursor: 'pointer', letterSpacing: 1,
    }),
    section: { padding: '20px 24px' },
    entityBlock: { marginBottom: 32 },
    entityHeader: {
      display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12,
      borderBottom: '1px solid rgba(184,150,62,0.1)', paddingBottom: 8,
    },
    entityName: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: '#d4b86a', letterSpacing: 2 },
    entityMeta: { fontSize: 11, color: '#8c8070' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 },
    card: (st, locked) => ({
      background: '#181612', border: `1px solid ${st === 'running' ? 'rgba(184,150,62,0.4)' : st === 'done' ? 'rgba(184,150,62,0.3)' : 'rgba(200,191,176,0.1)'}`,
      position: 'relative', opacity: locked ? 0.4 : 1,
      animation: st === 'running' ? 'pulse-gold 1.5s infinite' : 'none',
    }),
    imageArea: (ratio) => ({
      aspectRatio: ratio === '16:9' ? '16/9' : '2/3',
      background: '#0e0d0b', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }),
    cardFooter: { padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 4 },
    cardLabel: { fontSize: 10, color: '#8c8070', letterSpacing: 1, textTransform: 'uppercase' },
    cardActions: { display: 'flex', gap: 4, flexWrap: 'wrap' },
    overlay: {
      position: 'absolute', inset: 0, background: 'rgba(14,13,11,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, color: '#8c8070', textAlign: 'center', padding: 8,
    },
    spinner: {
      width: 20, height: 20, border: '2px solid rgba(184,150,62,0.2)',
      borderTop: '2px solid #b8963e', borderRadius: '50%',
      animation: 'spin 0.8s linear infinite', margin: '0 auto 6px',
    },
    badge: (type) => ({
      fontSize: 9, padding: '2px 5px', letterSpacing: 1,
      background: type === 'ref' ? 'rgba(184,150,62,0.2)' : 'transparent',
      border: `1px solid ${type === 'ref' ? '#b8963e' : 'transparent'}`,
      color: type === 'ref' ? '#d4b86a' : 'transparent',
      display: 'inline-block',
    }),
    sideLabel: { fontSize: 9, color: '#8c8070', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
    sideValue: { fontSize: 13, color: '#c8bfb0' },
    logEntry: (type) => ({
      fontSize: 10, color: type === 'success' ? '#6aaa7a' : type === 'error' ? '#c07060' : '#8c8070',
      lineHeight: 1.4, wordBreak: 'break-all',
    }),
    phaseBtn: (active) => ({
      flex: 1, padding: '6px 0', fontSize: 11, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer',
      background: active ? 'rgba(184,150,62,0.15)' : '#222018',
      border: `1px solid ${active ? '#b8963e' : 'rgba(200,191,176,0.15)'}`,
      color: active ? '#d4b86a' : '#8c8070',
    }),
  }

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: '#d4b86a', letterSpacing: 3, marginBottom: 4 }}>AṚA</div>
          <div style={{ fontSize: 9, color: '#8c8070', letterSpacing: 1 }}>PIPELINE VISUEL</div>
        </div>

        {/* Phase selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={styles.phaseBtn(phase === 'characters')} onClick={() => setPhase('characters')}>PERSO</button>
            <button style={styles.phaseBtn(phase === 'villes')} onClick={() => setPhase('villes')}>VILLES</button>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={styles.phaseBtn(phase === 'vimanas')} onClick={() => setPhase('vimanas')}>VIMANAS</button>
            <button style={styles.phaseBtn(phase === 'lieux')} onClick={() => setPhase('lieux')}>LIEUX</button>
          </div>
          <button style={{ ...styles.phaseBtn(phase === 'armes'), width: '100%' }} onClick={() => setPhase('armes')}>ARMES</button>
        </div>

        {/* Stats */}
        <div>
          <div style={styles.sideLabel}>Progression</div>
          <div style={styles.sideValue}>{generatedInPhase} / {totalImages}</div>
          <div style={{ height: 3, background: '#222018', marginTop: 6 }}>
            <div style={{ height: '100%', background: '#b8963e', width: `${totalImages ? (generatedInPhase / totalImages) * 100 : 0}%`, transition: 'width 0.5s' }} />
          </div>
        </div>

        <div>
          <div style={styles.sideLabel}>Budget estimé</div>
          <div style={styles.sideValue}>${(generated * 0.04).toFixed(2)}</div>
          <div style={{ fontSize: 9, color: '#8c8070' }}>{generated} images × $0.04</div>
        </div>

        {/* Références validées */}
        <div>
          <div style={styles.sideLabel}>Références</div>
          {Object.keys(refs).length === 0
            ? <div style={{ fontSize: 10, color: '#8c8070' }}>Aucune validée</div>
            : Object.keys(refs).map(eid => (
              <div key={eid} style={{ fontSize: 10, color: '#6aaa7a', marginBottom: 2 }}>✓ {eid}</div>
            ))
          }
        </div>

        {/* Logs */}
        <div style={{ flex: 1 }}>
          <div style={styles.sideLabel}>Journal</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {logs.length === 0
              ? <div style={{ fontSize: 10, color: '#8c8070' }}>—</div>
              : logs.map((log, i) => (
                <div key={i} style={styles.logEntry(log.type)}>{log.msg}</div>
              ))
            }
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        {/* HEADER */}
        <header style={styles.header}>
          <span style={styles.title}>AṚA — Pipeline Visuel</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            {!connected ? (
              <>
                <input
                  type="password"
                  placeholder="Clé Replicate (r8_…)"
                  value={apiKey}
                  onChange={e => syncApiKey(e.target.value)}
                  style={styles.input}
                  onKeyDown={e => { if (e.key === 'Enter' && apiKey.trim()) setConnected(true) }}
                />
                <button
                  style={styles.btn('gold')}
                  onClick={() => { if (apiKey.trim()) { setConnected(true); addLog(setLogs, '✓ Clé API connectée', 'success') } }}
                >
                  CONNECTER
                </button>
              </>
            ) : (
              <>
                <span style={{ fontSize: 11, color: '#6aaa7a', letterSpacing: 1 }}>✓ CONNECTÉ</span>
                <button style={styles.btn()} onClick={() => { setConnected(false); syncApiKey('') }}>DÉCONNECTER</button>
                <button style={styles.btn('danger')} onClick={() => {
                  if (confirm('Effacer toutes les images et références sauvegardées ?')) {
                    setImages({}); setRefs({}); refsRef.current = {}
                    addLog(setLogs, '↺ Cache effacé', 'info')
                  }
                }}>RESET</button>
              </>
            )}
          </div>
        </header>

        {/* ENTITIES */}
        <div style={styles.section}>
          {entities.map(entity => {
            const refValidated = refs[entity.id]
            return (
              <div key={entity.id} style={styles.entityBlock}>
                <div style={styles.entityHeader}>
                  <span style={styles.entityName}>{entity.name}</span>
                  <span style={styles.entityMeta}>{entity.role}{entity.location ? ` — ${entity.location}` : ''}</span>
                  {refValidated && <span style={{ fontSize: 10, color: '#6aaa7a', marginLeft: 'auto' }}>✓ ref validée</span>}
                </div>

                <div style={styles.grid}>
                  {entity.images.map((img) => {
                    const imgUrl = images[img.id]
                    const imgStatus = status[img.id]
                    const imgElapsed = elapsed[img.id] || 0
                    const isLocked = !img.isRef && !refValidated
                    const isRunning = imgStatus === 'running'
                    const isDone = imgStatus === 'done'
                    const isRefValidated = img.isRef && refValidated && refValidated === imgUrl

                    return (
                      <div key={img.id} style={styles.card(imgStatus, isLocked)}>
                        {/* Image area */}
                        <div style={styles.imageArea(img.ratio)}>
                          {imgUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={imgUrl}
                              alt={img.label}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                          )}

                          {isLocked && (
                            <div style={styles.overlay}>
                              ⊘ Valide la référence<br />{entity.name}
                            </div>
                          )}

                          {isRunning && !isLocked && (
                            <div style={{ ...styles.overlay, background: 'rgba(14,13,11,0.7)' }}>
                              <div>
                                <div style={styles.spinner} />
                                <div style={{ fontSize: 10, color: '#b8963e' }}>{imgElapsed}s</div>
                              </div>
                            </div>
                          )}

                          {imgStatus === 'error' && !isLocked && (
                            <div style={{ ...styles.overlay, background: 'rgba(14,13,11,0.5)' }}>
                              <span style={{ color: '#c07060' }}>❌ erreur</span>
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div style={styles.cardFooter}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={styles.cardLabel}>{img.label}</span>
                            {isRefValidated && <span style={styles.badge('ref')}>✓ VALIDÉE</span>}
                          </div>

                          <div style={styles.cardActions}>
                            {/* Generate button */}
                            {!isLocked && !isRunning && !imgUrl && (
                              <button
                                style={styles.btn('gold')}
                                onClick={() => generate(entity.id, img.id, img.prompt, img.ratio, img.isRef)}
                              >
                                ▶ GÉN
                              </button>
                            )}

                            {/* Reset button */}
                            {!isLocked && !isRunning && imgUrl && (
                              <button
                                style={styles.btn()}
                                onClick={() => resetImage(entity.id, img.id, img.isRef, img.prompt, img.ratio, img.isRef)}
                              >
                                ↺
                              </button>
                            )}

                            {/* Retry on error */}
                            {!isLocked && imgStatus === 'error' && (
                              <button
                                style={styles.btn('danger')}
                                onClick={() => generate(entity.id, img.id, img.prompt, img.ratio, img.isRef)}
                              >
                                ↺ RETRY
                              </button>
                            )}

                            {/* Validate ref */}
                            {img.isRef && isDone && imgUrl && !refValidated && (
                              <button
                                style={styles.btn('success')}
                                onClick={() => validateRef(entity.id, imgUrl)}
                              >
                                ✓ VALIDER
                              </button>
                            )}

                            {/* View / Save */}
                            {imgUrl && (
                              <a href={imgUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <button style={styles.btn()}>↗ VOIR</button>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
