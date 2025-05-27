# 📊 GoalPocket API

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
  maintenance
}
```
Response :
```json
{
  maintenance
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
  maintenance
}
```
Response :
```json
{
  maintenance
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
  maintenance
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
  maintenance
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
  maintenance
}
```

### 📊 Get Summary
URL: /api/user/summary
Method: GET
Headers:

Authorization: Bearer <token>

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
  maintenance
}
```

### 📑 Get All Targets
URL: /api/targets
Method: GET
Headers:

Authorization: Bearer <token>

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
  maintenance
}
```

### 📋 Get All Trackings
URL: /api/trackings
Method: GET
Headers:

Authorization: Bearer <token>

### 🕓 Get Tracking History
URL: /api/history
Method: GET
Headers:

Authorization: Bearer <token>
