# 🎯 GoalPocket API

🚀 **Deploy Link (Base URL):**
https://back-end-production-45f3.up.railway.app

---

## 📦 Fitur Utama

- ✅ Autentikasi (Register & Login)
- 👤 Manajemen Profil
- 💰 Manajemen Target Keuangan
- 📈 Tracking Income & Expense
- 📊 Ringkasan Finansial Otomatis

---

## 📌 Dokumentasi API

Semua endpoint diawali dengan:
https://back-end-production-45f3.up.railway.app/api

---

Gunakan `Bearer Token` dari endpoint **Login** untuk mengakses endpoint yang dilindungi.

##📌 Autentikasi & Pengguna

### 🔐 Register
URL: /api/auth/register

Method: POST

Headers:

Content-Type: application/json

Request Body:

```json
{
  "name": "example-kun",
  "email": "user@example.com",
  "password": "user123"
}
```
Response :
```json
{
    "message": "User registered",
    "user": {
        "id": "...",
        "name": "example-kun",
        "email": "user@example.com",
        "phoneNumber": null,
        "address": null,
        "country": null,
        "currentSaving": 0,
        "totalIncome": 0,
        "totalExpense": 0,
        "avgIncome": 0,
        "avgExpense": 0,
        "createdAt": "2025-05-28T20:09:45.355Z",
        "updatedAt": "2025-05-28T20:09:45.355Z"
    }
}
```

### 🔐 Login
URL: /api/auth/login

Method: POST

Headers:

Content-Type: application/json

Request Body:

```json
{
  "email": "user@example.com",
  "password": "user123"
}
```
Response :
```json
{
    "message": "Login successful",
    "user": {
        "id": "...",
        "name": "example-kun",
        "email": "user@example.com",
        "phoneNumber": null,
        "address": null,
        "country": null,
        "currentSaving": 0,
        "totalIncome": 0,
        "totalExpense": 0,
        "avgIncome": 0,
        "avgExpense": 0,
        "createdAt": "2025-05-28T20:09:45.355Z",
        "updatedAt": "2025-05-28T20:09:45.355Z"
    },
    "token": "..." // ini akan digunakan pada semua request http yg memiliki bearer token
}
```
### 👤 Get Profile
URL: /api/user/profile

Method: GET

Headers:

Authorization: Bearer <token>

Response :
```json
{
    "id": "...",
    "name": "example-kun",
    "email": "user@example.com",
    "phoneNumber": null,
    "address": null,
    "country": null,
    "currentSaving": 0,
    "totalIncome": 0,
    "totalExpense": 0,
    "avgIncome": 0,
    "avgExpense": 0,
    "createdAt": "2025-05-28T20:09:45.355Z",
    "updatedAt": "2025-05-28T20:09:45.355Z"
}
```

### ✏️ Update Profile
URL: /api/user/profile

Method: PUT

Headers:

Content-Type: application/json
Authorization: Bearer <token>

Request Body:
```json
{
  "name": "example-kun yang baru",
  "phoneNumber": "08123456789",
  "address": "Semarang",
  "country": "Indonesia"
}
```
Response:
```json
{
    "message": "Profile updated",
    "user": {
        "id": "...",
        "name": "example-kun yang baru",
        "email": "user@example.com",
        "phoneNumber": "08123456789",
        "address": "Semarang",
        "country": "Indonesia",
        "updatedAt": "2025-05-28T20:12:46.254Z"
    }
}
```

### 🔑 Change Password
URL: /api/user/change-password

Method: PUT

Headers:

Content-Type: application/json
Authorization: Bearer <token>

Request Body:
```json
{
  "oldPassword": "user123",
  "newPassword": "user1234"
}
```
Response:
```json
{
    "message": "Password changed successfully"
}
```
### 🎯 Target
➕ Create Target
URL: /api/targets

Method: POST

Headers:

Content-Type: application/json
Authorization: Bearer <token>

Request Body:
```json
{
  "name": "Ikut Seminar di Luar negeri",
  "duration": "6 bulan",
  "initialSaving": 2000000,
  "incomeFrequency": "monthly",
  "fixedIncome": 500000,
  "isCompleted": false,
  "targetAmount": 8000000
}
```
Response:
```json
{
    "id": "...",
    "userId": "...",
    "name": "Ikut Seminar di Luar negeri",
    "targetAmount": 8000000,
    "duration": "6 bulan",
    "initialSaving": 2000000,
    "incomeFrequency": "monthly",
    "fixedIncome": 500000,
    "isCompleted": false,
    "createdAt": "2025-05-28T20:17:13.753Z",
    "updatedAt": "2025-05-28T20:17:13.753Z"
}
```

