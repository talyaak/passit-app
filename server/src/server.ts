import express from "express";
import { Request, Response } from "express";

const PORT = process.env.PORT || 4000;

const app = express();

// app.get("/", (req: Request, res: Response) => {
// 	res.send("Application worksss!");
// });

app.get('/express_backend', (req, res) => { //Line 9
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT. GOOD FOR YOU!' }); //Line 10
  }); //Line 11

app.listen(PORT, () => {
	console.log(`Application started on port ${PORT}!`);
});
