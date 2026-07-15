# GraphQL API

Payload CMS provides a GraphQL endpoint at `/api/graphql`.

## Endpoint
`POST /api/graphql`

## Playground
Accessible at `https://localhost:3000/api/graphql-playground` in development.

## Example Queries

### Get Current User
```graphql
query {
  me {
    id
    email
    trainerName
    skills {
      catching {
        level
        xp
      }
    }
  }
}
```

### Get User's Pokemon
```graphql
query {
  pokemon(where: { user: { equals: "user-id-here" } }) {
    docs {
      id
      speciesId
      formId
      shiny
      stats {
        hp
        attack
      }
    }
  }
}
```

## Schema
Full schema available in GraphQL Playground.
