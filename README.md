# 🧠 Feedback Management System

A role-based feedback platform where **Managers** can give feedback to **Employees**, and employees can view and acknowledge feedback.

---

## 🔧 Tech Stack

| Layer        | Tech                              |
|--------------|-----------------------------------|
| Frontend     | React (with Axios & Tailwind/CSS) |
| Backend      | FastAPI                           |
| Database     | Supabase (PostgreSQL)             |

---

## 🚀 Features

### 🧑‍💼 Manager
- Signup / Login
- View assigned employees
- Give feedback (with strengths, improvements, sentiment)
- View feedback history and edit existing feedback

### 👩‍💼 Employee
- Signup / Login
- View received feedbacks
- Acknowledge feedbacks

---

## 📁 Project Structure
```bash
feedback-system/
├── backend/
│ ├── main.py
│ ├── config.py
│ └── routes/
│ ├── manager.py
│ ├── employee.py
│ └── feedback.py
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── HomePage.jsx
│ │ │ ├── ManagerLogin.jsx
│ │ │ ├── ManagerSignup.jsx
│ │ │ ├── ManagerDashboard.jsx
│ │ │ ├── EmployeeLogin.jsx
│ │ │ ├── EmployeeSignup.jsx
│ │ │ └── EmployeeDashboard.jsx
│ │ └── App.js
│ └── public/
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. 🔌 Backend (FastAPI)

```bash
cd backend
pip install fastapi uvicorn httpx python-dotenv

# Set your Supabase keys in .env
touch .env
SUPABASE_URL = "https://jxjcjmarroyvxnfafxiq.supabase.co"
SUPABASE_API_KEY = "***********.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4amNqbWFycm95dnhuZmFmeGlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMDA5MzcsImV4cCI6MjA2NTg3NjkzN30.********"

# Run the backend:
python -m uvicorn main:app --reload
```
### 2. 🌐 Frontend (React)
```bash
cd frontend
npm install
npm start
```
### Supabase Tables
``` bash
1. manager
CREATE TABLE manager (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  email TEXT UNIQUE,
  password TEXT
);
2. employee
CREATE TABLE employee (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  manager_id UUID REFERENCES manager(id)
);
3. feedback
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_manager UUID REFERENCES manager(id),
  to_employee UUID REFERENCES employee(id),
  strengths TEXT,
  improvements TEXT,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  acknowledge BOOLEAN DEFAULT FALSE
);
```
![Alt text](https://github.com/vik802207/DpDZero-Feedback/blob/main/img/Screenshot%20(522).png?raw=true)
![Alt text](https://github.com/vik802207/DpDZero-Feedback/blob/main/img/Screenshot%20(523).png?raw=true)
![Alt text](https://github.com/vik802207/DpDZero-Feedback/blob/main/img/Screenshot%20(524).png?raw=true)
![Alt text](https://github.com/vik802207/DpDZero-Feedback/blob/main/img/Screenshot%20(525).png?raw=true)
![Alt text](https://github.com/vik802207/DpDZero-Feedback/blob/main/img/Screenshot%20(526).png?raw=true)
![Alt text](https://github.com/vik802207/DpDZero-Feedback/blob/main/img/Screenshot%20(527).png?raw=true)
![Alt text](https://github.com/vik802207/DpDZero-Feedback/blob/main/img/Screenshot%20(528).png?raw=true)
![Alt text](https://github.com/vik802207/DpDZero-Feedback/blob/main/img/Screenshot%20(522).png?raw=true)
![Alt text](https://github.com/vik802207/DpDZero-Feedback/blob/main/img/Screenshot%20(530).png?raw=true)


## 🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

## 📜 License
This project is licensed under the MIT License.
## 🔗 Live Demo
👉 ChatGPT Clone Live
## [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://dpdzeroassignment.vercel.app/)

## 👨‍💻 Author
Developed by Vikash Gupta
📧 Contact: vikashg802207@gmail.com


