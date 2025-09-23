# Backend Workflow Diagram (Mermaid)

```mermaid
flowchart TD
  A[Frontend (Browser/Client)] -->|HTTP request| B[Express App]

  subgraph M[Global Middleware]
    B --> C1[helmet]
    C1 --> C2[cors (origin: true, credentials: true)]
    C2 --> C3[express.json()]
    C3 --> C4[morgan('dev')]
  end

  C4 --> R{Route Matching}

  R -->|GET /health| H[Health Controller]
  H -->|res.json({ status: 'ok' })| RESP[HTTP Response]

  R -->|POST /auth/login| AUTH_ROUTE[/auth router/]
  AUTH_ROUTE --> LOGIN[Auth Controller.login]
  LOGIN -->|bcrypt.compareSync| DB1[(In-memory DB: users)]
  LOGIN -->|signToken (JWT)| JWT[JWT Signed]
  JWT --> RESP

  R -->|/users, /courses, /classrooms, /faculty, /timetable| PR[Protected Routers]

  subgraph A0[Auth Gate]
    PR --> A1[authMiddleware(requiredRoles=['admin'])]
    A1 -->|verify JWT + role| A2{Authorized?}
    A2 -- No --> ERR1[AppError('Unauthorized'/'Forbidden')]
    ERR1 --> EH[Global errorHandler]
    EH -->|res.status(code).json({ error })| RESP
  end

  A2 -- Yes --> CR{Controller}

  CR -->|Users CRUD| UCTRL[User Controller]
  UCTRL --> DB1
  UCTRL --> RESP

  CR -->|Courses CRUD| CCTRL[Course Controller]
  CCTRL --> DB2[(In-memory DB: courses)]
  CCTRL --> RESP

  CR -->|Classrooms CRUD| CLCTRL[Classroom Controller]
  CLCTRL --> DB3[(In-memory DB: classrooms)]
  CLCTRL --> RESP

  CR -->|Faculty CRUD| FCTRL[Faculty Controller]
  FCTRL --> DB4[(In-memory DB: faculty)]
  FCTRL --> RESP

  CR -->|Timetable| TTCTRL[Timetable Controller]
  TTCTRL --> SCHED[services/scheduler.generateTimetable]
  SCHED --> DB5[(In-memory DB: timetables)]
  TTCTRL --> RESP

  %% Errors anywhere in pipeline
  B -. throws/next(err) .-> EH
  CR -. throws/next(err) .-> EH
```

Notes
- Data is stored in-memory (`src/models/db.js`); restarts reset state.
- All endpoints are synchronous; no background jobs after response.
- Errors are centralized via `src/utils/errorHandler.js`.
- Auth uses JWT via `src/utils/auth.js`.



