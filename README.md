## Schedulr Backend (Express)

Lightweight hackathon-ready backend for class scheduling optimization.

### Run locally

```bash
npm install
npm run dev
# or
npm start
```

Environment variables (optional):

```
PORT=3000
JWT_SECRET=change-me
JWT_EXPIRES_IN=8h
```

### Auth

Login with:

POST /auth/login
```json
{ "email": "admin@example.com", "password": "admin123" }
```

Use returned token as `Authorization: Bearer <token>` for protected routes.

### Key Endpoints

- /users (admin): CRUD users
- /courses (admin): CRUD courses
- /classrooms (admin): CRUD classrooms
- /faculty (admin): manage availability and workload
- /timetable/generate (admin): generate choices
- /timetable/conflicts (admin): detect clashes and suggestions
- /timetable/choices (admin): list last generated choices
- /timetable/review (admin): approve a choice

### Scheduling logic

Greedy randomized scheduler that:
- avoids faculty, room and batch clashes
- respects faculty availability
- enforces max classes per day per batch
- handles lab multi-slot sessions
Generates multiple choices by varying PRNG seed.

### Demo dataset

Seeded in-memory data in `src/models/db.js`.

### Future extensions

- Replace in-memory with DB (PostgreSQL) and ORM (Prisma/TypeORM)
- Proper RBAC and refresh tokens
- Constraint weights and metaheuristics (GA/SA/ILP)
- Frontend (React) for timetable visualization and review



