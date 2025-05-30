"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, Play, ChevronLeft, ChevronRight, Sun, Moon, Menu, MessageCircle, Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// بيانات الأخبار للسلايدر
const sliderNews = [
  {
    id: 1,
    title: "تطورات اقتصادية محلية هامة تؤثر على الأسواق",
    category: "اقتصاد",
    image: "/images/slider_image_2.png",
  },
  {
    id: 2,
    title: "نتائج رياضية مثيرة في البطولة المحلية",
    category: "رياضة",
    image: "/images/slider_image_3.png",
  },
  {
    id: 3,
    title: "إطلاق تقنيات جديدة في قطاع التكنولوجيا",
    category: "تكنولوجيا",
    image: "/images/placeholder_tech.png",
  },
  {
    id: 4,
    title: "تقرير شامل عن الأحوال الجوية والمناخ",
    category: "طقس",
    image: "/images/placeholder_weather.png",
  },
]

// بيانات الأخبار العاجلة للشريط المتحرك
const breakingNews = [
  "عاجل: اجتماع طارئ لمجلس الوزراء لمناقشة التطورات الاقتصادية الأخيرة",
  "رياضة: فوز الفريق المحلي بنتيجة مثيرة في المباراة النهائية",
  "تكنولوجيا: إطلاق منصة رقمية جديدة لخدمة المواطنين",
  "طقس: توقعات بأمطار غزيرة خلال الأيام القادمة",
]

// بيانات الأخبار حسب التصنيف
const newsData = {
  local: [
    {
      id: 1,
      title: "تطورات اقتصادية محلية هامة اليوم",
      content: "تحليل لأحدث البيانات الاقتصادية وتأثيرها على السوق المحلي والاستثمارات المستقبلية...",
      category: "أخبارنا",
      image: "/images/slider_image_2.png",
      time: "منذ ساعتين",
    },
    {
      id: 2,
      title: "افتتاح مشروع تكنولوجي جديد في العاصمة",
      content: "تفاصيل عن المشروع التقني الواعد الذي تم إطلاقه مؤخراً ودوره في التطوير التكنولوجي.",
      category: "أخبارنا",
      image: "/images/placeholder_tech.png",
      time: "منذ 3 ساعات",
    },
    {
      id: 3,
      title: "حدث ثقافي بارز يجذب الزوار من كافة المحافظات",
      content: "تغطية لفعالية ثقافية شهدت إقبالاً كبيراً نهاية الأسبوع وتأثيرها على السياحة الثقافية.",
      category: "ثقافة",
      time: "منذ 4 ساعات",
    },
    {
      id: 4,
      title: "مبادرة جديدة لدعم الشباب في مجال ريادة الأعمال",
      content: "إطلاق برنامج شامل لتدريب وتمويل المشاريع الناشئة للشباب في مختلف المحافظات.",
      category: "أخبارنا",
      image: "/images/slider_image_1.png",
      time: "منذ 5 ساعات",
    },
    {
      id: 5,
      title: "تطوير شبكة النقل العام في العاصمة",
      content: "خطة طموحة لتحديث وسائل النقل العام وإضافة خطوط جديدة لتحسين الخدمة.",
      category: "أخبارنا",
      time: "منذ 6 ساعات",
    },
  ],
  regions: [
    {
      id: 4,
      title: "مشاريع تنموية جديدة في المحافظات الشمالية",
      content: "تفاصيل عن مشاريع البنية التحتية الجديدة وتأثيرها على التنمية المحلية.",
      category: "محافظات",
      image: "/images/placeholder_weather.png",
      time: "منذ ساعة",
    },
    {
      id: 6,
      title: "افتتاح مستشفى جديد في الصعيد",
      content: "مستشفى متطور بأحدث التقنيات الطبية لخدمة أهالي المنطقة.",
      category: "محافظات",
      time: "منذ 3 ساعات",
    },
  ],
  world: [
    {
      id: 5,
      title: "تقرير شامل عن التطورات السياسية الدولية",
      content: "ملخص لأبرز الأحداث السياسية العالمية وتأثيرها على المنطقة.",
      category: "عالمية",
      image: "/images/slider_image_1.png",
      time: "منذ 30 دقيقة",
    },
    {
      id: 7,
      title: "قمة اقتصادية دولية تناقش التحديات المستقبلية",
      content: "اجتماع قادة العالم لمناقشة الأزمات الاقتصادية والحلول المقترحة.",
      category: "عالمية",
      time: "منذ ساعتين",
    },
  ],
  more: [
    {
      id: 6,
      title: "نتائج رياضية مهمة في البطولات المحلية",
      content: "تغطية شاملة لأهم المباريات والنتائج الرياضية الأخيرة.",
      category: "رياضة",
      image: "/images/slider_image_3.png",
      time: "منذ 45 دقيقة",
    },
    {
      id: 8,
      title: "معرض تكنولوجي يستعرض أحدث الابتكارات",
      content: "عرض لأحدث التقنيات والابتكارات في مجال التكنولوجيا والذكاء الاصطناعي.",
      category: "تكنولوجيا",
      time: "منذ ساعة",
    },
  ],
}

