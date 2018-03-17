# Orthoceras
Find available GitHub usernames using a simple word list

## Example

#### instance.js
```js
const Orth = require('./orth.js')

const Inst = new Orth('wordlist.txt', 'GITHUB_OAUTH_TOKEN')

if (!Inst) {
  console.error('Unable to create Orthoceras instance.')
}
```

`node instance.js`
