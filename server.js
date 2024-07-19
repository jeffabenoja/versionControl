import jsonServer from "json-server"
import multer from "multer"
import fs from "fs"

const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middleware = jsonServer.defaults()

// Set default middlewares (logger, static, cors, and no cache)
server.use(middleware)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images")
  },
  filename: function (req, file, cb) {
    let date = new Date()
    let imageFileName = date.getTime() + "_" + file.originalname
    req.body.imageFileName = imageFileName
    cb(null, imageFileName)
  },
})

const bodyParser = multer({ storage: storage }).any()

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(bodyParser)
server.post("/products", (req, res, next) => {
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"))
  const products = db.products

  let lastId = products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0

  let date = new Date()
  req.body.createdAt = date.toISOString()
  req.body.id = lastId + 1

  if (req.body.price) {
    req.body.price = Number(req.body.price)
  }

  let hasError = false
  let errors = {}

  if (req.body.name.length < 2) {
    hasError = true
    errors.name = "The name length should at least more than 2 characters"
  }

  if (req.body.price <= 0) {
    hasError = true
    errors.price = "The price not valid"
  }

  if (req.body.description.length < 10) {
    hasError = true
    errors.description =
      "The description length should at least more than 10 characters"
  }

  if (hasError) {
    // return bad request (400) with validation errors
    res.status(400).jsonp(errors)
    return
  }

  // Continue to JSON Server Router
  next()
})

server.use(router)
server.listen(7000, () => {
  console.log("JSON server is running")
})
