const Orth = require('./orth.js')

// GitHub authentication token is required to prevent rate limiting
const Inst = new Orth('wordlist.txt', 'GITHUB_OAUTH_TOKEN')

if (!Inst) {
  console.error('Unable to create Orthoceras instance.')
}
