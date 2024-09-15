import express from "express";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

// GET /items - Retrieve all items
app.get("/items", async (req, res) => {
  try {
    res.json(items);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// POST /items - Create a new item
app.post("/items", async (req, res) => {
  try {
    const newItem = req.body;
    newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// GET /items/:id - Retrieve a single item by ID
app.get("/items/:id", async (req, res) => {
  try {
    const item = items.find((i) => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send("Item not found.");
    res.json(item);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// PUT /items/:id - Update an item by ID
app.put("/items/:id", async (req, res) => {
  try {
    const item = items.find((i) => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send("Item not found.");

    item.name = req.body.name;
    res.json(item);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// DELETE /items/:id - Delete an item by ID
app.delete("/items/:id", async (req, res) => {
  try {
    const index = items.findIndex((i) => i.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send("Item not found.");

    const [deletedItem] = items.splice(index, 1);
    res.json(deletedItem);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
