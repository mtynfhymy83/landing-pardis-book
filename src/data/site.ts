export const contact: { phone: string | null; mobile: string | null; bale: string | null; eitaa: string | null } = {
  phone: '09100559253',
  mobile: '09100559253',
  bale: null,
  eitaa: null,
};

export const navigation = [
  { label: 'محصولات', href: '#products', available: true },
  { label: 'شرایط خرید', href: '#order-process', available: true },
  { label: 'سوالات متداول', href: '#faq', available: true },
  { label: 'تماس با ما', href: '#contact', available: true },
];

export const products = [
  { bookId: 'top-notch', audience: 'مناسب بزرگسالان و نوجوانان', originalPrice: 490000, price: 220000, discount: 55, stockIndicator: 36 },
  { bookId: 'first-friends', audience: 'مناسب زبان‌آموزان خردسال', originalPrice: 320000, price: 176000, discount: 45, stockIndicator: 42 },
  { bookId: 'family-friends', audience: 'مناسب گروه سنی کودکان و نوجوانان', originalPrice: 385000, price: 231000, discount: 40, stockIndicator: 28 },
];

export const advantages = [
  { icon: 'tag', title: 'قیمت پایین‌تر', description: 'تخفیف‌های ویژه و قیمت همکاری برای مراکز آموزشی' },
  { icon: 'receipt', title: 'فروش شرایطی با چک', description: 'امکان خرید با چک برای آموزشگاه‌های معتبر' },
  { icon: 'package', title: 'موجودی عمده عناوین پرفروش', description: 'تأمین مستمر عناوین پرفروش برای سفارش‌های عمده' },
  { icon: 'truck', title: 'پشتیبانی و ارسال سریع', description: 'ارسال به سراسر کشور با بسته‌بندی مطمئن' },
] as const;

export const orderSteps = [
  { title: 'انتخاب عنوان', description: 'انتخاب کتاب‌ها و تعداد مورد نظر' },
  { title: 'استعلام موجودی و قیمت', description: 'از طریق تلفن یا پیام‌رسان‌ها' },
  { title: 'ثبت سفارش', description: 'تأیید نهایی و هماهنگی پرداخت' },
  { title: 'ارسال', description: 'آماده‌سازی و ارسال سریع' },
];

// Sample content for visual review; replace with verified customer feedback before publishing.
export const testimonials = [
  { name: 'مریم احمدی', role: 'مدیر آموزشگاه زبان نسل فردا', initials: 'م ا', text: 'قیمت‌های خیلی مناسب و فرایند سفارش بسیار ساده بود. ارسال هم سریع انجام شد. کتابسرای پردیس، یک شریک قابل اعتماد برای آموزشگاه ماست.' },
  { name: 'علی محمدی', role: 'مدیر مؤسسه زبان راه روشن', initials: 'ع م', text: 'با خرید عمده از کتابسرای پردیس توانستیم هزینه‌ها را به شکل قابل توجهی کاهش دهیم. پشتیبانی عالی و پاسخگویی سریع، واقعاً خسته‌نباشید!' },
  { name: 'رضا کریمی', role: 'مدیر آموزشگاه زبان آفاق', initials: 'ر ک', text: 'تنوع عناوین و موجودی مناسب باعث شده همیشه بتوانیم کتاب‌های مورد نیازمان را به‌موقع تهیه کنیم. همکاری با شما یک انتخاب هوشمندانه است.' },
];

export const faqs = [
  { id: 'cheque', question: 'آیا امکان خرید با چک وجود دارد؟', answer: 'برای آموزشگاه‌های معتبر امکان بررسی خرید شرایطی با چک وجود دارد. شرایط پرداخت، مدارک و تأیید نهایی پیش از ثبت سفارش با واحد فروش هماهنگ می‌شود.' },
  { id: 'wholesale', question: 'قیمت عمده از چه تعدادی محاسبه می‌شود؟', answer: 'حداقل تعداد برای قیمت همکاری به عنوان کتاب و ترکیب سفارش بستگی دارد. فهرست کتاب‌ها و تعداد مورد نیاز را برای دریافت قیمت دقیق به واحد فروش اعلام کنید.' },
  { id: 'shipping', question: 'ارسال به شهرهای دیگر هم دارید؟', answer: 'ارسال به سراسر ایران امکان‌پذیر است. روش، هزینه و زمان تقریبی ارسال با توجه به مقصد و حجم سفارش، پیش از نهایی‌شدن خرید اعلام می‌شود.' },
  { id: 'ordering', question: 'چطور سریع سفارش ثبت کنیم؟', answer: 'نام سری، سطح کتاب و تعداد مورد نیازتان را آماده کنید و از بخش تماس با ما با فروش در ارتباط باشید. پس از استعلام موجودی و قیمت و تأیید شما، سفارش نهایی می‌شود.' },
];

export const formatNumber = (value: number) => new Intl.NumberFormat('fa-IR').format(value);

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  cover: string | null;
  palette: string;
  art: string;
};

export const books: Book[] = [
  { id: 'top-notch', title: 'Top Notch', subtitle: 'English for Real Life', caption: 'Skills. Confidence. A brighter tomorrow.', cover: '/books/top-notch-1a.png', palette: 'from-[#224e73] to-[#092341] text-white', art: 'from-[#8bc6e0] via-[#3187ac] to-[#12314d]' },
  { id: 'first-friends', title: 'First Friends', subtitle: 'English for Young Learners', caption: 'Play. Learn. Grow.', cover: '/books/first-friends-1.png', palette: 'from-[#009b91] to-[#006863] text-white', art: 'from-[#ffd971] via-[#efa249] to-[#2bb4a3]' },
  { id: 'family-friends', title: 'Family and Friends', subtitle: 'Building Brighter Futures Together', caption: 'Learn. Practice. Belong.', cover: '/books/family-and-friends-1.png', palette: 'from-[#fffef9] to-[#e7e8e2] text-[#12334f]', art: 'from-[#8bd1cf] via-[#e8c776] to-[#167d89]' },
];
