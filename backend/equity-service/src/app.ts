import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import stocksRoutes from "./routes/stocks.routes";
import holdingsRoutes from "./routes/holdings.routes";
import transactionsRoutes from "./routes/transactions.routes";
import ordersRoutes from "./routes/orders.routes";
import portfolioRoutes from "./routes/portfolio.routes";
import dividendsRoutes from "./routes/dividends.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/stocks", stocksRoutes);
app.use("/api/holdings",holdingsRoutes);
app.use("/api/transactions",transactionsRoutes);
app.use("/api/orders",ordersRoutes);
app.use("/api/portfolio-snapshots",portfolioRoutes);
app.use("/api/dividends",dividendsRoutes);
export default app;