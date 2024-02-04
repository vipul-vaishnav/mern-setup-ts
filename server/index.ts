import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import path from 'path'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000
const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000'
}

app.use(express.json())
app.use(cors(corsOptions))

app.get('/api/v1/test', (req: Request, res: Response) =>
  res.status(200).json({
    status: 'OK',
    message: 'JAI SHREE RAM',
    data: [
      { name: 'Vipul', age: 22 },
      { name: 'Rahul', age: 23 },
      { name: 'Nakul', age: 27 },
      { name: 'Ainul', age: 21 },
      { name: 'Praful', age: 24 }
    ]
  })
)

const location = path.resolve()
if (process.env.NODE_ENV === 'dev') {
  app.get('/', (req: Request, res: Response) => res.send('<h1>Welcome to the app.</h1>'))
} else {
  app.use(express.static(path.resolve(location, '../', 'client/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(location, '../', 'client', 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(colors.green.bold.underline('[server]: App is listening on port: ' + PORT))
})
