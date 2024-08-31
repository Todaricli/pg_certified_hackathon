import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import url from 'url';
import keys from '../../application_default_credentials.json' assert { type: 'json' };

// Create an OAuth client to authorize the API call.
const oAuth2Client = new OAuth2Client(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0]
);

const auth = Router();

// Route to initiate OAuth flow
auth.get('/google', (req, res) => {
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
  });

  // Redirect the user to the Google authorization page
  res.redirect(authorizeUrl);
});

// Route to handle OAuth callback
auth.get('/oauth2callback', async (req, res) => {
  try {
    const qs = new url.URL(req.url, `http://${req.headers.host}`).searchParams;
    const code = qs.get('code');
    if (!code) {
      res.status(400).send('No code found');
      return;
    }

    // Exchange the code for tokens
    const r = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(r.tokens);
    console.info('Tokens acquired.');

    // Respond to the user
    res.send('Authentication successful! You can close this window.');
  } catch (error) {
    console.error('Error during OAuth2 flow:', error);
    res.status(500).send('Authentication failed');
  }
});

export default auth;





