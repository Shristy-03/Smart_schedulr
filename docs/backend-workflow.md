  # Backend Workflow Documentation

## Overview
This document outlines the complete workflow of the Class Scheduler backend system after receiving data from the frontend. The system follows a layered architecture pattern with clear separation of concerns.

## Architecture Overview

```
Frontend Request → Routes → Controllers → Services/Models → Database → Response
```

## System Components

### 1. Entry Point (`src/index.js`)
- **Purpose**: Application bootstrap and server startup
- **Workflow**:
  1. Loads environment variables using dotenv
  2. Imports the Express app from `server.js`
  3. Starts the server on specified PORT (default: 3000)
  4. Logs server startup confirmation

### 2. Server Configuration (`src/server.js`)
- **Purpose**: Express application setup and middleware configuration
- **Workflow**:
  1. **Middleware Setup**:
     - `helmet`: Security headers (CSP disabled for development)
     - `cors`: Cross-origin resource sharing (allows all origins in dev)
     - `express.json()`: Parse JSON request bodies
     - `morgan`: HTTP request logging
  2. **Route Registration**:
     - `/health`: Health check endpoint
     - `/auth`: Authentication routes
     - `/users`: User management routes
     - `/courses`: Course management routes
     - `/classrooms`: Classroom management routes
     - `/faculty`: Faculty management routes
     - `/timetable`: Timetable generation routes
  3. **Error Handling**: Global error handler middleware

## API Workflows

### Authentication Workflow

#### Login Process (`/auth/login`)
```
Frontend Request → Route Handler → Auth Controller → Database → JWT Generation → Response
```

**Detailed Steps**:
1. **Route**: `POST /auth/login` → `src/routes/auth.js`
2. **Controller**: `src/controllers/authController.js`
   - Extracts `email` and `password` from request body
   - Searches for user in database by email
   - Validates credentials using bcrypt comparison
   - Generates JWT token with user information
   - Returns token and sanitized user data
3. **Error Handling**: Invalid credentials return 401 status