### 📑 Get All Targets

URL: /api/targets

Method: GET

Headers:

Authorization: Bearer <token>

Response:
```json
[
    {
        "id": "...",
        "userId": "...",
        "name": "Ikut Seminar di Luar negeri",
        "targetAmount": 8000000,
        "duration": "6 bulan",
        "initialSaving": 2000000,
        "incomeFrequency": "monthly",
        "fixedIncome": 500000,
        "isCompleted": false,
        "createdAt": "2025-05-28T20:17:13.753Z",
        "updatedAt": "2025-05-28T20:17:13.753Z"
    }
]
```

### 🛠️ Update Target
URL: /api/targets/:id

Method: GET

Headers:

Content-Type: application/json
Authorization: Bearer <token>

Request Body:
```json
{
  "name": "Seminar ke jepang",
  "duration": "2 bulan",
  "initialSaving": 1000000,
  "incomeFrequency": "monthly",
  "fixedIncome": 3000000,
  "targetAmount": 25000000
}
```
Response:
```json
{
    "id": "...",
    "userId": "...",
    "name": "Seminar ke jepang",
    "targetAmount": 25000000,
    "duration": "2 bulan",
    "initialSaving": 1000000,
    "incomeFrequency": "monthly",
    "fixedIncome": 3000000,
    "isCompleted": false,
    "createdAt": "2025-05-28T20:33:21.480Z",
    "updatedAt": "2025-05-28T20:34:48.987Z"
}
```

## 💰 Tracking
### ➕ Create Tracking
URL: /api/trackings

Method: POST

Headers:

Content-Type: application/json
Authorization: Bearer <token>

Request Body:
```json
{
  "targetName": "Ikut Seminar di Luar negeri", //wajib sama
  "type": "income", //income or expense
  "category": "sangu",
  "amount": 500000,
  "notes": "THR bulanan"
}
```
Response:
```json
{
    "id": "...",
    "userId": "...",
    "targetId": "...",
    "type": "income",
    "category": "sangu",
    "amount": 500000,
    "notes": "THR bulanan",
    "createdAt": "2025-05-28T20:22:16.282Z"
}
```


### 📋 Get All Trackings (gunakan ini juga untuk Get History)
URL: /api/trackings

Method: GET

Headers:

Authorization: Bearer <token>

Response:
```json
[
    {
        "id": "...",
        "userId": "...",
        "targetId": "...",
        "type": "expense",
        "category": "jajan",
        "amount": 150000,
        "notes": "beli ramen dan sushi",
        "createdAt": "2025-05-28T20:24:50.809Z"
    },
    {
        "id": "...",
        "userId": "...",
        "targetId": "...",
        "type": "income",
        "category": "sangu",
        "amount": 500000,
        "notes": "THR bulanan",
        "createdAt": "2025-05-28T20:22:16.282Z"
    }
]
```
### 📊 Get Summary
URL: /api/user/summary

Method: GET

Headers:

Authorization: Bearer <token>

Response:
```json
{
    "currentSaving": 350000,
    "totalIncome": 500000,
    "totalExpense": 150000,
    "avgIncome": 500000,
    "avgExpense": 150000
}
```
### ✅ Mark Target is Complete
URL: /api/targets/:id/complete

Method: POST

Headers:

Authorization: Bearer <token>

Response:
```json
{
    "id": "84adfbd0-1b11-48cb-813e-fe76beb5b900",
    "userId": "ae9b7b68-3bc1-43bd-bb09-ebff4d91ca35",
    "name": "Seminar ke jepang",
    "targetAmount": 25000000,
    "duration": "2 bulan",
    "initialSaving": 1000000,
    "incomeFrequency": "monthly",
    "fixedIncome": 3000000,
    "isCompleted": true,
    "createdAt": "2025-05-28T20:33:21.480Z",
    "updatedAt": "2025-05-28T20:38:46.510Z"
}
```

### ❌ Delete Target
URL: /api/targets/:id

Method: DELETE

Headers:

Authorization: Bearer <token>

Response:
```json
{
    "message": "Target deleted successfully"
}
```
