# FILE: api-reference.md

# API Documentation

## Overview

The Alostaz platform provides a RESTful API built on top of Supabase. This document outlines the available endpoints, request/response formats, and authentication requirements.

## Base URL

```
https://[YOUR_SUPABASE_REF].supabase.co/rest/v1
```

## Authentication

All API requests require authentication using a JWT token in the `Authorization` header:

```
Authorization: Bearer YOUR_SUPABASE_JWT_TOKEN
```

## Endpoints

### Authentication

#### Login
```http
POST /auth/v1/token?grant_type=password
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Students

#### List Students
```http
GET /students?select=*,grades(*),tracks(*),groups(*)&order=created_at.desc
```

#### Get Student
```http
GET /students?id=eq.123e4567-e89b-12d3-a456-426614174000
```

#### Create Student
```http
POST /students
Content-Type: application/json

{
  "email": "student@example.com",
  "full_name": "Ahmed Mohamed",
  "grade_id": "123e4567-e89b-12d3-a456-426614174000",
  "track_id": "223e4567-e89b-12d3-a456-426614174000"
}
```

### Attendance

#### Record Attendance
```http
POST /attendance
Content-Type: application/json

{
  "student_id": "123e4567-e89b-12d3-a456-426614174000",
  "date": "2023-01-01",
  "status": "present",
  "notes": "On time"
}
```

#### Get Student Attendance
```http
GET /attendance?student_id=eq.123e4567-e89b-12d3-a456-426614174000&select=*,students(*)
```

### Payments

#### Create Payment
```http
POST /payments
Content-Type: application/json

{
  "student_id": "123e4567-e89b-12d3-a456-426614174000",
  "amount": 1000.00,
  "payment_date": "2023-01-01",
  "payment_type": "monthly",
  "month": 1,
  "year": 2023,
  "notes": "January monthly payment"
}
```

#### Get Student Payments
```http
GET /payments?student_id=eq.123e4567-e89b-12d3-a456-426614174000
```

## Error Handling

### Error Response Format
```json
{
  "code": "error_code",
  "message": "Human-readable error message",
  "hint": "Optional hint for debugging"
}
```

### Common Error Codes

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | invalid_request | Invalid request format |
| 401 | unauthorized | Authentication required |
| 403 | forbidden | Insufficient permissions |
| 404 | not_found | Resource not found |
| 422 | unprocessable_entity | Validation error |
| 500 | server_error | Internal server error |

## Rate Limiting

- 60 requests per minute per IP for unauthenticated requests
- 1000 requests per minute per user for authenticated requests
- 5000 requests per minute for admin users

## Webhooks

### Available Webhooks

1. `payment.received` - Triggered when a payment is received
2. `attendance.recorded` - Triggered when attendance is recorded
3. `student.created` - Triggered when a new student is created

### Webhook Payload Example
```json
{
  "event": "payment.received",
  "created_at": "2023-01-01T12:00:00Z",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "student_id": "223e4567-e89b-12d3-a456-426614174000",
    "amount": 1000.00,
    "payment_date": "2023-01-01"
  }
}
```

## Client Libraries

### JavaScript/TypeScript
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project-ref.supabase.co',
  'your-supabase-key'
)

// Example: Fetch students
const { data: students, error } = await supabase
  .from('students')
  .select('*, grades(*), tracks(*), groups(*)')
```

## Testing

API endpoints can be tested using the Supabase Dashboard's built-in API explorer or tools like Postman.
