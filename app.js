const express = require('express');
  
const app = express();
const PORT = 5000;
  
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
