# NestJS Products API (DummyJSON → MongoDB)

یک پروژه آزمایشی با NestJS که دیتای محصولات DummyJSON را به MongoDB منتقل می‌کند و یک API کامل برای مدیریت محصولات ارائه می‌دهد.

---

## 🔹 ویژگی‌ها

* مدیریت محصولات با CRUD کامل
* جستجو و Pagination
* مرتب‌سازی محصولات
* مدیریت دسته‌بندی‌ها و محصولات دسته‌بندی شده
* Swagger Documentation
* انتقال دیتای DummyJSON به MongoDB (Migration Script)

---

## 💻 پیش‌نیازها

* Node.js >= 18
* npm یا yarn
* MongoDB (Local یا Remote)

---

## ⚡ نصب و اجرای پروژه

1. کلون کردن پروژه:

```bash
git clone https://github.com/mehrdadrashedifar/nestjs-dummyjson-products.git
cd nestjs-dummyjson-products
```

2. نصب وابستگی‌ها:

```bash
npm install
```

3. تنظیم اتصال MongoDB در `.env`:

```env
MONGO_URI=mongodb://localhost:27017/nestjs-products
PORT=3000
```

4. اجرای پروژه:

```bash
npm run start:dev
```

API روی `http://localhost:3000` فعال خواهد شد.

---

## 🚀 انتقال دیتا (Migration)

برای انتقال دیتای DummyJSON به MongoDB:

```bash
npm run migrate:products
```

* این اسکریپت تمام محصولات DummyJSON را می‌گیرد و در دیتابیس ذخیره می‌کند.
* ID محصولات اتوماتیک تولید می‌شود.
* بعد از اجرای این اسکریپت، تمام روت‌های CRUD آماده استفاده هستند.

---

## 📌 روت‌های API

### Products

| Method | Endpoint                 | توضیح                                                       |
| ------ | ------------------------ | ----------------------------------------------------------- |
| GET    | `/products`              | دریافت همه محصولات (پشتیبانی از limit, skip, sortBy, order) |
| GET    | `/products/:id`          | دریافت یک محصول با ID                                       |
| GET    | `/products/search?q=...` | جستجو محصولات                                               |
| POST   | `/products`              | ایجاد محصول جدید                                            |
| PATCH  | `/products/:id`          | ویرایش محصول                                                |
| DELETE | `/products/:id`          | حذف محصول                                                   |

### Categories

| Method | Endpoint                       | توضیح                               |
| ------ | ------------------------------ | ----------------------------------- |
| GET    | `/products/categories`         | دریافت همه دسته‌بندی‌ها (با جزئیات) |
| GET    | `/products/category-list`      | دریافت لیست نام دسته‌بندی‌ها        |
| GET    | `/products/category/:category` | دریافت محصولات یک دسته‌بندی خاص     |

---

## 📄 Swagger Documentation

Swagger روی مسیر زیر فعال است:

```
http://localhost:3000/api
```

می‌توانید همه Endpointها را مشاهده و تست کنید.

---

## 📝 نمونه درخواست‌ها

**ایجاد محصول جدید**

```json
POST /products
{
  "title": "Product X",
  "category": "beauty",
  "price": 199
}
```

**جستجو محصولات**

```
GET /products/search?q=mascara
```

**دریافت محصولات یک دسته‌بندی**

```
GET /products/category/beauty
```

---

## 🔧 تکنولوژی‌ها

* [NestJS](https://nestjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Swagger](https://swagger.io/)
* [Axios](https://axios-http.com/) (برای Migration)

---

## ✅ نکات مهم

* قبل از اجرای Migration، مطمئن شوید دیتابیس MongoDB در دسترس است.
* فیلد `id` محصولات توسط MongoDB مدیریت می‌شود.
* مسیر `/products/:id` فقط عدد می‌پذیرد و از CastError جلوگیری شده است.
