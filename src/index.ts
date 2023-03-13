import dotenv from "dotenv"
import App from './app'

(async () => {
  try {
    dotenv.config()

    const app = await App()
    
    const PORT = parseInt(process.env.PORT || "8080")  
    
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
})()
