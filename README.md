# 📝 Todo App (Dockerized Node.js + MongoDB)

A simple Todo API built with **Node.js**, **Express**, and **MongoDB (via Mongoose)**.  
It allows users to **add**, **remove**, and **mark tasks as complete**.

This app is fully containerized using **Docker**, and includes testing with **Jest** and **Supertest**.

---

## 📁 Project Structure

```bash
.
├── app.js               # The main file
├── db.js
├── models
│   └── Task.js
├── public
│   └── index.html
├── tests
│   └── app.test.js
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Features

- Add new tasks
- Delete tasks
- Mark tasks as completed
- RESTful API structure
- Environment-based config using `dotenv`
- Unit & integration testing

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB + Mongoose
- **Testing**: Jest, Supertest
- **Environment Management**: dotenv
- **Containerization**: Docker

---

## 🐳 Docker Usage

### 1. Clone the Repository

```bash
git clone https://github.com/Ahmed-Elhgawy/dockerized-web-app.git
cd dockerized-web-app
```
### 2. Build The Docker Image
```bash
docker build -t todo-app:lts .
```
### 3. Run The Application Using Docker Compose
```bash
export IMAGE_NAME=todo-app:lts
export MONGO_USER=admin
export MONGO_PASS=admin_password
export MONGO_DB=app_db
docker compose up -d
```

---

## 🔬 Running Tests
You can run unit and integration tests locally:
```bash
npm install
npm test
```

---

## 📦 Environment Variables
### Application Environment Variables
| Variable Name | Description                                     |
| ------------- | ----------------------------------------------- |
| `MONGO_HOST`  | The IP address of the MongoDB Server            |
| `MONGO_DB`    | The Database Name that the application will use |
| `MONGO_USER`  | MongoDB username                                |
| `MONGO_PASS`  | MongoDB password                                |
### MongoDB Environment Variables
| Variable Name                | Description                                     |
| ---------------------------- | ----------------------------------------------- |
| `MONGO_INITDB_DATABASE`      | The Database Name that the application will use |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB username                                |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB password                                |

---

## 📸 API Endpoints (Sample)
| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/tasks`     | Get all tasks       |
| POST   | `/tasks`     | Add a new task      |
| PATCH  | `/tasks/:id` | Mark task completed |
| DELETE | `/tasks/:id` | Delete a task       |
 

---

## 🙌 Author

Ahmed Elhgawy – [GitHub](https://github.com/Ahmed-Elhgawy) | [LinkedIn](https://linkedin.com/in/ahmed-mahmoud-a16310268)
