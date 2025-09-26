const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for demo
let users = [
  { id: 1, email: 'demo@example.com', password: 'password123', name: 'Demo User' }
];

let todos = [
  { id: 1, title: 'Learn AI Test Automation', completed: false, userId: 1 },
  { id: 2, title: 'Build awesome tests', completed: true, userId: 1 },
  { id: 3, title: 'Deploy to production', completed: false, userId: 1 }
];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login API
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
      token: 'demo-token-' + user.id
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
});

// Register API
app.post('/api/register', (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: 'Email, password, and name are required'
    });
  }
  
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }
  
  const newUser = {
    id: users.length + 1,
    email,
    password,
    name
  };
  
  users.push(newUser);
  
  res.json({
    success: true,
    user: { id: newUser.id, email: newUser.email, name: newUser.name },
    token: 'demo-token-' + newUser.id
  });
});

// Password Reset API
app.post('/api/reset-password', (req, res) => {
  const { email } = req.body;
  
  const user = users.find(u => u.email === email);
  
  if (user) {
    res.json({
      success: true,
      message: 'Password reset email sent to ' + email
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
});

// Todos API
app.get('/api/todos', (req, res) => {
  const userId = req.headers['user-id'] || 1; // Default to demo user
  const userTodos = todos.filter(t => t.userId == userId);
  res.json(userTodos);
});

app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  const userId = req.headers['user-id'] || 1;
  
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }
  
  const newTodo = {
    id: todos.length + 1,
    title,
    completed: false,
    userId
  };
  
  todos.push(newTodo);
  res.json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  
  const todo = todos.find(t => t.id == id);
  if (!todo) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(t => t.id == id);
  
  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  todos.splice(todoIndex, 1);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Demo app is running',
    users: users.length,
    todos: todos.length
  });
});

app.listen(PORT, () => {
  console.log(`🎯 Demo app running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
