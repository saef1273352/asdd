"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Sun, Moon, MessageCircle, MapPin, Phone, Star, Filter } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// بيانات الإعلانات المتنوعة
const adsData = [
  {
    id: 1,
    title: "شقة للإيجار في المعادي",
    description: "شقة 3 غرف وصالة، مفروشة بالكامل، إطلالة على النيل",
    category: "الشقق",
    subcategory: "للإيجار",
    price: "8000 جنيه/شهر",
    location: "المعادي",
    governorate: "القاهرة",
    country: "مصر",
    contact: {
      name: "أحمد محمد",
      phone: "+20 100 123 4567",
      email: "ahmed@example.com",
    },
    image: "/images/slider_image_1.png",
    rating: 4.5,
    verified: true,
    featured: true,
  },
  {
    id: 2,
    title: "خدمات صيانة الكترونيات",
    description: "صيانة جميع أنواع الأجهزة الإلكترونية والكهربائية، خدمة منزلية",
    category: "الخدمات",
    subcategory: "صيانة",
    price: "يبدأ من 50 جنيه",
    location: "مدينة نصر",
    governorate: "القاهرة",
    country: "مصر",
    contact: {
      name: "محمد علي",
      phone: "+20 101 234 5678",
      email: "mohamed@example.com",
    },
    image: "/images/placeholder_tech.png",
    rating: 4.8,
    verified: true,
    featured: false,
  },
  {
    id: 3,
    title: "سيارة تويوتا كامري 2020",
    description: "سيارة في حالة ممتازة، قطعت 45000 كم، صيانة دورية منتظمة",
    category: "السيارات",
    subcategory: "للبيع",
    price: "320,000 جنيه",
    location: "الإسكندرية",
    governorate: "الإسكندرية",
    country: "مصر",
    contact: {
      name: "خالد أحمد",
      phone: "+20 102 345 6789",
      email: "khaled@example.com",
    },
    image: "/images/slider_image_2.png",
    rating: 4.2,
    verified: true,
    featured: true,
  },
  {
    id: 4,
    title: "لابتوب ديل XPS 13",
    description: "لابتوب مستعمل بحالة ممتازة، معالج Intel i7، ذاكرة 16GB",
    category: "الإلكترونيات",
    subcategory: "كمبيوتر",
    price: "25,000 جنيه",
    location: "الجيزة",
    governorate: "الجيزة",
    country: "مصر",
    contact: {
      name: "سارة محمود",
      phone: "+20 103 456 7890",
      email: "sara@example.com",
    },
    image: "/images/placeholder_tech.png",
    rating: 4.6,
    verified: false,
    featured: false,
  },
  {
    id: 5,
    title: "خدمات تنظيف منازل",
    description: "فريق متخصص في تنظيف المنازل والمكاتب، خدمة احترافية وأسعار مناسبة",
    category: "الخدمات",
    subcategory: "تنظيف",
    price: "200 جنيه/يوم",
    location: "الزمالك",
    governorate: "القاهرة",
    country: "مصر",
    contact: {
      name: "فاطمة حسن",
      phone: "+20 104 567 8901",
      email: "fatma@example.com",
    },
    image: "/images/slider_image_3.png",
    rating: 4.9,
    verified: true,
    featured: false,
  },
  {
    id: 6,
    title: "أرض للبيع في الساحل الشمالي",
    description: "قطعة أرض 500 متر، موقع متميز قريب من البحر",
    category: "الأراضي",
    subcategory: "للبيع",
    price: "1,200,000 جنيه",
    location: "الساحل الشمالي",
    governorate: "مطروح",
    country: "مصر",
    contact: {
      name: "عمر سالم",
      phone: "+20 105 678 9012",
      email: "omar@example.com",
    },
    image: "/images/placeholder_weather.png",
    rating: 4.3,
    verified: true,
    featured: true,
  },
  {
    id: 7,
    title: "موبايل iPhone 14 Pro",
    description: "آيفون 14 برو، 256GB، حالة ممتازة مع جميع الإكسسوارات",
    category: "الموبايلات",
    subcategory: "للبيع",
    price: "45,000 جنيه",
    location: "المنصورة",
    governorate: "الدقهلية",
    country: "مصر",
    contact: {
      name: "يوسف إبراهيم",
      phone: "+20 106 789 0123",
      email: "youssef@example.com",
    },
    image: "/images/placeholder_tech.png",
    rating: 4.7,
    verified: true,
    featured: false,
  },
  {
    id: 8,
    title: "خدمات تدريس خصوصي",
    description: "مدرس رياضيات وفيزياء، خبرة 10 سنوات، جميع المراحل التعليمية",
    category: "الخدمات",
    subcategory: "تعليم",
    price: "150 جنيه/ساعة",
    location: "أسيوط",
    governorate: "أسيوط",
    country: "مصر",
    contact: {
      name: "د. أحمد فتحي",
      phone: "+20 107 890 1234",
      email: "dr.ahmed@example.com",
    },
    image: "/images/slider_image_1.png",
    rating: 4.9,
    verified: true,
    featured: false,
  },
]

