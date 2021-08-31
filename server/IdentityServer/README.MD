# Flow

- Client (angular app) either presses Login or tries to access page that is guarded by auth guard 
- Auth guard checks auth service to see if user is logged in
- If no user is logged in, auth service (using oidc-client package) makes a call to identity server to retrive discovery document
    followed by a call to get authorize and get token
- Identity server receives call, checks user credentials, grants access to requested resources and scopes

TODO:
- Implement EF storage instead of in memory storage for users, scopes, etc.
- Protect API endpoints by scope (Use bands API to demo)
- Remove hardcoded values. For example, the test client uses a hardcoded return uri value for localhost/auth-callback
