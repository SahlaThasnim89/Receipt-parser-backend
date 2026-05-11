import express, { Request, Response } from "express"
import router from "./routes/receipt.routes"
import multer from 'multer';
import 'dotenv/config';

const app = express()
const port = 8080;

app.use(express.json());

app.use(router)

app.use((err: any, _req: any, res: any, _next: any) => {
  if (err instanceof multer.MulterError || err.message.includes('Invalid file type')) {
    return res.status(400).json({ 
      success: false, 
      message: err.message 
    });
  }

  // For everything else, keep it vague for security
  console.error(err); // Log the real error for you to see in terminal
  res.status(500).json({ 
    success: false, 
    message: "An internal server error occurred" 
  });
});


app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'World!' });
});


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});