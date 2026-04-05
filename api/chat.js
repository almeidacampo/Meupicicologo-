const ANTHROPIC_KEY = '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';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo nao permitido' });

  try {
    const body = req.body;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'messages-2023-12-15'
      },
      body: JSON.stringify({
        model: body.model || 'claude-sonnet-4-20250514',
        max_tokens: body.max_tokens || 1000,
        system: body.system || '',
        messages: body.messages || []
      })
    });

    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch(e) {
      res.status(200).json({ 
        content: [{ type: 'text', text: text }] 
      });
    }

  } catch (err) {
    res.status(500).json({ 
      content: [{ type: 'text', text: 'Erro: ' + err.message }] 
    });
  }
}
