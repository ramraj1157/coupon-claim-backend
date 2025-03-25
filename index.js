const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/index.js");

dotenv.config(); // ✅ Load environment variables first

const app = express();

// ✅ Apply CORS before routes
app.use(cors({
    origin: "https://round-robin-copon-claim.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

connectDB();

// Routes
const userRoutes = require("./routes/user.routes.js");
const claimRoutes = require("./routes/claim.routes.js");
const couponRoutes = require("./routes/coupon.routes.js");

app.use("/user", userRoutes);
app.use("/claim", claimRoutes);
app.use("/coupon", couponRoutes);

// ✅ Use PORT from env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
