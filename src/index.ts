import express from "express";
import bookRoutes from "./routes/bookRoutes";
import memberRoutes from "./routes/memberRoutes";
import borrowingRoutes from "./routes/borrowingRoutes";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// API Routes
app.use("/books", bookRoutes);
app.use("/members", memberRoutes);
app.use("/borrowings", borrowingRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
