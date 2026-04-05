const ANTHROPIC_KEY = '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';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1000,
      system: req.body.system || '',
      messages: req.body.messages || []
    })
  });

  const data = await response.json();
  return res.status(200).json(data);
}
