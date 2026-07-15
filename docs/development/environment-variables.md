# Environment Variables

Required environment variables for Pokeori.

## `.env.example`
Create a `.env` file based on this template:

```env
# Database (MongoDB)
DATABASE_URI=mongodb://localhost:27017/pokeori

# Payload CMS
PAYLOAD_SECRET=your-long-random-secret-key-here

# Email (Resend)
RESEND_API_KEY=re_your-resend-api-key-here

# Google Gemini (optional, for AI features)
GEMINI_API_KEY=your-gemini-api-key-here

# Redis (optional, defaults to localhost:6379)
REDIS_URL=redis://localhost:6379

# Next.js
NEXT_PUBLIC_APP_URL=https://localhost:3000
```

## Variable Descriptions
| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URI` | ✅ | MongoDB connection string |
| `PAYLOAD_SECRET` | ✅ | Random string for Payload session signing |
| `RESEND_API_KEY` | ✅ | Resend API key for transactional email |
| `GEMINI_API_KEY` | ❌ | Google Gemini API key (for AI features) |
| `REDIS_URL` | ❌ | Redis connection URL (defaults to localhost) |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public URL of the application |

## Security Notes
⚠️ Never commit `.env` to git. It is already added to `.gitignore`.
⚠️ Rotate secrets immediately if exposed (see [Security Report](/docs/audit/security-report.md))
