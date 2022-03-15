const express = require('express')
const app = express()
const port = 3000

app.use(express.static('bundles'))

app.listen(port, () => {
  console.log(`Consent platform mock listening on ${port}`)
})