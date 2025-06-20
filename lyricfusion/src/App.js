import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // State variables for inputs, style, loading, etc.
  const [lyricsA, setLyricsA] = useState('');
  const [lyricsB, setLyricsB] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Sad');
  const [mashup, setMashup] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const styleOptions = [
    { label: 'Sad', value: 'Sad' },
    { label: 'Rap', value: 'Rap' },
    { label: 'Shakespearean', value: 'Shakespearean' },
    { label: 'Happy', value: 'Happy' },
    { label: 'Pop', value: 'Pop' },
    { label: 'Country', value: 'Country' },
  ];

  // PUBLIC_INTERFACE
  /**
   * Handler for AI lyric mashup generation.
   * This is the main integration point for backend/AI API.
   */
  async function handleGenerateMashup(e) {
    e.preventDefault();
    setError('');
    if (!lyricsA.trim() || !lyricsB.trim()) {
      setError('Please enter lyrics in both fields.');
      return;
    }
    setLoading(true);
    setMashup('');
    // --- INTEGRATION POINT: Insert real API call below ---
    try {
      // Simulate async API call
      await new Promise((r) => setTimeout(r, 1200)); // Placeholder for actual fetch
      // Mashup dummy output, replace with API response
      setMashup(
        `(${selectedStyle} Mashup)\n---\n` +
          lyricsA.split('\n').slice(0, 3).join(' ') +
          ' // ...mixed with... // ' +
          lyricsB.split('\n').slice(0, 3).join(' ') +
          '\n[Your AI mashup would appear here!]'
      );
    } catch (err) {
      setError('There was a problem generating your mashup. Try again.');
    }
    setLoading(false);
  }

  // PUBLIC_INTERFACE
  /**
   * Handler for downloading the mashup as a text file.
   */
  function handleDownloadMashup() {
    const blob = new Blob([mashup], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lyricfusion_mashup.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // PUBLIC_INTERFACE
  /**
   * Handler for copying the mashup to clipboard.
   */
  function handleCopyMashup() {
    navigator.clipboard.writeText(mashup);
  }

  // PUBLIC_INTERFACE
  /**
   * Handler for sharing via Web Share API (if available).
   */
  async function handleShareMashup() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LyricFusion Mashup',
          text: mashup,
        });
      } catch (_) { /* ignore cancel */ }
    } else {
      handleCopyMashup();
      alert('Mashup copied to clipboard! (Web Share not supported)');
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Render main LyricFusion UI.
   */
  return (
    <div className="app" style={{ background: '#f6fafd', color: '#1A2225', minHeight: '100vh' }}>
      <nav className="navbar" style={{ background: '#fff', borderColor: '#e4e8ef' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{ color: '#4A90E2' }}>
              <span className="logo-symbol" style={{ color: '#F5A623' }}>♪</span> LyricFusion
            </div>
            <a className="btn" href="https://github.com/" style={{ background: '#4A90E2', color: '#fff' }}>GitHub</a>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <section className="hero" style={{ paddingTop: 100, gap: 32 }}>
            <h1 className="title" style={{ fontWeight: 800, color: '#4A90E2', letterSpacing: '-1px', marginBottom: 8 }}>
              Mashup Song Lyrics
            </h1>
            <div className="subtitle" style={{ color: '#50E3C2', marginBottom: '12px', fontSize: '1.3rem', fontWeight: 500 }}>
              Remix any two lyrics with creative AI styles!
            </div>
            <form
              onSubmit={handleGenerateMashup}
              className="lyricfusion-form"
              style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 4px 32px rgba(80,227,194,.11)', width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 22, margin: '0 auto' }}
            >
              <label style={{ fontWeight: 500, marginBottom: 6, color: '#4A90E2' }}>
                Song Lyric 1
                <textarea
                  className="lyric-input"
                  rows={4}
                  placeholder="Paste the first set of lyrics here..."
                  value={lyricsA}
                  style={{
                    width: '100%', padding: 14, border: '1.5px solid #4A90E299', borderRadius: 6, marginTop: 6,
                    fontSize: '1.05rem', resize: 'vertical', fontFamily: 'inherit', color: '#1A2225', background: '#f6fafd'
                  }}
                  onChange={(e) => setLyricsA(e.target.value)}
                  maxLength={1200}
                  required
                />
              </label>

              <label style={{ fontWeight: 500, marginBottom: 6, color: '#4A90E2' }}>
                Song Lyric 2
                <textarea
                  className="lyric-input"
                  rows={4}
                  placeholder="Paste the second set of lyrics here..."
                  value={lyricsB}
                  style={{
                    width: '100%', padding: 14, border: '1.5px solid #4A90E299', borderRadius: 6, marginTop: 6,
                    fontSize: '1.05rem', resize: 'vertical', fontFamily: 'inherit', color: '#1A2225', background: '#f6fafd'
                  }}
                  onChange={(e) => setLyricsB(e.target.value)}
                  maxLength={1200}
                  required
                />
              </label>

              <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginTop: 6, flexWrap: 'wrap' }}>
                <div style={{ fontWeight: 500, color: '#1A2225', marginRight: 8 }}>
                  Remix Style:
                </div>
                <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                  {styleOptions.map(({ label, value }) => (
                    <button
                      type="button"
                      aria-label={`Select style: ${label}`}
                      key={value}
                      className="btn"
                      style={{
                        background: selectedStyle === value ? '#50E3C2' : '#eafafd',
                        color: selectedStyle === value ? '#1A2225' : '#4A90E2',
                        border: selectedStyle === value ? '2.3px solid #4A90E2' : '1.5px solid #4A90E255',
                        fontWeight: 600,
                        padding: '6px 14px',
                        borderRadius: 14,
                        fontSize: '1rem',
                        transition: 'all 0.20s',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedStyle(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {error && <div style={{ color: '#F5A623', marginTop: 7, fontWeight: 500 }}>{error}</div>}

              <button
                className="btn btn-large"
                style={{
                  marginTop: 12,
                  width: '100%',
                  background: loading ? '#b8daf9' : '#4A90E2',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  letterSpacing: 0.2,
                  boxShadow: loading ? 'none' : '0 2px 10px #4A90E233',
                  cursor: loading ? 'wait' : 'pointer'
                }}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Mashup'}
              </button>
            </form>

            <section
              className="mashup-display"
              style={{
                marginTop: 42,
                width: '100%',
                maxWidth: 640,
                minHeight: 170,
                background: '#fff',
                color: '#1A2225',
                border: '1.5px solid #4A90E233',
                borderRadius: 12,
                padding: 30,
                boxSizing: 'border-box',
                boxShadow: '0 3px 32px #e4e8ef40',
                fontFamily: 'Inter, "Segoe UI", Arial, sans-serif',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 9 }}>
                <span style={{
                  color: '#F5A623',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginRight: 12,
                  letterSpacing: 0.25
                }}>
                  Mashup Result
                </span>
                {mashup && (
                  <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
                    <button
                      className="btn"
                      style={{ background: '#50E3C2', color: '#fff', fontWeight: 600, fontSize: '.95rem', padding: '7px 13px'}}
                      onClick={handleCopyMashup}
                      type="button"
                      title="Copy mashup"
                    >Copy</button>
                    <button
                      className="btn"
                      style={{ background: '#4A90E2', color: '#fff', fontWeight: 600, fontSize: '.95rem', padding: '7px 13px'}}
                      onClick={handleDownloadMashup}
                      type="button"
                      title="Download mashup"
                    >Download</button>
                    <button
                      className="btn"
                      style={{ background: '#F5A623', color: '#fff', fontWeight: 600, fontSize: '.95rem', padding: '7px 13px'}}
                      onClick={handleShareMashup}
                      type="button"
                      title="Share mashup"
                    >Share</button>
                  </div>
                )}
              </div>
              <pre className="output" style={{
                fontSize: '1.13rem',
                lineHeight: 1.62,
                fontFamily: 'inherit',
                margin: 0,
                background: 'none',
                border: 'none',
                color: '#1A2225',
                wordBreak: 'break-word'
              }}>
                {mashup
                  ? mashup
                  : <span style={{ color: '#c2c2c2', fontStyle: 'italic' }}>Your AI-powered lyric mashup will appear here.</span>}
              </pre>
            </section>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;