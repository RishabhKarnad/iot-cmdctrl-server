import express, { Request, Response } from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/health-check', (req, res) => res.send({ message: 'OK' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
