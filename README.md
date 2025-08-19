
# Happiness Co. Employee Managment System API

A **NestJS**, **Prisma**, and **PostgreSQL** backend for managing an employee management system.  
Features include CRUD operations, search, pagination, and Swagger API documentation.

---

## ✅ Features
- Built with **NestJS (TypeScript)** and **Prisma ORM**
- **PostgreSQL** database for persistence
- **CRUD endpoints** for employees:
  - Create, Read, Update, Delete
- **Pagination, Search, Filters**
- **Swagger API Docs** at `/api-docs`
- **Seeding** using [randomuser.me](https://randomuser.me)
- **Validation** with `class-validator`

---

## ✅ Prerequisites
Before running the project, make sure you have:

- **Node.js** (>= 18)
- **npm** (>= 9)
- **PostgreSQL** installed and running  
  - You can use **pgAdmin** or **Docker** to manage PostgreSQL
- **.env file** with a valid `DATABASE_URL` connection string, for example:
  ```env
  DATABASE_URL="postgresql://username:password@localhost:5432/employeedb"
  ```

---

## ✅ Tech Stack
- **NestJS**: Backend framework
- **Prisma**: ORM for PostgreSQL
- **Swagger**: API documentation
- **Axios**: For seeding data from randomuser.me

---

## ✅ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/alihammoud17/employees-project-nestjs.git
cd employees-project-nestjs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file in the project root, where `employeedb` is the database name you're using:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/employeedb"
```

---

## ✅ Database Setup

### 4. Generate Prisma Client
```bash
npx prisma generate
```

### 5. Run Database Migration
```bash
npx prisma migrate dev --name init
```

---

## ✅ Seed the Database
We use [randomuser.me](https://randomuser.me) to generate fake employee data.

Run the seed script:
```bash
npm run seed
```

If you don’t have the script yet, add this to `package.json`:
```json
"scripts": {
  "seed": "ts-node --require tsconfig-paths/register seed.ts"
}
```

Make sure **`ts-node`** is installed:
```bash
npm install --save-dev ts-node
```

---

## ✅ Running the Application
Start the NestJS server:
```bash
npm run start:dev
```

By default, the app runs at:
```
http://localhost:3000
```

---

## ✅ API Documentation (Swagger)
Swagger UI is available at:
```
http://localhost:3000/api-docs
```

### Example Endpoints:
- `GET /employees?page=1&limit=10` --> Paginated list of employees
- `GET /employees/:id` --> Get a single employee
- `POST /employees` --> Create a new employee
- `PUT /employees/:id` --> Update employee
- `DELETE /employees/:id` --> Delete employee

---

## ✅ Testing the API
1. Open **Swagger UI** at `/api-docs`
2. Use the interactive docs to:
   - Test **CRUD operations**
   - Pass query params for **pagination**, **search**, and **filters**
3. Example search query:
```
GET /employees?search=john&department=Engineering&page=1&limit=5
```

---

## ✅ Project Structure
```
src/
 ├── employees/
 │    ├── employees.controller.ts    
 │    ├── employees.service.ts  
 │    ├── employees.module.ts       
 │    └── dto/
 │        ├── create-employee.dto.ts
 │        ├── filter-employee.dto.ts
 │        └── update-employee.dto.ts
 ├── positions/
 │    ├── positions.controller.ts    
 │    ├── positions.service.ts  
 │    └── positions.module.ts   
 ├── departments/
 │    ├── departments.controller.ts    
 │    ├── departments.service.ts  
 │    └── departments.module.ts   
 ├── prisma/   
 │   └── prisma.service.ts           
 ├── app.module.ts                    
 └── main.ts                          
```

---

## ✅ Future Improvements
- Ability to upload images, and save them on a Cloud Storage Service (ex. AWS S3)
- Add **JWT authentication**
- Add **unit/integration tests** (Jest)
- Dockerize the app

---

## ✅ Credits
- [NestJS](https://nestjs.com)
- [Prisma](https://www.prisma.io)
- [randomuser.me](https://randomuser.me) for mock data

---

### ✅ Quick Start Commands
```bash
git clone https://github.com/alihammoud17/employees-project-nestjs.git
cd employees-project-nestjs
npm install
# Create .env and configure DB
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run start:dev
# Open http://localhost:3000/api-docs
```
