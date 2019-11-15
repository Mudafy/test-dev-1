from werkzeug.exceptions import Unauthorized, BadRequest, HTTPException, NotFound, Conflict

class BadCredentials(Unauthorized):
    description = "Invalid credentials"

