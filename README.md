# Recipe App 🍳

A modern, full-stack AI-powered recipe application that helps you discover, generate, and save recipes based on your available ingredients.

## Features

- **AI Recipe Generation:**  
  Enter your ingredients and get unique, AI-generated recipes tailored to what you have at home.

- **Save & Manage Recipes:**  
  Save your favorite recipes, view them in a beautiful grid, and manage your personal recipe collection.

- **Responsive UI:**  
  Fully responsive, Windows 11-inspired glassmorphism design for a seamless experience on desktop and mobile.

- **Authentication:**  
  Secure user registration and login with JWT-based authentication.

- **Ingredient Quick-Add:**  
  Easily add common ingredients with a single click using ingredient chips.

- **Fullscreen Recipe View:**  
  View any recipe in a fullscreen, scrollable modal with a back button for easy navigation.

## Technologies Used

- **Frontend:**  
  - [React](https://react.dev/) (with Vite)
  - [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
  - [React Icons](https://react-icons.github.io/react-icons/) for beautiful icons

- **Backend:**  
  - [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) REST API
  - [OpenAI API](https://openai.com/) (or similar) for AI recipe generation

- **Authentication:**  
  - JWT (JSON Web Tokens)
  - Secure password storage

- **Deployment:**  
  - [Vercel](https://vercel.com/) for both frontend and backend (see `vercel.json`)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/recipe-app.git
   cd recipe-app
   ```

2. **Install dependencies:**
   - For the frontend:
     ```bash
     cd client
     npm install
     ```
   - For the backend:
     ```bash
     cd ../server
     npm install
     ```

3. **Environment Variables:**
   - In `/client/.env`:
     ```
     VITE_API_URL=http://localhost:5000
     ```
   - In `/server/.env` (example):
     ```
     OPENAI_API_KEY=your_openai_key
     JWT_SECRET=your_jwt_secret
     MONGODB_URI=your_mongodb_uri
     ```

4. **Run locally:**
   - Backend:  
     ```bash
     cd server
     npm start
     ```
   - Frontend:  
     ```bash
     cd client
     npm run dev
     ```

5. **Deploy:**  
   - Configure your environment variables on Vercel for both frontend and backend.
   - Push to your Vercel-connected Git repository.

## Project Structure

```
/client   # React + Vite frontend
/server   # Node.js + Express backend
/vercel.json
```

## AI Features

- Uses OpenAI (or similar) to generate creative, step-by-step recipes from a list of ingredients.
- Fun cooking tips and suggestions are also AI-generated.

## License

MIT

---

**Enjoy cooking with AI!**
