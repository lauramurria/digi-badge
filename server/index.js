import express from 'express';
import cors from 'cors';
import { createRequire } from 'module';
import { Resolver } from 'did-resolver';
import { getResolver as webDidResolver } from 'web-did-resolver';
import { getResolver as keyDidResolver } from 'key-did-resolver';
import { verifyCredential, verifyPresentation } from 'did-jwt-vc';

// Minimal Express server that verifies JWT-based VCs/VPs
const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const resolver = new Resolver({
  ...webDidResolver(),
  ...keyDidResolver(),
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// POST /api/verify
// body: { vcJwt?: string, vpJwt?: string, audience?: string, challenge?: string }
app.post('/api/verify', async (req, res) => {
  try {
    const { vcJwt, vpJwt, audience, challenge } = req.body || {};
    if (!vcJwt && !vpJwt) {
      return res.status(400).json({ ok: false, error: 'Provide vcJwt or vpJwt' });
    }

    if (vcJwt) {
      const result = await verifyCredential(vcJwt, { resolver, audience });
      return res.json({ ok: true, type: 'VC', payload: result?.verifiableCredential, issuer: result?.issuer, proof: result?.proof });
    }

    if (vpJwt) {
      const result = await verifyPresentation(vpJwt, { resolver, audience, challenge });
      return res.json({ ok: true, type: 'VP', payload: result?.verifiablePresentation, holder: result?.holder, proof: result?.proof });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Verification failed';
    return res.status(400).json({ ok: false, error: message });
  }
});

const PORT = process.env.PORT || 5174; // avoid clashing with Vite 3000
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`VC verifier API listening on http://localhost:${PORT}`);
});


