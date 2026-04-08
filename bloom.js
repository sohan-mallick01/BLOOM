require("dotenv").config();

const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

const API_KEY = process.env.API_KEY;


app.get("/videos", async (req, res) => {
   
    try {
        const queries = [
            "desi comedy motivation",
            'motivating songs',
            "maa love",
            "sandeep maheshwari funny moments",
            "upsc motivation funny status",
            "IIT JEE attitude status",
            "student life funny motivation india",
            "stress relief motivations"
        ];

        const query = queries[Math.floor(Math.random() * queries.length)];

        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}&key=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        console.log("API RESPONSE:", data);

        //  ERROR CHECK
        if (data.error) {
            return res.status(500).json({
                error: data.error.message,
                full: data
            });
        }

        // EMPTY CHECK
        if (!data.items) {
            return res.status(500).json({
                error: "No items found",
                full: data
            });
        }

        const videos = data.items
            .filter(item => item.id && item.id.videoId) // 🔥 important fix
            .map(item => item.id.videoId);

        res.json(videos);

    } catch (err) {
    console.error("SERVER ERROR FULL:", err);
    
    res.status(500).json({
        error: err.message,
        stack: err.stack  
    });
}
});

app.listen(5000, () => {
    console.log("Bloom server running 👉 http://localhost:5000");
});
