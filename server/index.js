const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let challenges = [
  {
    id: 1,
    placement: 1,
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // example preview
    records: "00:30",
    creator: "Blue",
    verifier: "Green",
    publisher: "Red",
    victors: "Blue, Green"
  }
];

// List all challenges
app.get("/challenges", (req, res) => {
  res.json(challenges);
});

// Add a challenge
app.post("/challenges", (req, res) => {
  const { id, placement, video, records, creator, verifier, publisher, victors } = req.body;
  const newChallenge = { id, placement, video, records, creator, verifier, publisher, victors };
  challenges.push(newChallenge);
  res.status(201).json(newChallenge);
});

app.get("/", (req, res) => {
  res.send("Silly Challenge List server online!");
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
