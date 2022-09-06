import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usersRouter from "./src/routes/user.routes";
import routes from './src/routes'

const PORT = process.env.PORT || 4000;
const corsOptions = {
	origin: "http://localhost:3000",
};

const app = express();
app.use(cors(/*corsOptions*/));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.get("/", (req, res) => {
	res.json({ message: "Welcome to passit." });
});

routes.get('/',usersRouter)

app.get("/express_backend", (req, res) => {
	//Line 9
	res.send({
		express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT. GOOD FOR YOU!",
	}); //Line 10
}); //Line 11

app.listen(PORT, () => {
	console.log(`Application started on port ${PORT}!`);
});
