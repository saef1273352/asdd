"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sun, Moon, MessageCircle, Phone, Mail, MapPin, Send } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContactPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.")
    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }))
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
                    <Link
                      href="/ads"
                      className={`hover:text-blue-600 transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      إعلانات
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-blue-600 font-medium">
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

      {/* المحتوى الرئيسي */}
      <main className="pt-[140px] pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* عنوان الصفحة */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>تواصل معنا</h1>
            <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              نحن هنا للإجابة على استفساراتكم وتلقي اقتراحاتكم
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* نموذج الاتصال */}
            <div className={`rounded-lg p-8 shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                أرسل لنا رسالة
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      الاسم الكامل *
                    </label>
                    <Input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      البريد الإلكتروني *
                    </label>
                    <Input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    رقم الهاتف
                  </label>
                  <Input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full"
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    موضوع الرسالة *
                  </label>
                  <Input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="w-full"
                    placeholder="أدخل موضوع رسالتك"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    نص الرسالة *
                  </label>
                  <Textarea
                    required
                    value={contactForm.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="w-full h-32"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                  <Send className="w-4 h-4 ml-2" />
                  إرسال الرسالة
                </Button>
              </form>
            </div>

            {/* معلومات الاتصال والواتساب */}
            <div className="space-y-8">
              {/* معلومات الاتصال */}
              <div className={`rounded-lg p-8 shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  معلومات الاتصال
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>الهاتف</h3>
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>+20 123 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                        البريد الإلكتروني
                      </h3>
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>info@alkola-today.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>العنوان</h3>
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>القاهرة، مصر</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* قسم الواتساب */}
              <div className={`rounded-lg p-8 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white`}>
                <h2 className="text-2xl font-bold mb-4">تواصل عبر الواتساب</h2>
                <p className="mb-6">للحصول على رد سريع، تواصل معنا مباشرة عبر الواتساب</p>

                <Button onClick={handleWhatsApp} className="w-full bg-white text-green-600 hover:bg-gray-100 py-3">
                  <MessageCircle className="w-5 h-5 ml-2" />
                  فتح محادثة واتساب
                </Button>

                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <h3 className="font-semibold mb-2">أوقات العمل:</h3>
                  <p className="text-sm">السبت - الخميس: 9:00 ص - 6:00 م</p>
                  <p className="text-sm">الجمعة: مغلق</p>
                </div>
              </div>

              {/* خريطة تفاعلية (محاكاة) */}
              <div className={`rounded-lg p-8 shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>موقعنا</h2>
                <div
                  className={`w-full h-64 rounded-lg border-2 border-dashed flex items-center justify-center ${
                    isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-100"
                  }`}
                >
                  <div className="text-center">
                    <MapPin className={`w-12 h-12 mx-auto mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>خريطة تفاعلية</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>القاهرة، مصر</p>
                  </div>
                </div>
              </div>
            </div>
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
