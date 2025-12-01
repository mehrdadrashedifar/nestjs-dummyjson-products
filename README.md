# 🛒 NestJS Products API 

یک سرویس ساده اما استاندارد که با استفاده از **NestJS** به API محصولات DummyJSON متصل می‌شود و دیتای ماک را در ساختار تمیز و قابل‌استفاده ارائه می‌دهد.

این پروژه برای تمرین و همچنین ارزیابی فنی طراحی شده است.

---

## 🚀 Features (قابلیت‌ها)

* دریافت لیست محصولات با تمام Query Param های رایج (`limit`, `skip`, `search (q)`, `sortBy`, `order`, `select`, ...)

* معماری تمیز شامل:

  * Products Module
  * Products Controller
  * Products Service
  * DTO اختصاصی Query Params
* Error Handling استاندارد
* استفاده از HttpModule برای اتصال به DummyJSON

---

## 📦 Installation & Run

### 1. Clone the repo

```bash
git clone https://github.com/your-username/nestjs-products-dummyjson.git
cd nestjs-products-dummyjson
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run project

```bash
npm run start:dev
```

---

## 📡 API Endpoints

### 🔹 GET `/products`

دریافت لیست محصولات از DummyJSON همراه با پشتیبانی از Query Params:

مثال:

```
GET /products?limit=10&skip=5&search=phone&sortBy=price&order=desc
```

---

### 🔹 GET `/products/:id`

دریافت یک محصول خاص:

```
GET /products/5
```

---

## 🛠 Technologies

* NestJS
* TypeScript
* Axios (via HttpModule)

---

## 📁 Project Structure

```
src/
 └── products/
      ├── dto/
      │    └── get-products.dto.ts
      ├── products.controller.ts
      ├── products.service.ts
      └── products.module.ts
```

---

## 🧪 Testing the API

با ابزارهای زیر می‌توانید درخواست تست کنید:

* Postman
* Insomnia
* Thunder Client
* Curl

مثال:

```bash
curl "http://localhost:3000/products?limit=5"
```

---

## 📘 Docs (Optional)

در صورت فعال بودن Swagger:

```
http://localhost:3000/api
```


## 👤 Author

Made with ❤️ by **Mehrdad**
