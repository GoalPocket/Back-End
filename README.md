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
```
Content-Type: application/json
```

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
```
Content-Type: application/json
```

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
    },
    "token": "..." // ini akan digunakan pada semua request http yg memiliki bearer token
}
```
### 👤 Get Profile
URL: /api/user/profile

Method: GET

Headers:
```
Authorization: Bearer <token>
```

Response :
```json
{
    "id": "...",
    "name": "John Doe Updated",
    "email": "john123@example.com",
    "phoneNumber": "08123456789",
    "address": "Jakarta",
    "country": "Indonesia",
    "createdAt": "2025-05-26T22:35:53.997Z",
    "updatedAt": "2025-05-26T23:23:52.794Z",
    "currentSaving": 1500000, // ini hanya muncul ketika sudah pernah menambahkan tracking
    "totalIncome": 2000000, // ini hanya muncul ketika sudah pernah menambahkan tracking
    "totalExpense": 500000, // ini hanya muncul ketika sudah pernah menambahkan tracking
    "avgIncome": 2000000, // ini hanya muncul ketika sudah pernah menambahkan tracking
    "avgExpense": 500000 // ini hanya muncul ketika sudah pernah menambahkan tracking
}
```

### ✏️ Update Profile
URL: /api/user/profile

Method: PUT

Headers:
```
Content-Type: application/json
Authorization: Bearer <token>
```

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
```
Content-Type: application/json
Authorization: Bearer <token>
```

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
```
Content-Type: application/json
Authorization: Bearer <token>
```
Request Body:
```json
{
  "name": "kencan akhir bulan july",
  "duration": "4 bulan",
  "initialSaving": 400000,
  "incomeFrequency": "daily",
  "fixedIncome": 500000,
  "fixedOutcome": 200000,
  "isCompleted": false,
  "targetAmount": 1400000
}

```
Response:
```json
{
    "id": "...",
    "userId": "...",
    "name": "kencan akhir bulan july",
    "targetAmount": 1400000,
    "duration": "4 bulan",
    "initialSaving": 400000,
    "incomeFrequency": "daily",
    "fixedIncome": 500000,
    "fixedOutcome": 200000,
    "isCompleted": false,
    "createdAt": "2025-05-31T13:04:36.961Z",
    "updatedAt": "2025-05-31T13:04:36.961Z"
}
```

### 📑 Get All Targets

URL: /api/targets

Method: GET

Headers:
```
Authorization: Bearer <token>
```

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
```
Content-Type: application/json
Authorization: Bearer <token>
```

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
```
Content-Type: application/json
Authorization: Bearer <token>
```

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
```
Authorization: Bearer <token>
```

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
```
Authorization: Bearer <token>
```

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
```
Authorization: Bearer <token>
```

Response:
```json
{
    "message": "Target deleted successfully"
}
```

======================================================================================

# 🧠 GoalPocket Backend – ML Saldo Prediction Integration

Repositori ini adalah backend utama GoalPocket, terintegrasi dengan ML API untuk memprediksi saldo masa depan pengguna berdasarkan histori finansial 7 hari terakhir.

Frontend cukup memanggil endpoint dari backend ini — **tidak perlu mengakses ML API langsung**. Backend akan meneruskan permintaan ke ML API, mengelola validasi, dan memformat respons akhir.

---

## 🔮 Endpoint: Prediksi Saldo

### URL
URL: /api/ml/predict-saldo
Method: POST

📋 Headers:
```json
Content-Type: application/json  
Authorization: Bearer <token>
```

📥 Request Body
```json
{
  "data": [
    [asset, liability, income, expenses, savings, loan],
    [asset, liability, income, expenses, savings, loan],
    ...
    // total 7 baris (7 hari)
  ]
}
```
contoh:
```json
{
  "data": [
    [500000000, 400000000, 10000000, 20000000, 5000000, 10000000],
    [510000000, 390000000, 12000000, 21000000, 5200000, 9000000],
    [520000000, 380000000, 13000000, 22000000, 5400000, 8000000],
    [530000000, 370000000, 14000000, 23000000, 5600000, 7000000],
    [540000000, 360000000, 15000000, 24000000, 5800000, 6000000],
    [550000000, 350000000, 16000000, 25000000, 6000000, 5000000],
    [560000000, 340000000, 17000000, 26000000, 6200000, 4000000]
  ]
}

```

✅ Response:
```json
{
  "prediction": [
    "Rp9.187.123",
    "Rp9.300.874",
    "Rp9.401.201",
    "Rp9.510.987",
    "Rp9.620.005",
    "Rp9.725.492",
    "Rp9.833.200"
  ]
}

```
Jika scaler tidak tersedia:
```json
{
  "prediction": [[1.4415650367736816]],
  "note": "Hasil belum di-inverse karena scaler_y.pkl tidak ditemukan."
}
```
# 🔗 Integrasi dengan ML API
Backend ini akan meneruskan data ke: 
```json
POST https://ml-api-production-6fd5.up.railway.app/predict
```

Backend bertugas menangani:

Validasi format data

Error handling dari ML API

Translasi respons ke format yang dimengerti frontend

### 📦 Teknologi yang Digunakan
Node.js

Express.js

Axios

Middleware Proxy ke ML API

### 🛠️ Status
✅ Siap digunakan frontend

🚧 Endpoint ML API masih disesuaikan dengan domain publik
```json
---

## ✨ ML API README juga sudah tepat
Karena ML API tidak diakses langsung oleh frontend, dokumentasi endpoint `/predict` cukup ringkas dan teknis. Jika kamu ingin, kita bisa tambahkan bagian "Testing via curl / Postman" juga di sana.

---

Apakah kamu ingin aku buatkan juga file `README.md` terpisah untuk langsung kamu paste ke masing-masing repo?

```