const categories = ["الكل", "الشقق", "الأراضي", "الخدمات", "السيارات", "الإلكترونيات", "الموبايلات"]

const governorates = ["الكل", "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "أسيوط", "مطروح"]

const searchScopes = [
  { id: "local", label: "منطقتي المحلية" },
  { id: "governorate", label: "محافظتي" },
  { id: "country", label: "الدولة كاملة" },
]

export default function AdsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [selectedGovernorate, setSelectedGovernorate] = useState("الكل")
  const [selectedScope, setSelectedScope] = useState("country")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [signupEmail, setSignupEmail] = useState("")

  // فلترة الإعلانات
  const filteredAds = adsData.filter((ad) => {
    // فلترة النص
    const matchesSearch =
      searchQuery === "" ||
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.category.includes(searchQuery)

    // فلترة الفئة
    const matchesCategory = selectedCategory === "الكل" || ad.category === selectedCategory

    // فلترة النطاق الجغرافي
    let matchesScope = true
    if (selectedScope === "governorate" && selectedGovernorate !== "الكل") {
      matchesScope = ad.governorate === selectedGovernorate
    } else if (selectedScope === "local" && selectedGovernorate !== "الكل") {
      matchesScope = ad.location.includes(selectedGovernorate) || ad.governorate === selectedGovernorate
    }

    // فلترة المحافظة
    const matchesGovernorate = selectedGovernorate === "الكل" || ad.governorate === selectedGovernorate

    // فلترة التحقق
    const matchesVerified = !showVerifiedOnly || ad.verified

    // فلترة المميز
    const matchesFeatured = !showFeaturedOnly || ad.featured

    return matchesSearch && matchesCategory && matchesScope && matchesGovernorate && matchesVerified && matchesFeatured
  })

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

  const handleWhatsApp = () => {
    window.open("https://wa.me/+201234567890", "_blank")
  }

  const handleContactAd = (contact: any) => {
    const message = `مرحباً، أنا مهتم بإعلانكم`
    window.open(`https://wa.me/${contact.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`} dir="rtl">
      {/* الرأس الثابت */}
      <header
        className={`fixed top-0 left-0 right-0 border-b shadow-sm z-50 h-[120px] transition-colors ${
          isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-col">
          {/* المساحة الإعلانية العلوية */}
          <div className="flex-1 flex items-center justify-center py-2">
            <div
              className={`w-full max-w-4xl h-[40px] rounded-lg border-2 border-dashed flex items-center justify-center transition-colors ${
                isDarkMode ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-gray-50"
              }`}
            >
              <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                مساحة إعلانية مميزة - 970x40 (Leaderboard)
              </span>
            </div>
          </div>

          {/* شريط التنقل الرئيسي */}
          <div className="h-[70px] flex justify-between items-center">
            {/* الجانب الأيمن: الشعار والتنقل */}
            <div className="flex items-center space-x-8 space-x-reverse">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">
                  <Link href="/" className="hover:opacity-80 transition-opacity">
                    <Image
                      src="/images/new-logo.png"
                      alt="أخباريا الكوله الآن"
                      width={120}
                      height={60}
                      className="h-12 w-auto"
                    />
                  </Link>
                </h1>
              </div>

              <nav className="hidden md:block">
                <ul className="flex items-center space-x-6 space-x-reverse">
                  <li>
                    <Link
                      href="/"
                      className={`hover:text-blue-600 transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      الرئيسية
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className={`hover:text-blue-600 transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      أخبار
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className={`hover:text-blue-600 transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      إسلاميات
                    </Link>
                  </li>
                  <li>
                    <Link href="/ads" className="text-blue-600 font-medium">
                      إعلانات
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className={`hover:text-blue-600 transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      تواصل
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className={`hover:text-blue-600 transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      بث مباشر
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className={`hover:text-blue-600 transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      المزيد
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* الجانب الأيسر: الأزرار */}
            <div className="flex items-center space-x-3 space-x-reverse">
              {/* زر الواتساب */}
              <button
                onClick={handleWhatsApp}
                className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                title="تواصل عبر الواتساب"
              >
                <MessageCircle className="w-5 h-5" />
              </button>

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
            </div>
          </div>
        </div>
      </header>

      {/* شريط الأخبار المتحرك */}
      <div className="fixed top-[120px] left-0 right-0 z-40 h-[50px] bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
          <div
            className={`w-full h-[40px] border-2 border-white rounded flex items-center justify-center ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>شريط الأخبار</span>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <main className="pt-[190px] pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* عنوان الصفحة */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>منصة الإعلانات</h1>
            <p className={`text-lg mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              ابحث عن كل ما تحتاجه في منطقتك أو محافظتك أو دولتك
            </p>
          </div>

          {/* فلاتر البحث المتقدم */}
          <div className={`rounded-lg p-6 mb-8 shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>البحث المتقدم</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* شريط البحث */}
              <div className="lg:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  البحث في الإعلانات
                </label>
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="ابحث عن إعلان، خدمة، منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 rounded-l-none"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-r-lg rounded-l-none">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* فئة الإعلان */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  الفئة
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* المحافظة */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  المحافظة
                </label>
                <Select value={selectedGovernorate} onValueChange={setSelectedGovernorate}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المحافظة" />
                  </SelectTrigger>
                  <SelectContent>
                    {governorates.map((gov) => (
                      <SelectItem key={gov} value={gov}>
                        {gov}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* نطاق البحث */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  نطاق البحث
                </label>
                <Select value={selectedScope} onValueChange={setSelectedScope}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النطاق" />
                  </SelectTrigger>
                  <SelectContent>
                    {searchScopes.map((scope) => (
                      <SelectItem key={scope.id} value={scope.id}>
                        {scope.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* خيارات إضافية */}
              <div className="flex flex-col gap-2">
                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  خيارات إضافية
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showVerifiedOnly}
                      onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                      className="text-blue-600"
                    />
                    <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      معلنين موثقين فقط
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showFeaturedOnly}
                      onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                      className="text-blue-600"
                    />
                    <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      إعلانات مميزة فقط
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* نتائج البحث */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                نتائج البحث ({filteredAds.length})
              </h2>
              <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                النطاق: {searchScopes.find((s) => s.id === selectedScope)?.label}
                {selectedGovernorate !== "الكل" && ` - ${selectedGovernorate}`}
              </div>
            </div>

            {filteredAds.length === 0 ? (
              <div className={`text-center py-12 ${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg`}>
                <Search className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  لا توجد نتائج
                </h3>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  جرب تغيير معايير البحث أو توسيع النطاق الجغرافي
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAds.map((ad) => (
                  <div
                    key={ad.id}
                    className={`rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    } ${ad.featured ? "ring-2 ring-yellow-400" : ""}`}
                  >
                    {/* صورة الإعلان */}
                    <div className="relative h-48">
                      <Image src={ad.image || "/placeholder.svg"} alt={ad.title} fill className="object-cover" />
                      {ad.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                          مميز
                        </div>
                      )}
                      {ad.verified && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                          موثق
                        </div>
                      )}
                    </div>

                    {/* محتوى الإعلان */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          {ad.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {ad.rating}
                          </span>
                        </div>
                      </div>

                      <p className={`text-sm mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {ad.description}
                      </p>

                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {ad.location}, {ad.governorate}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-green-600">{ad.price}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}
                        >
                          {ad.category}
                        </span>
                      </div>

                      {/* معلومات المعلن */}
                      <div className={`border-t pt-3 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                              {ad.contact.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Phone className="w-3 h-3 text-gray-500" />
                              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {ad.contact.phone}
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleContactAd(ad.contact)}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <MessageCircle className="w-4 h-4 ml-1" />
                            تواصل
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* التذييل */}
      <footer
        className={`text-white text-center py-6 mt-8 transition-colors ${isDarkMode ? "bg-black" : "bg-gray-900"}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; 2024 الكوله اليوم. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
