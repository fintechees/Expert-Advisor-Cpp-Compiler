const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { exec } = require("child_process")
const fs = require("fs")

const app = express()
const port = 3000

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit: "10kb"}))
app.use("/js", express.static("static"))

app.post("/compile", (req, res) => {
  const name = req.body.name
  const sourceCode = req.body.sourceCode
  const type = req.body.type
  var msg = null

  fs.writeFile("./static/" + name + ".cpp", sourceCode, err => {
    if (err) {
      msg = `stderr: ${err}`
      console.error(msg)
      return res.send({res: msg})
    }

    if (type == "indicator") {
      exec('emcc ./static/' + name + '.cpp -o ./static/' + name + '.js -s EXTRA_EXPORTED_RUNTIME_METHODS=\'["ccall", "cwrap", "getValue", "setValue", "addFunction", "UTF8ToString", "lengthBytesUTF8", "stringToUTF8"]\' -s RESERVED_FUNCTION_POINTERS=100 -s MODULARIZE=1 -s \'EXPORT_NAME="IndiPlugIn"\' -s ENVIRONMENT=web -s ALLOW_MEMORY_GROWTH=1', (error, stdout, stderr) => {
          if (error) {
            msg = `error: ${error.message}`
            console.error(msg)
            return res.send({res: msg})
          }
          if (stderr) {
            msg = `${stderr}`
            console.error(msg)
            return res.send({res: msg})
          }
          msg = `${stdout}`
          console.log(msg)
          return res.send({res: msg})
      })
    } else {
      exec('emcc ./static/' + name + '.cpp -o ./static/' + name + '.js -s EXTRA_EXPORTED_RUNTIME_METHODS=\'["ccall", "cwrap", "getValue", "setValue", "addFunction", "UTF8ToString", "lengthBytesUTF8", "stringToUTF8"]\' -s RESERVED_FUNCTION_POINTERS=100 -s MODULARIZE=1 -s \'EXPORT_NAME="EAPlugIn"\' -s ENVIRONMENT=web -s ASYNCIFY -s \'ASYNCIFY_IMPORTS=["jOrderSend", "jOrderModify", "jOrderClose", "jOrderDelete"]\' -O3', (error, stdout, stderr) => {
          if (error) {
            msg = `error: ${error.message}`
            console.error(msg)
            return res.send({res: msg})
          }
          if (stderr) {
            msg = `${stderr}`
            console.error(msg)
            return res.send({res: msg})
          }
          msg = `${stdout}`
          console.log(msg)
          return res.send({res: msg})
      })
    }
  })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
