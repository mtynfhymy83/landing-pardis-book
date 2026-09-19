# استقرار با GitHub Actions، Docker Hub و Dokploy

مسیر: push روی main → ساخت و تست ایمیج در GitHub → push به Docker Hub → webhook → pull و deploy در Dokploy.

## ۱. Docker Hub

- یک repository به نام `pardis-landing` بسازید؛ نام کامل آن مثلاً `YOUR_USERNAME/pardis-landing` است.
- یک Personal Access Token با دسترسی Read & Write برای GitHub بسازید.
- توکن را فقط در GitHub Secrets وارد کنید؛ داخل فایل یا چت قرار ندهید.

## ۲. GitHub

در repository به Settings → Secrets and variables → Actions بروید.

در Variables:

| نام | مقدار نمونه |
| --- | --- |
| `DOCKERHUB_USERNAME` | `yourusername` |
| `DOCKERHUB_IMAGE` | `yourusername/pardis-landing` |

در Secrets:

| نام | مقدار |
| --- | --- |
| `DOCKERHUB_TOKEN` | توکن Docker Hub با دسترسی Read & Write |

نام ایمیج lowercase، بدون `https://` و بدون tag باشد. اگر repository متعلق به سازمان است، IMAGE شامل نام سازمان می‌شود ولی USERNAME نام حساب صاحب توکن است.

فایل‌ها را commit و روی main به GitHub push کنید. workflow در Actions اجرا می‌شود؛ یا از Run workflow روی main استفاده کنید. ابتدا ایمیج با npm ci و npm run build ساخته می‌شود، سپس Nginx و پاسخ HTTP آن تست و همان ایمیج با دو tag منتشر می‌شود:

- `latest`: نسخه مورد استفاده استقرار خودکار
- `sha-<full-commit-sha>`: نسخه مشخص برای بازگشت

تست‌های Playwright در این workflow اجرا نمی‌شوند؛ بررسی TypeScript، build و smoke test کانتینر اجرا می‌شوند.

## ۳. Dokploy

این راهنما فرض می‌کند Dokploy روی سرور نصب و قابل دسترسی است.

1. یک Project و داخل آن یک Application بسازید.
2. در General، Provider/Source را Docker انتخاب کنید.
3. Docker Image را `yourusername/pardis-landing:latest` قرار دهید؛ جایگزین‌کردن نام واقعی لازم است.
4. اگر repository خصوصی است، از Registry یا فیلدهای احراز هویت Docker، username و یک توکن جداگانه Read-only را تنظیم کنید. Registry برابر `docker.io` است.
5. بعد از اولین اجرای موفق GitHub Actions، یک بار Deploy بزنید.
6. در Domains دامنه را با Path برابر `/` و Container Port برابر `80` اضافه کنید. رکورد DNS دامنه به IP سرور اشاره کند. HTTPS را با Let's Encrypt فعال کنید؛ دسترسی ورودی پورت‌های 80 و 443 روی سرور فراهم باشد. نیازی به انتشار مستقیم پورت کانتینر در Advanced → Ports نیست.

## ۴. استقرار خودکار

1. Auto Deploy را در General برنامه روشن کنید.
2. Webhook URL را از تب Deployments کپی کنید.
3. در Docker Hub → repository → Webhooks، یک webhook با نام دلخواه و همان URL ثبت کنید.
4. با push بعدی روی main، پس از انتشار tag `latest`، Dokploy استقرار را آغاز می‌کند. Dokploy فقط webhook مربوط به tag تنظیم‌شده برنامه را می‌پذیرد؛ tag باید دقیقاً `latest` باشد.

Webhook پنل باید از اینترنت برای Docker Hub قابل دسترسی باشد؛ آدرس localhost یا شبکه داخلی کافی نیست. این URL را محرمانه نگه دارید. در این روش اتصال GitHub به Dokploy و API token آن در GitHub لازم نیست.

موفقیت GitHub Actions یعنی ایمیج ساخته و منتشر شده؛ موفقیت deploy را جداگانه در Deployments و Logs داکپلوی و با بازکردن دامنه بررسی کنید.

## بازگشت به نسخه قبل

Auto Deploy را موقتاً خاموش کنید، Docker Image را به `yourusername/pardis-landing:sha-<previous-full-commit-sha>` تغییر دهید و Deploy کنید. برای بازگشت به روند خودکار، ایمیج را به `:latest` برگردانید و Auto Deploy را روشن کنید.

## نکات این پروژه

- خروجی برنامه static است و با Nginx روی پورت 80 سرو می‌شود؛ Node فقط در مرحله build استفاده می‌شود. Vite dev server روی سرور اجرا نمی‌شود.
- این workflow برای سرور `linux/amd64` است. قبل از استفاده با `uname -m` روی سرور بررسی کنید: `x86_64` سازگار است؛ سرور `aarch64` به تغییر workflow و build برای ARM نیاز دارد.
- اطلاعات `src/data/site.ts` زمان build داخل فایل‌های JS قرار می‌گیرند. تغییر آن‌ها نیاز به commit و build جدید دارد؛ تغییر Environment در Dokploy این محتوا را عوض نمی‌کند. اطلاعات محرمانه در کد فرانت قرار ندهید.
- سرور باید به Docker Hub و سرویس دریافت certificate دسترسی داشته باشد.
- HTML بدون کش طولانی سرو می‌شود؛ فایل‌های hashدار زیر assets کش بلندمدت دارند.

## تست محلی با Docker فعال

```sh
docker build -t pardis-landing:local .
docker run --rm -p 8080:80 pardis-landing:local
```

سپس http://localhost:8080 را باز کنید.

## مستندات رسمی

- https://docs.docker.com/guides/gha/
- https://docs.dokploy.com/docs/core/providers
- https://docs.dokploy.com/docs/core/auto-deploy
- https://docs.dokploy.com/docs/core/domains
