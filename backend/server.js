require('dotenv').config();
const dns = require("dns");

dns.setServers([
    "1.1.1.1",
    "1.0.0.1"
]);
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./libs/Db");
const authRoute = require("./routes/authRoute");
const testRoute = require("./routes/testRoute");
const submitRoute = require("./routes/submitRoute");
const jwt = require("jsonwebtoken");
const isLoggedIn = require('./services/authService');
const UserModel = require('./Models/UserModel');
const quizModel = require('./Models/quizModel');

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api", testRoute);
app.use("/api/quiz" , submitRoute); 

app.get("/api/auth/me" , isLoggedIn ,  async(req ,res) => {
      try{
        const user = await UserModel.findById(req.user.id).select("-password");
         
        res.json(user);

      }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
      }
});

app.get("/api/quiz/all" , isLoggedIn , async(req , res) => {
    try{
       const quizzes = await quizModel
    .find({ userId: req.user.id })
    .select("topic difficulty numberOfQuestions createdAt")
    
        
    res.json(quizzes);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }

});
app.get("/api/quiz/information/:id", isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;

        const quizData = await quizModel.findById(id);

        if (!quizData) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        return res.status(200).json({
            quiz: quizData
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});




// Start the server after connecting to the database
connectDb(process.env.MONGO_URL)
    .then(() => {
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.log(err);
    });