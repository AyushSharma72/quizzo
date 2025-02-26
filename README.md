# Quizo - Quiz Management System

Quizo is a **Quiz Management System** where teachers can create, manage, and view quizzes. The application consists of a **React frontend** and a **TypeScript backend**, with a **SQL database** (MySQL/PostgreSQL) handling quiz data and user authentication.

## Tech Stack

### Frontend:

- React.js
- ShadCN UI Components
- Tailwind CSS

### Backend:

- Node.js with Express.js
- TypeScript
- MySQL/PostgreSQL

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (Latest LTS)
- npm or yarn
- MySQL/PostgreSQL database setup

### Installation

Clone the repository:

```sh
git clone https://github.com/AyushSharma72/quizzo.git
cd quizo
```

#### Backend Setup

```sh
cd server
npm install
```

Create a `.env` file in the `server` folder with database credentials:

```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=databse name
PORT=5001
DB_PORT=8000
```

Run the backend:

```sh
npm run dev
```

#### Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

### Running the Application

Start both frontend and backend in separate terminals:

```sh
cd server && npm run dev
cd frontend && npm run dev
```

The frontend should be accessible at `http://localhost:5173` (default Vite port) and backend at `${import.meta.env.VITE_API_BASE_URL}`.


demo credentials for login 
username:AyushSharma
password:Ayush@1234