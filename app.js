const express = require('express');
  
const app = express();
const PORT = 5000;

// parse JSON bodies (useful for webhooks)
app.use(express.json());
  
app.get('/', (req, res) => {
  const { code, state, error } = req.query;

  // Redirect OAuth callbacks to the real backend
  if (code && state) {
    console.log('Redirecting OAuth to backend - code:', code, 'state:', state);
    return res.redirect(`https://mp-dashboard.edgtech.com.ar/api/oauth/redirect?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`);
  }

  if (error) {
    console.error('OAuth error:', error);
    return res.redirect(`https://mp-dashboard.edgtech.com.ar/oauth/callback?error=${encodeURIComponent(error)}`);
  }

  // No OAuth params - return 400
  res.status(400).send('No authorization code received');
});

// Test webhook endpoint - responds 200 OK
app.post('/testwebhook', (req, res) => {
  console.log('Test webhook received (POST):', {
    headers: req.headers,
    body: req.body,
  });
  res.sendStatus(200);
});

// Optional GET for quick testing from browser
app.get('/testwebhook', (req, res) => {
  console.log('Test webhook received (GET):', {
    query: req.query,
  });
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
