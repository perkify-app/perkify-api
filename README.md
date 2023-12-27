# perkify-api

## Setup

```
npm install i
```

Create .env.config file at the top level of the repo with values:
```
JWT_KEY="..."
SUPABASE_URL="..."
PUBLIC_ANON_KEY="..."
```

Run
```
listen.js
```

## Test using Postman

### Login

GET http://localhost:9090/auth/login
Authorization tab -> Select (Basic Authentication) 

#### Merchant role
```
username: a@a.com
password: 1234
```

#### No role assigned
```
username: b@b.com
password: 123456
```

### Logout

GET http://localhost:9090/auth/logout

### Endpoints for testing

#### Requires authentication

GET http://localhost:9090/api/

#### Requires authentication and merchant role

GET http://localhost:9090/api/merchant
