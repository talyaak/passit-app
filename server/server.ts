import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./src/routes";
import path from "path";

const PORT = process.env.PORT || 4000;
// const corsOptions = {
// 	origin: "http://localhost:3000",
// };

const app = express();
app.use(cookieParser());
// app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/express_backend", (req, res) => {
	res.status(200).send({
		express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT. GOOD FOR YOU!",
	});
});

app.listen(PORT, () => {
	console.log(`Application started on port ${PORT}!`);
});
