const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// In-memory storage (temporary, lost on restart)
let students = [];

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// Home page - list students
app.get("/", (req, res) => {
  res.render("index", { students });
});

// Add student page
app.get("/add", (req, res) => {
  res.render("addStudent");
});

// Handle add student
app.post("/add", (req, res) => {
  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    subject: req.body.subject,
    marks: req.body.marks,
  };
  students.push(newStudent);
  res.redirect("/");
});

// Edit student page
app.get("/edit/:id", (req, res) => {
  const student = students.find((s) => s.id == req.params.id);
  res.render("editStudent", { student });
});

// Handle edit student
app.post("/edit/:id", (req, res) => {
  const index = students.findIndex((s) => s.id == req.params.id);
  students[index] = {
    id: students[index].id,
    name: req.body.name,
    subject: req.body.subject,
    marks: req.body.marks,
  };
  res.redirect("/");
});

// Delete student
app.post("/delete/:id", (req, res) => {
  students = students.filter((s) => s.id != req.params.id);
  res.redirect("/");
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));