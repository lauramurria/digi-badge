import express, { Request, Response } from 'express';
import cors from 'cors';
import { Resolver } from 'did-resolver';
import { getResolver as webDidResolver } from 'web-did-resolver';
import { getResolver as keyDidResolver } from 'key-did-resolver';
import { verifyCredential, verifyPresentation } from 'did-jwt-vc';

// Open Badges v3 Specification Types
interface Achievement {
  id: string;
  type: string[];
  name: string;
  description: string;
  criteria: {
    narrative: string;
  };
  image?: string;
  alignment?: Array<{
    targetName: string;
    targetUrl: string;
    targetCode?: string;
    targetDescription?: string;
    targetFramework?: string;
  }>;
}

interface Issuer {
  id: string;
  type: string[];
  name: string;
  description?: string;
  url?: string;
  email?: string;
  image?: string;
  verification?: {
    allowedOrigins?: string[];
    verificationProperty?: string;
  };
}

interface CredentialSubject {
  id: string;
  type: string[];
  achievement: Achievement;
  evidence?: Array<{
    id: string;
    type: string[];
    name?: string;
    description?: string;
    narrative?: string;
    genre?: string;
    audience?: string;
  }>;
  hasCredential?: Array<{
    id: string;
    type: string[];
    name?: string;
    description?: string;
    issuer?: Issuer;
  }>;
  related?: Array<{
    id: string;
    type: string[];
    name?: string;
    description?: string;
  }>;
}

interface OpenBadgeCredential {
  '@context': string[];
  id: string;
  type: string[];
  issuer: Issuer;
  validFrom: string;
  validUntil?: string;
  name: string;
  description?: string;
  credentialSubject: CredentialSubject;
  credentialSchema?: Array<{
    id: string;
    type: string;
  }>;
  evidence?: Array<{
    id: string;
    type: string[];
    name?: string;
    description?: string;
    narrative?: string;
    genre?: string;
    audience?: string;
  }>;
  achievement?: Achievement;
}

// API Types
interface VerifyRequestBody {
  vcJwt?: string;
  vpJwt?: string;
  audience?: string;
  challenge?: string;
}

interface HealthResponse {
  ok: boolean;
}

interface VerifyResponse {
  ok: boolean;
  type?: 'VC' | 'VP';
  payload?: OpenBadgeCredential | any;
  issuer?: string;
  holder?: string;
  proof?: any;
  error?: string;
}

// National Skills Wallet - Open Badges v3 Compliant Server
// This server verifies JWT-based Verifiable Credentials (VCs) and Verifiable Presentations (VPs)
// that conform to the Open Badges Specification v3.0 and W3C Verifiable Credentials standards
const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const resolver = new Resolver({
  ...webDidResolver(),
  ...keyDidResolver(),
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response<HealthResponse>) => {
  res.json({ ok: true });
});

// POST /api/verify - Verify Open Badges v3 Compliant Credentials
// body: { vcJwt?: string, vpJwt?: string, audience?: string, challenge?: string }
// Returns verified Open Badges v3 credential data with proper type safety
app.post('/api/verify', async (req: Request<{}, VerifyResponse, VerifyRequestBody>, res: Response<VerifyResponse>) => {
  try {
    const { vcJwt, vpJwt, audience, challenge } = req.body || {};
    
    if (!vcJwt && !vpJwt) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Provide vcJwt or vpJwt' 
      });
    }

    if (vcJwt) {
      const result = await verifyCredential(vcJwt, { resolver, audience });
      return res.json({ 
        ok: true, 
        type: 'VC', 
        payload: result?.verifiableCredential, 
        issuer: result?.issuer, 
        proof: result?.proof 
      });
    }

    if (vpJwt) {
      const result = await verifyPresentation(vpJwt, { resolver, audience, challenge });
      return res.json({ 
        ok: true, 
        type: 'VP', 
        payload: result?.verifiablePresentation, 
        holder: result?.holder, 
        proof: result?.proof 
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Verification failed';
    return res.status(400).json({ 
      ok: false, 
      error: message 
    });
  }
});

const PORT: number = parseInt(process.env.PORT || '5174', 10); // avoid clashing with Vite 3000

app.listen(PORT, () => {
  console.log(`VC verifier API listening on http://localhost:${PORT}`);
});