export default function AlkolaNewsWebsite() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("local")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [currentDateTime, setCurrentDateTime] = useState("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDateTime(now.toLocaleDateString("ar-EG", options));
    };
    updateDateTime(); // Initial call
    const intervalId = setInterval(updateDateTime, 60000); // Update every minute
    return () => clearInterval(intervalId);
  }, []);
 
  // تحديث السلايدر تلقائياً
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderNews.length)
    }, 5000)

    return () => clearInterval(slideInterval)
  }, [])

  // تحديث شريط الأخبار تلقائياً
  useEffect(() => {
    const newsInterval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length)
    }, 8000) // زيادة المدة إلى 8 ثوانٍ

    return () => clearInterval(newsInterval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderNews.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderNews.length) % sliderNews.length)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`البحث عن: ${searchQuery}`)
    }
  }

  const handleLogin = () => {
    if (loginEmail.trim()) {
      alert(`تسجيل الدخول بـ: ${loginEmail}`)
    }
  }

  const handleSignup = () => {
    if (signupEmail.trim()) {
      alert(`إنشاء حساب بـ: ${signupEmail}`)
    }
  }

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`} dir="rtl">
      {/* الرأس الثابت المحسن */}
      <header
        className={`fixed top-0 left-0 right-0 border-b shadow-sm z-50 h-[150px] transition-colors ${
          isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-col">
          {/* المساحة الإعلانية العلوية والتاريخ */}
          <div className="flex-1 flex items-center justify-between py-2">
            <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {currentDateTime}
            </div>
            <div
              className={`w-full max-w-4xl h-[90px] rounded-lg border-2 border-dashed flex items-center justify-center transition-colors mx-auto ${
                isDarkMode ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-gray-50"
              }`}
            >
              <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                مساحة إعلانية مميزة - 970x40 (Leaderboard)
              </span>
            </div>
            {/* Spacer to help balance the date on the left and ad in the center */}
            <div className={`text-sm font-medium invisible ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} aria-hidden="true">
              {currentDateTime}
            </div>
          </div>

          {/* شريط التنقل الرئيسي */}
          <div className="h-[70px] flex justify-between items-center">
            {/* الجانب الأيمن: الشعار والتنقل */}
            <div className="flex items-center space-x-8 space-x-reverse">
              {/* الشعار */}
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <Image
                      src="/images/new-logo.png"
                      alt="أخبارنا الكوله الآن"
                      width={120}
                      height={60}
                      className="h-12 w-auto"
                    />
                  </a>
                </h1>
              </div>

              {/* قائمة التنقل */}
              <nav className="hidden md:block">
                <ul className="flex items-center space-x-6 space-x-reverse">
                  <li>
                    <a
                      href="#"
                      className={`hover:text-blue-600 transition-colors ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      الرئيسية
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`hover:text-blue-600 transition-colors ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      أخبار
                    </a>
                  </li>
                  <li>
                    <a
                      href="/islamic"
                      className={`hover:text-blue-600 transition-colors ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      إسلاميات
                    </a>
                  </li>
                  <li>
                    <a
                      href="/ads"
                      className={`hover:text-blue-600 transition-colors ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      إعلانات
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className={`hover:text-blue-600 transition-colors ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      تواصل
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`hover:text-blue-600 transition-colors ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      بث مباشر
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`hover:text-blue-600 transition-colors ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      المزيد
                    </a>
                  </li>
                  {/* زر تبديل الوضع الليلي/النهاري -- MOVED TO THE LEFT SIDE CONTROLS */}
                </ul>
              </nav>
            </div>

            {/* الجانب الأيسر: زر تسجيل الدخول فقط */}
            <div className="flex items-center space-x-3 space-x-reverse">
              {/* مودال تسجيل الدخول */}
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      isDarkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    تسجيل الدخول
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md" dir="rtl">
                  <DialogHeader className="text-center">
                    <DialogTitle className="text-2xl font-bold text-center mb-6">هلا بيدأ</DialogTitle>
                  </DialogHeader>

                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="login" className="text-sm">
                        تسجيل الدخول
                      </TabsTrigger>
                      <TabsTrigger value="signup" className="text-sm">
                        اشترك الآن
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-4">
                      <div className="space-y-4">
                        <Input
                          type="email"
                          placeholder="الرجاء إدخال البريد الإلكتروني أو رقم الجوال"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full text-center"
                          dir="rtl"
                        />
                        <Button onClick={handleLogin} className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                          متابعة
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4">
                      <div className="space-y-4">
                        <Input
                          type="email"
                          placeholder="الرجاء إدخال البريد الإلكتروني أو رقم الجوال"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="w-full text-center"
                          dir="rtl"
                        />
                        <Button onClick={handleSignup} className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                          متابعة
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>

              {/* زر تبديل الوضع الليلي/النهاري */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title={isDarkMode ? "تبديل للوضع النهاري" : "تبديل للوضع الليلي"}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* زر الواتساب */}
              <button
                onClick={() => window.open("https://wa.me/+201234567890", "_blank")}
                className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                title="تواصل عبر الواتساب"
              >
                <MessageCircle className="w-5 h-5" />
              </button>

              {/* قائمة الهامبرغر للشاشات الصغيرة */}
              <button className={`md:hidden p-2 rounded-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* شريط الأخبار المتحرك - مفصول التنسيق */}
      <div className="fixed top-[150px] left-0 right-0 z-40 h-[50px] bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex items-center h-full">
            {/* كلمة عاجل - تنسيق منفصل */}
            <div className="flex-shrink-0 ml-4">
              <span
                className="bg-red-600 text-white px-4 py-1 rounded-md font-bold text-sm shadow-lg border-r-4 border-red-700"
                style={{
                  backgroundColor: "#dc2626",
                  color: "#ffffff",
                  borderRightColor: "#b91c1c",
                }}
              >
                عاجل
              </span>
            </div>

            {/* منطقة النص المتحرك - تنسيق منفصل */}
            <div className="flex-1 h-full overflow-hidden">
              <div className="h-full flex items-center">
                <div
                  className="whitespace-nowrap font-medium text-sm"
                  style={{
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "500",
                    transform: `translateX(${100 - currentNewsIndex * 100}%)`,
                    transition: "transform 15s linear",
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  {breakingNews.map((news, index) => (
                    <span
                      key={index}
                      style={{
                        color: "#ffffff",
                        paddingLeft: "2rem",
                        paddingRight: "2rem",
                        minWidth: "100vw",
                        display: "inline-block",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {news}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <main className="pt-[200px] pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* القسم العلوي - السلايدر والبث المباشر */}
          <div className="flex gap-6 mb-8 h-[350px]">
            {/* السلايدر */}
            <div className="flex-[2] relative overflow-hidden rounded-lg bg-black">
              {sliderNews.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-800 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block bg-red-600 text-white px-3 py-1 rounded text-sm mb-2">
                      {slide.category}
                    </span>
                    <h2 className="text-xl font-bold leading-tight">
                      <a href="#" className="hover:underline">
                        {slide.title}
                      </a>
                    </h2>
                  </div>
                </div>
              ))}

              {/* أزرار التنقل */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* مؤشرات السلايدر */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 space-x-reverse">
                {sliderNews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* قسم البث المباشر */}
            <div className="flex-1 bg-black text-white rounded-lg p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-4 pb-3 border-b border-gray-600 text-center">بث مباشر</h3>
              <div className="flex-1 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-center">
                <Play className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-gray-300 mb-2">محتوى البث المباشر يظهر هنا</p>
                <span className="text-gray-500 text-lg">(منطقة الفيديو)</span>
              </div>
            </div>
          </div>

          {/* المحتوى السفلي */}
          <div className="flex gap-6 items-start">
            {/* منطقة الأخبار الرئيسية */}
            <div className="flex-1">
              {/* عنوان القسم وشريط البحث */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-6">
                  {/* عنوان أحدث الأخبار */}
                  <div className="bg-red-600 text-white px-6 py-3 font-bold text-lg relative">
                    أحدث الأخبار
                    <div className="absolute left-0 top-0 w-0 h-0 border-t-[25px] border-b-[25px] border-r-[15px] border-t-red-600 border-b-red-600 border-r-transparent transform translate-x-full"></div>
                  </div>

                  {/* شريط البحث بجوار العنوان مباشرة */}
                  <div className="flex max-w-md">
                    <input
                      type="text"
                      placeholder="ابحث في الأخبار..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`flex-1 px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                          : "border-gray-300 bg-white text-gray-900"
                      }`}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button
                      onClick={handleSearch}
                      className="px-4 py-2 bg-blue-600 text-white rounded-l-lg hover:bg-blue-700 transition-colors"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* التبويبات المحسنة */}
              <div className={`mb-6 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                <nav className="flex">
                  {[
                    { id: "local", label: "أخبارنا" },
                    { id: "regions", label: "محافظات" },
                    { id: "world", label: "عالمية" },
                    { id: "more", label: "المزيد" },
                  ].map((tab, index) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                        activeTab === tab.id
                          ? "bg-red-600 text-white"
                          : `${
                              isDarkMode
                                ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600"
                                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                            } border-t border-l ${index === 3 ? "border-r" : ""}`
                      }`}
                    >
                      {tab.label}
                      {/* مثلث صغير للتبويب النشط */}
                      {activeTab === tab.id && (
                        <div className="absolute left-0 top-0 w-0 h-0 border-t-[24px] border-b-[24px] border-r-[12px] border-t-red-600 border-b-red-600 border-r-transparent transform translate-x-full"></div>
                      )}
                    </button>
                  ))}
                </nav>
                {/* خط فاصل تحت التبويبات */}
                <div className={`h-px ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
              </div>

              {/* محتوى التبويبات */}
              <div className="space-y-6">
                {newsData[activeTab as keyof typeof newsData]?.map((article) => (
                  <article
                    key={article.id}
                    className={`border rounded-lg p-6 shadow-sm hover:shadow-md transition-all ${
                      isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex gap-4">
                      {article.image && (
                        <div className="flex-shrink-0">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            width={200}
                            height={150}
                            className="rounded-lg object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3
                          className={`text-xl font-bold mb-2 hover:text-blue-600 transition-colors ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          <a href="#">{article.title}</a>
                        </h3>
                        <p className={`mb-3 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {article.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {article.category}
                          </span>
                          <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {article.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* الشريط الجانبي - ثابت بدون تمرير */}
            <aside className="w-80 space-y-6">
              {/* النافذة الدينية */}
              <div
                className={`border rounded-lg overflow-hidden transition-colors h-[350px] ${
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 text-center">
                  <h3 className="text-lg font-bold flex items-center justify-center gap-2">🕌 نافذة دينية</h3>
                </div>

                <div className="p-6 h-[calc(350px-64px)] flex flex-col">
                  {/* آية اليوم */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 mb-4 flex-1">
                    <h4 className={`font-semibold mb-2 text-center ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      آية اليوم
                    </h4>
                    <p className={`text-center leading-relaxed mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                      "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ"
                    </p>
                    <p className={`text-xs text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      سورة الطلاق - آية 2-3
                    </p>
                  </div>

                  {/* مواقيت الصلاة */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4">
                    <h4 className={`font-semibold mb-3 text-center ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      مواقيت الصلاة - القاهرة
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>الفجر:</span>
                        <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>5:15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>الشروق:</span>
                        <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>6:45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>الظهر:</span>
                        <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>12:30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>العصر:</span>
                        <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>3:45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>المغرب:</span>
                        <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>6:20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>العشاء:</span>
                        <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>7:50</span>
                      </div>
                    </div>
                    <div className={`text-xs mt-2 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      الصلاة القادمة: المغرب في 2:15 ساعة
                    </div>
                  </div>
                </div>
              </div>

              {/* المساحة الإعلانية 300x200 */}
              <div
                className={`border rounded-lg p-6 text-center transition-colors h-[200px] ${
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`border-2 border-dashed rounded-lg h-full flex flex-col items-center justify-center ${
                    isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-100"
                  }`}
                >
                  <p className={`mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>مساحة إعلانية</p>
                  <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>300x200</p>
                  <Image src="/images/logo.png" alt="إعلان" width={100} height={60} className="mt-2 opacity-70" />
                </div>
              </div>

              {/* أسعار العملات */}
              <div
                className={`border rounded-lg p-6 transition-colors ${
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 border-b pb-2 flex items-center ${
                    isDarkMode ? "text-gray-200 border-gray-600" : "text-gray-700 border-gray-200"
                  }`}
                >
                  💱 أسعار العملات
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>USD/EGP</span>
                    <div className="text-right">
                      <span className="text-green-600 font-bold">30.85</span>
                      <span className="text-xs text-green-500 block">+0.15</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>EUR/EGP</span>
                    <div className="text-right">
                      <span className="text-red-600 font-bold">33.42</span>
                      <span className="text-xs text-red-500 block">-0.08</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>GBP/EGP</span>
                    <div className="text-right">
                      <span className="text-green-600 font-bold">39.12</span>
                      <span className="text-xs text-green-500 block">+0.22</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>SAR/EGP</span>
                    <div className="text-right">
                      <span className="text-green-600 font-bold">8.23</span>
                      <span className="text-xs text-green-500 block">+0.05</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`text-xs mt-3 pt-2 border-t ${isDarkMode ? "text-gray-400 border-gray-600" : "text-gray-500 border-gray-200"}`}
                >
                  آخر تحديث: منذ 5 دقائق
                </div>
              </div>

              {/* أسعار الذهب */}
              <div
                className={`border rounded-lg p-6 transition-colors ${
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 border-b pb-2 flex items-center ${
                    isDarkMode ? "text-gray-200 border-gray-600" : "text-gray-700 border-gray-200"
                  }`}
                >
                  🥇 أسعار الذهب
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>عيار 24</span>
                    <div className="text-right">
                      <span className="text-yellow-600 font-bold">2,850 ج.م</span>
                      <span className="text-xs text-green-500 block">+25 ج.م</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>عيار 21</span>
                    <div className="text-right">
                      <span className="text-yellow-600 font-bold">2,494 ج.م</span>
                      <span className="text-xs text-green-500 block">+22 ج.م</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>عيار 18</span>
                    <div className="text-right">
                      <span className="text-yellow-600 font-bold">2,138 ج.م</span>
                      <span className="text-xs text-green-500 block">+19 ج.م</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      الجنيه الذهب
                    </span>
                    <div className="text-right">
                      <span className="text-yellow-600 font-bold">22,800 ج.م</span>
                      <span className="text-xs text-green-500 block">+200 ج.م</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`text-xs mt-3 pt-2 border-t ${isDarkMode ? "text-gray-400 border-gray-600" : "text-gray-500 border-gray-200"}`}
                >
                  آخر تحديث: منذ 10 دقائق
                </div>
              </div>

              {/* أحدث الأخبار */}
              <div
                className={`border rounded-lg p-6 transition-colors ${
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 border-b pb-2 ${
                    isDarkMode ? "text-gray-200 border-gray-600" : "text-gray-700 border-gray-200"
                  }`}
                >
                  📰 أحدث الأخبار
                </h3>
                <ul className="space-y-4">
                  <li className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-b-0 last:pb-0">
                    <a href="#" className="block group">
                      <h4 className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors mb-1">
                        خبر عاجل: تطورات مهمة في القطاع الاقتصادي
                      </h4>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>منذ 15 دقيقة</span>
                    </a>
                  </li>
                  <li className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-b-0 last:pb-0">
                    <a href="#" className="block group">
                      <h4 className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors mb-1">
                        رياضة: فوز تاريخي للفريق المحلي في البطولة
                      </h4>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>منذ 30 دقيقة</span>
                    </a>
                  </li>
                  <li className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-b-0 last:pb-0">
                    <a href="#" className="block group">
                      <h4 className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors mb-1">
                        تكنولوجيا: إطلاق منصة رقمية جديدة لخدمة المواطنين
                      </h4>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>منذ 45 دقيقة</span>
                    </a>
                  </li>
                  <li className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-b-0 last:pb-0">
                    <a href="#" className="block group">
                      <h4 className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors mb-1">
                        طقس: توقعات بأمطار غزيرة خلال الأيام القادمة
                      </h4>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>منذ ساعة</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* الطقس */}
              <div
                className={`border rounded-lg p-6 transition-colors ${
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 border-b pb-2 flex items-center ${
                    isDarkMode ? "text-gray-200 border-gray-600" : "text-gray-700 border-gray-200"
                  }`}
                >
                  🌤️ حالة الطقس
                </h3>
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">☀️</div>
                  <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>28°C</div>
                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>مشمس</div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center">
                    <div className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>الرطوبة</div>
                    <div className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>65%</div>
                  </div>
                  <div className="text-center">
                    <div className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>الرياح</div>
                    <div className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>12 كم/س</div>
                  </div>
                </div>
                <div
                  className={`text-xs mt-3 pt-2 border-t text-center ${isDarkMode ? "text-gray-400 border-gray-600" : "text-gray-500 border-gray-200"}`}
                >
                  القاهرة - آخر تحديث: منذ ساعة
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* التذييل الجديد */}
      <footer className={`pt-10 pb-6 mt-8 transition-colors ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-right">
            {/* العمود الأول: الشعار والوصف والشبكات الاجتماعية */}
            <div>
              <Image src="/images/new-logo.png" alt="أخباريا الكوله الآن" width={150} height={75} className="mb-4 h-auto" />
              <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                موقع إخباري شامل يقدم أحدث الأخبار المحلية والعالمية في مختلف المجالات السياسية والاقتصادية والرياضية والفنية والتكنولوجية.
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className={`hover:text-blue-500 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}><Facebook size={20} /></a>
                <a href="#" className={`hover:text-blue-400 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}><Twitter size={20} /></a>
                <a href="#" className={`hover:text-pink-500 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}><Instagram size={20} /></a>
                <a href="#" className={`hover:text-red-600 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}><Youtube size={20} /></a>
              </div>
            </div>

            {/* العمود الثاني: روابط سريعة */}
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className={`hover:underline ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-black"}`}>الرئيسية</a></li>
                <li><a href="/islamic" className={`hover:underline ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-black"}`}>إسلاميات</a></li>
                <li><a href="/ads" className={`hover:underline ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-black"}`}>إعلانات</a></li>
                <li><a href="/contact" className={`hover:underline ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-black"}`}>تواصل معنا</a></li>
                <li><a href="#" className={`hover:underline ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-black"}`}>سياسة الخصوصية</a></li>
              </ul>
            </div>

            {/* العمود الثالث: الأقسام */}
            <div>
              <h3 className="text-lg font-semibold mb-4">الأقسام</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className={`hover:underline ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-black"}`}>أخبار محلية</a></li>
                <li><a href="#" className={`hover:underline ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-black"}`}>أخبار عالمية</a></li>
                <li><a href="#" className={`hover:underline ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-black"}`}>رياضة</a></li>
                <li><a href="#" className={`hover:underline ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-black"}`}>اقتصاد</a></li>
                <li><a href="#" className={`hover:underline ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-black"}`}>تكنولوجيا</a></li>
              </ul>
            </div>

            {/* العمود الرابع: تواصل معنا */}
            <div>
              <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <MapPin size={18} className={`ml-2 mt-1 flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                  <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>العنوان: شارع الصحافة، المدينة، البلد</span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className={`ml-2 flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                  <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>الهاتف: +20 123 456 7890</span>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className={`ml-2 flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                  <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>البريد: info@alkola-news.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* شريط الحقوق */}
          <div className={`border-t pt-6 text-center text-sm ${isDarkMode ? "border-gray-700 text-gray-500" : "border-gray-300 text-gray-500"}`}>
            <p>&copy; 2025 أخباريا الكوله الآن. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
