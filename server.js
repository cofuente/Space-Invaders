const express = require('express')
const port = 8080
const app = express()
const path = require( 'path' )


app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, () => {
  console.log(`Example game listening at http://localhost:${port}`)
})