**Response Format**:
```json
{
  "token": "jwt_token_string",
  "user": {
    "id": "user_id",
    "role": "admin|faculty|student",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### User Management Workflow

#### User CRUD Operations (`/users/*`)
```
Frontend Request → Auth Middleware → Route Handler → Controller → Database → Response
```

**Authentication Middleware**:
1. **JWT Verification**: Extracts Bearer token from Authorization header
2. **Role Authorization**: Ensures user has 'admin' role
3. **Request Enhancement**: Adds `req.user` with decoded token data

**Operations**:
- `GET /users`: List all users (password hashes redacted)
- `POST /users`: Create new user with hashed password
- `GET /users/:id`: Get specific user details
- `PUT /users/:id`: Update user information
- `DELETE /users/:id`: Remove user from system

### Course Management Workflow

#### Course CRUD Operations (`/courses/*`)
```
Frontend Request → Auth Middleware → Route Handler → Controller → Database → Response
```

**Course Data Structure**:
```javascript
{
  id: "uuid",
  code: "CSE101",
  name: "Data Structures",
  department: "CSE",
  semester: 3,
  weeklyClasses: 3,
  type: "theory|lab",
  batch: "CSE-3A",
  durationSlots: 2 // for lab courses
}
```

### Timetable Generation Workflow

#### Timetable Generation (`/timetable/generate`)
```
Frontend Request → Auth Middleware → Route Handler → Scheduler Service → Database → Response
```

**Detailed Process**:
1. **Route**: `POST /timetable/generate` → `src/routes/timetable.js`
2. **Authentication**: Admin role required
3. **Controller**: `src/controllers/timetableController.js`
   - Extracts `choices` parameter (default: 3)
   - Calls scheduler service to generate multiple timetable options
   - Stores generated timetables in database
   - Returns array of timetable choices

4. **Scheduler Service**: `src/services/scheduler.js`
   - **Algorithm**: Greedy scheduling with randomization
   - **Process**:
     ```
     For each requested choice:
     1. Initialize random number generator with seed
     2. Create faculty availability maps
     3. Shuffle classroom and course arrays
     4. Sort courses (labs prioritized)
     5. For each course:
        - Determine weekly class requirements
        - Find assigned faculty
        - Place sessions using greedy algorithm:
          * Random day selection from working days
          * Random slot selection considering duration
          * Check faculty availability
          * Check classroom availability
          * Check batch daily limits
          * Assign if all constraints satisfied
     ```

**Constraints Applied**:
- Faculty availability (working days and time slots)
- Classroom capacity and type matching
- Batch daily class limits
- Course duration requirements
- No double-booking conflicts

#### Conflict Detection (`/timetable/conflicts`)
```
Frontend Request → Controller → Scheduler Service → Conflict Analysis → Response
```

**Process**:
1. Receives timetable data
2. Analyzes for conflicts:
   - Faculty double-booking
   - Classroom double-booking
   - Batch double-booking
3. Generates rearrangement suggestions
4. Returns conflict details and resolution options

#### Timetable Review (`/timetable/review`)
```
Frontend Request → Controller → Database Update → Response
```

**Process**:
1. Receives approved timetable ID
2. Finds corresponding timetable in generated options
3. Updates database to store only approved timetable
4. Returns confirmation

## Database Layer

### In-Memory Database Structure (`src/models/db.js`)
```javascript
{
  users: [],           // User accounts with roles
  courses: [],         // Course definitions
  faculty: [],         // Faculty availability and constraints
  classrooms: [],      // Classroom resources
  assignments: [],     // Course-faculty mappings
  constraints: {},     // System-wide scheduling constraints
  timetables: []       // Generated timetable options
}
```

### Data Relationships:
- **Users ↔ Faculty**: Linked by email address
- **Courses ↔ Faculty**: Mapped through assignments table
- **Timetables ↔ All Entities**: References courses, faculty, classrooms, and batches

## Error Handling Workflow

### Global Error Handler (`src/utils/errorHandler.js`)
```
Controller Error → Error Handler → Logging → Formatted Response
```

**Process**:
1. **Custom Errors**: `AppError` class with status codes
2. **Error Logging**: Console logging (disabled in test environment)
3. **Response Format**: Standardized error response
4. **Status Codes**: Appropriate HTTP status codes

**Error Response Format**:
```json
{
  "error": "Error message description"
}
```

## Security Workflow

### JWT Authentication (`src/utils/auth.js`)
```
Request → Token Extraction → JWT Verification → Role Authorization → Request Enhancement
```

**Process**:
1. **Token Extraction**: Bearer token from Authorization header
2. **JWT Verification**: Signature and expiration validation
3. **Role Authorization**: Role-based access control
4. **Request Enhancement**: Adds user data to request object

## Request/Response Flow Examples

### Successful Login Flow
```
1. Frontend sends: POST /auth/login { email, password }
2. Backend validates credentials
3. Backend generates JWT token
4. Backend responds: { token, user }
5. Frontend stores token for subsequent requests
```

### Timetable Generation Flow
```
1. Frontend sends: POST /timetable/generate { choices: 3 }
2. Backend verifies admin authentication
3. Backend generates 3 timetable options
4. Backend stores timetables in database
5. Backend responds: { choices: [timetable1, timetable2, timetable3] }
6. Frontend displays options for review
```

### Conflict Resolution Flow
```
1. Frontend sends: POST /timetable/conflicts { timetable }
2. Backend analyzes timetable for conflicts
3. Backend generates resolution suggestions
4. Backend responds: { conflicts, suggestions }
5. Frontend displays conflicts and options
```

## Performance Considerations

### Optimization Strategies:
1. **Greedy Algorithm**: Fast timetable generation
2. **In-Memory Database**: Quick data access for prototype
3. **Randomization**: Multiple valid solutions
4. **Constraint Checking**: Efficient conflict detection

### Scalability Notes:
- Current implementation uses in-memory storage
- Production deployment would require persistent database
- Algorithm complexity scales with course and faculty count

## API Endpoints Summary

| Method | Endpoint | Auth Required | Role | Purpose |
|--------|----------|---------------|------|---------|
| POST | `/auth/login` | No | - | User authentication |
| GET | `/users` | Yes | Admin | List all users |
| POST | `/users` | Yes | Admin | Create user |
| GET | `/users/:id` | Yes | Admin | Get user details |
| PUT | `/users/:id` | Yes | Admin | Update user |
| DELETE | `/users/:id` | Yes | Admin | Delete user |
| GET | `/courses` | Yes | Admin | List courses |
| POST | `/courses` | Yes | Admin | Create course |
| GET | `/courses/:id` | Yes | Admin | Get course details |
| PUT | `/courses/:id` | Yes | Admin | Update course |
| DELETE | `/courses/:id` | Yes | Admin | Delete course |
| POST | `/timetable/generate` | Yes | Admin | Generate timetable options |
| POST | `/timetable/conflicts` | Yes | Admin | Analyze conflicts |
| GET | `/timetable/choices` | Yes | Admin | Get generated options |
| POST | `/timetable/review` | Yes | Admin | Approve timetable |
| GET | `/health` | No | - | Health check |

This workflow documentation provides a comprehensive understanding of how the backend processes requests from the frontend and manages the class scheduling system.


