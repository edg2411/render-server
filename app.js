const express = require('express');
  
const app = express();
const PORT = 5000;

// parse JSON bodies (useful for webhooks)
app.use(express.json());
  
app.get('/', (req, res) => {
  const { code, state, error } = req.query; // destructure query parameters

  if (error) {
    console.error('OAuth error:', error);
    return res.status(400).send(`Error: ${error}`);
  }

  if (!code) {
    return res.status(400).send('No authorization code received');
  }

  console.log('Received code:', code);
  console.log('Received state:', state);

  // Here you could now exchange the code for an access token.
  // For example:
  // const tokenResponse = await fetch('https://api.mercadopago.com/oauth/token', {...});

  // Just to confirm visually in browser:
  res.send(`Received authorization code: ${code}`);
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
