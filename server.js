

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files (CSS)
app.use(express.static(path.join(__dirname, "public")));

// Test route
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/result", (req, res) => {
  const { plantName, leafColor, sunlight, water, stage } = req.body;

  let issue = "Healthy Plant 🌿";
  let reason = "The plant shows normal growth conditions.";
  let suggestion = "Continue regular care and monitoring.";

  // Nitrogen Deficiency
  if (leafColor === "yellow" && stage === "seedling") {
    issue = "Nitrogen Deficiency";
    reason = "Young plants require nitrogen for leaf and stem development.";
    suggestion = "Apply nitrogen-rich fertilizer and ensure proper soil nutrients.";
  }

  // Overwatering Stress
  else if (water === "high" && (leafColor === "yellow" || leafColor === "brown")) {
    issue = "Overwatering Stress";
    reason = "Excess water reduces oxygen availability to roots.";
    suggestion = "Reduce watering frequency and improve soil drainage.";
  }

  // Fungal Infection
  else if (leafColor === "brown" && water === "high") {
    issue = "Fungal Infection";
    reason = "High moisture creates favorable conditions for fungal growth.";
    suggestion = "Reduce moisture and apply organic fungicide if needed.";
  }

  // Poor Photosynthesis
  else if (sunlight === "low" && leafColor === "green") {
    issue = "Poor Photosynthesis";
    reason = "Insufficient sunlight limits photosynthesis efficiency.";
    suggestion = "Move the plant to a brighter location.";
  }

  res.render("result", {
    plantName,
    issue,
    reason,
    suggestion
  });
});

 
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
