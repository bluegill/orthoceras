'use strict'

const fs = require('fs')
const axios = require('axios')
const chalk = require('chalk')

class Orthoceras {
  constructor (file, token) {
    this.instance = axios.create({
      baseURL: 'https://api.github.com/',
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'Orthoceras'
      }
    })

    fs.readFile(file, 'utf8', (error, data) => {
      if (error) {
        console.error(`Please provide a word list file for Orthoceras to scour.`)
        process.exit(1)
      }

      this.processList(data)
    })
  }

  processList (raw) {
    const wordList = raw.split('\n')

    let timeout = 0

    for (let word of wordList) {
      setTimeout(() => {
        this.fetchUser(word).then((result) => {
          if (result.available) {
            console.log(chalk.green(`The username '${word}' is available and free for registration.`))
          } else {
            console.log(chalk.red(`The username '${word}' is not available.`))
          }
        }).catch((error) => {
          console.error(error)
        })
      }, timeout)

      // 300ms timeout
      timeout += 300
    }
  }

  fetchUser (username) {
    return new Promise((resolve, reject) => {
      this.instance.get(`/users/${username}`).then((response) => {
        if (response.status === 200) resolve({ available: false })
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          resolve({ available: true })
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = Orthoceras
