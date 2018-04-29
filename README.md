# messaging-service
Small messaging service written in Node.


## Usage
```
git clone https://github.com/skidlucas/messaging-service.git
npm install && npm start
```

This will start the server at http://localhost:30000.

Enter your username to log in.
You can then talk to the other users connected. Only you and the user you talked to will see the messages.

To check which users are currently online, type _/users_ in the message section.


## Questions

- Which share of web users will this implementation address? Should it be increased and
how?

_This implementation is purely functional as an exercise and wouldn't be implemented in the real world because I didn't add persistence or any security features._
- How many users can connect to one server?

- How can the system support more systems?

_For a real implementation, handling more users could be handled by adding more servers and more DB, and using a load balancer._ 

- How to reduce the attack surface of the systems?

_As my implementation is very basic, my messaging service does not care about security at all (no encryption, no sanitization, no verification of any kind). To answer in a general way, we could reduce the attack surface by reducing the amount of code running, the input of the users (never trust the users' input), and reducing untrusted dependencies that may contain vulnerabilities._

- Should an authentication mechanism be put in place and if yes, how?

_Once again, as my implementation is very basic, I don't handle the registration nor persistence of any kind. Authentication would be overkill for this implementation but in case of a real and more complete implementation, an authentication mechanism should be put in place. For example, we could hash (and salt) the login information and store it in a DB._