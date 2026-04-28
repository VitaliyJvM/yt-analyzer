import React, { useState } from 'react';
import axios from 'axios';
import { Search, MessageSquare, HelpCircle, AlertTriangle } from 'lucide-react';

interface AnalysisData {
  sentimentSummary: string;
  emojiScale: string;
  topQuestions: string[];
  criticalFeedback: string[];
}

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalysisData | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3001/analyze?url=${encodeURIComponent(url)}`);
      setData(res.data);
    } catch (err) {
      alert("Error analyzing video. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
        <h1>YouTube Comment Analyzer</h1>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <input
              style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
              placeholder="Paste YouTube URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
          />
          <button
              onClick={handleAnalyze}
              disabled={loading}
              style={{ padding: '10px 20px', background: '#FF0000', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {data && (
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Sentiment Section */}
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MessageSquare /> Overall Sentiment</h2>
                <p style={{ fontSize: '1.2rem' }}>{data.emojiScale}</p>
                <p>{data.sentimentSummary}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Questions */}
                <div style={{ border: '1px solid #e0e0e0', padding: '20px', borderRadius: '12px' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#2563eb' }}><HelpCircle /> Top Questions</h3>
                  <ul>{data.topQuestions.map((q, i) => <li key={i}>{q}</li>)}</ul>
                </div>

                {/* Feedback */}
                <div style={{ border: '1px solid #e0e0e0', padding: '20px', borderRadius: '12px' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#dc2626' }}><AlertTriangle /> Critical Feedback</h3>
                  <ul>{data.criticalFeedback.map((f, i) => <li key={i}>{f}</li>)}</ul>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default App;
