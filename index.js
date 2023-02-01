import "dotenv/config";
import Express from "express";
import http from "http";
import cors from "cors";
import ApiError from "./errors/ApiError.js";
import errorHandler from "./errors/ErrorHandler.js";
import Logger from "./middleware/logger/logger.js";

// Routes
import usersRoute from "./routes/users.js";
import balancesRoute from "./routes/balances.js";
import categoriesRoute from "./routes/categories.js";
import productsRoute from "./routes/products.js";
import transactionsRoute from "./routes/transactions.js";
import transactionProductsRoute from "./routes/transactionProducts.js";
import shopsRoute from "./routes/shops.js";

const app = Express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("Welcome to the API!!! (v1.0)");
});

app.use("/api/users/", usersRoute);
app.use("/api/balances/", balancesRoute);
app.use("/api/categories/", categoriesRoute);
app.use("/api/products/", productsRoute);
app.use("/api/transactions/", transactionsRoute);
app.use("/api/transactionproducts/", transactionProductsRoute);
app.use("/api/shops/", shopsRoute);

app.use((req, res, next) => {
  next(ApiError.notFound("Route not found"));
});

app.use(errorHandler);

server.listen(port, () => Logger.info(`Server is running on port ${port}`));
