# API Reference

All API endpoints for Pokeori.

## Endpoints
- [REST Endpoints](/docs/api/rest-endpoints.md) - Custom Next.js API routes
- [GraphQL](/docs/api/graphql.md) - Payload CMS GraphQL schema
- [Authentication](/docs/api/authentication.md) - Auth flow and session management

## Base URLs
- **Development**: `https://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

## Response Format
All custom API routes return JSON:
```json
{
  "data": {},    // Success data
  "error": ""    // Error message (if failed)
}
```

## HTTP Status Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (invalid input) |
| 401 | Unauthorized (not logged in) |
| 403 | Forbidden (insufficient permissions) |
| 500 | Internal Server Error |
