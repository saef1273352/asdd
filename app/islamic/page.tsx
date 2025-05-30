"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Sun, Moon, MessageCircle, Play, Book, Heart, Share2, Clock, User } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// بيانات التفسير والمحتوى الديني
const islamicContent = {
  tafseer: [
    {
      id: 1,
      title: "تفسير سورة الفاتحة",
      verse: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      content: "سورة الفاتحة هي أم الكتاب وأعظم سورة في القرآن الكريم. تبدأ بالبسملة التي تحمل معاني الرحمة والبركة...",
      author: "الشيخ محمد الشعراوي",
      category: "تفسير القرآن",
      readTime: "5 دقائق",
      image: "/images/slider_image_1.png",
    },
    {
      id: 2,
      title: "تفسير آية الكرسي",
      verse: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
      content: "آية الكرسي من أعظم آيات القرآن الكريم، تحتوي على أسماء الله الحسنى وصفاته العلى...",
      author: "الشيخ ابن عثيمين",
      category: "تفسير القرآن",
      readTime: "8 دقائق",
      image: "/images/slider_image_2.png",
    },
    {
      id: 3,
      title: "تفسير سورة الإخلاص",
      verse: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      content: "سورة الإخلاص تعادل ثلث القرآن، وهي إعلان صريح لوحدانية الله عز وجل...",
      author: "الشيخ السعدي",
      category: "تفسير القرآن",
      readTime: "4 دقائق",
      image: "/images/slider_image_3.png",
    },
  ],
  hadith: [
    {
      id: 1,
      title: "حديث جبريل في الإسلام والإيمان والإحسان",
      hadithText: "عن عمر بن الخطاب قال: بينما نحن عند رسول الله صلى الله عليه وسلم ذات يوم إذ طلع علينا رجل...",
      explanation:
        "هذا الحديث العظيم يُعرف بحديث جبريل، وهو من أهم الأحاديث في الإسلام لأنه يشرح أركان الدين الثلاثة...",
      narrator: "عمر بن الخطاب",
      source: "صحيح مسلم",
      category: "العقيدة",
      readTime: "10 دقائق",
    },
    {
      id: 2,
      title: "حديث الأعمال بالنيات",
      hadithText: "إنما الأعمال بالنيات وإنما لكل امرئ ما نوى...",
      explanation: "هذا الحديث أصل عظيم في الإسلام، يبين أن صحة العمل وقبوله عند الله مرتبط بالنية الصالحة...",
      narrator: "عمر بن الخطاب",
      source: "صحيح البخاري",
      category: "الأخلاق",
      readTime: "6 دقائق",
    },
    {
      id: 3,
      title: "حديث الرحمة",
      hadithText: "الراحمون يرحمهم الرحمن، ارحموا من في الأرض يرحمكم من في السماء",
      explanation: "يحث هذا الحديث على الرحمة والرفق بجميع المخلوقات، ويبين أن الرحمة سبب لنيل رحمة الله...",
      narrator: "عبد الله بن عمرو",
      source: "سنن أبي داود",
      category: "الأخلاق",
      readTime: "5 دقائق",
    },
  ],
  fiqh: [
    {
      id: 1,
      title: "أحكام الوضوء",
      content: "الوضوء شرط من شروط صحة الصلاة، وله فرائض وسنن ومستحبات. من فرائضه: غسل الوجه، واليدين إلى المرفقين...",
      category: "الطهارة",
      author: "فقه العبادات",
      readTime: "7 دقائق",
      image: "/images/placeholder_weather.png",
    },
    {
      id: 2,
      title: "أحكام الزكاة",
      content: "الزكاة ركن من أركان الإسلام الخمسة، وهي حق معلوم في المال للفقراء والمساكين. لها شروط ونصاب محدد...",
      category: "المعاملات",
      author: "فقه المعاملات",
      readTime: "12 دقائق",
      image: "/images/placeholder_tech.png",
    },
    {
      id: 3,
      title: "آداب الطعام في الإسلام",
      content: "للطعام في الإسلام آداب كثيرة، منها: التسمية قبل الأكل، والأكل باليمين، والأكل مما يلي الآكل...",
      category: "الآداب",
      author: "الآداب الإسلامية",
      readTime: "5 دقائق",
      image: "/images/slider_image_1.png",
    },
  ],
}

// بيانات الخطب المصورة
const videoSermons = [
  {
    id: 1,
    title: "خطبة عن التوبة والاستغفار",
    sheikh: "الشيخ محمد حسان",
    description: "خطبة مؤثرة عن أهمية التوبة النصوح والإكثار من الاستغفار في حياة المسلم",
    duration: "45:30",
    views: "125,000",
    uploadDate: "منذ أسبوع",
    thumbnail: "/images/slider_image_1.png",
    category: "خطب الجمعة",
  },
  {
    id: 2,
    title: "درس في تفسير سورة البقرة",
    sheikh: "الشيخ عبد الرحمن السديس",
    description: "شرح مفصل لآيات من سورة البقرة مع استخراج الدروس والعبر",
    duration: "1:15:20",
    views: "89,000",
    uploadDate: "منذ 3 أيام",
    thumbnail: "/images/slider_image_2.png",
    category: "دروس التفسير",
  },
  {
    id: 3,
    title: "محاضرة عن بر الوالدين",
    sheikh: "الشيخ علي الطنطاوي",
    description: "محاضرة قيمة عن أهمية بر الوالدين وحقوقهما في الإسلام",
    duration: "38:15",
    views: "156,000",
    uploadDate: "منذ 5 أيام",
    thumbnail: "/images/slider_image_3.png",
    category: "محاضرات",
  },
  {
    id: 4,
    title: "خطبة عن الصبر والابتلاء",
    sheikh: "الشيخ محمد العريفي",
    description: "خطبة مؤثرة عن الصبر على البلاء وحكمة الله في الابتلاء",
    duration: "42:10",
    views: "203,000",
    uploadDate: "منذ يومين",
    thumbnail: "/images/placeholder_weather.png",
    category: "خطب الجمعة",
  },
  {
    id: 5,
    title: "درس في الفقه الإسلامي",
    sheikh: "الشيخ صالح الفوزان",
    description: "درس تفصيلي في أحكام الطهارة والصلاة من كتاب الفقه",
    duration: "1:02:45",
    views: "67,000",
    uploadDate: "منذ أسبوعين",
    thumbnail: "/images/placeholder_tech.png",
    category: "دروس الفقه",
  },
  {
    id: 6,
    title: "محاضرة عن الأخلاق الإسلامية",
    sheikh: "الشيخ راتب النابلسي",
    description: "محاضرة شاملة عن الأخلاق الحميدة وأثرها في حياة المسلم",
    duration: "55:30",
    views: "112,000",
    uploadDate: "منذ 4 أيام",
    thumbnail: "/images/slider_image_1.png",
    category: "محاضرات",
  },
]

export default function IslamicPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeContentTab, setActiveContentTab] = useState("tafseer")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVideoCategory, setSelectedVideoCategory] = useState("الكل")
  const [loginEmail, setLoginEmail] = useState("")
  const [signupEmail, setSignupEmail] = useState("")

  const videoCategories = ["الكل", "خطب الجمعة", "دروس التفسير", "محاضرات", "دروس الفقه"]

  const filteredVideos = videoSermons.filter((video) => {
    const matchesSearch =
      searchQuery === "" ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.sheikh.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedVideoCategory === "الكل" || video.category === selectedVideoCategory

    return matchesSearch && matchesCategory
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

  const handleVideoPlay = (video: any) => {
    alert(`تشغيل الفيديو: ${video.title}`)
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
                    <Link href="/islamic" className="text-blue-600 font-medium">
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

      {/* المحتوى الرئيسي */}
      <main className="pt-[140px] pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* عنوان الصفحة */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              🕌 القسم الإسلامي
            </h1>
            <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              تفسير القرآن الكريم • شرح الأحاديث النبوية • الفقه الإسلامي • خطب ومحاضرات
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* القسم الأول: المحتوى النصي (التفسير والأحاديث والفقه) */}
            <div className="lg:col-span-2">
              <div className={`rounded-lg p-6 shadow-lg mb-8 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                <div className="flex items-center gap-3 mb-6">
                  <Book className="w-6 h-6 text-green-600" />
                  <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    المكتبة الإسلامية
                  </h2>
                </div>

                <Tabs value={activeContentTab} onValueChange={setActiveContentTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="tafseer" className="text-sm">
                      تفسير القرآن
                    </TabsTrigger>
                    <TabsTrigger value="hadith" className="text-sm">
                      شرح الأحاديث
                    </TabsTrigger>
                    <TabsTrigger value="fiqh" className="text-sm">
                      الفقه الإسلامي
                    </TabsTrigger>
                  </TabsList>

                  {/* تبويب التفسير */}
                  <TabsContent value="tafseer" className="space-y-6">
                    {islamicContent.tafseer.map((item) => (
                      <Card key={item.id} className={`${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}>
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            {item.image && (
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                width={120}
                                height={80}
                                className="rounded-lg object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <CardTitle className={`text-lg mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                                {item.title}
                              </CardTitle>
                              <div
                                className={`text-xl mb-3 p-3 rounded-lg text-center ${isDarkMode ? "bg-gray-600 text-green-300" : "bg-green-50 text-green-800"}`}
                              >
                                {item.verse}
                              </div>
                              <div className="flex items-center gap-4 text-sm">
                                <span
                                  className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                                >
                                  <User className="w-4 h-4" />
                                  {item.author}
                                </span>
                                <span
                                  className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                                >
                                  <Clock className="w-4 h-4" />
                                  {item.readTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className={`leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {item.content}
                          </p>
                          <div className="flex items-center gap-2 mt-4">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              اقرأ المزيد
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              حفظ
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <Share2 className="w-4 h-4" />
                              مشاركة
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  {/* تبويب الأحاديث */}
                  <TabsContent value="hadith" className="space-y-6">
                    {islamicContent.hadith.map((item) => (
                      <Card key={item.id} className={`${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}>
                        <CardHeader>
                          <CardTitle className={`text-lg mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                            {item.title}
                          </CardTitle>
                          <div
                            className={`text-lg mb-4 p-4 rounded-lg ${isDarkMode ? "bg-gray-600 text-blue-300" : "bg-blue-50 text-blue-800"}`}
                          >
                            "{item.hadithText}"
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              الراوي: {item.narrator}
                            </span>
                            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              المصدر: {item.source}
                            </span>
                            <span
                              className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              <Clock className="w-4 h-4" />
                              {item.readTime}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <h4 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                            الشرح والتفسير:
                          </h4>
                          <p className={`leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {item.explanation}
                          </p>
                          <div className="flex items-center gap-2 mt-4">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              اقرأ الشرح كاملاً
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              حفظ
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <Share2 className="w-4 h-4" />
                              مشاركة
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  {/* تبويب الفقه */}
                  <TabsContent value="fiqh" className="space-y-6">
                    {islamicContent.fiqh.map((item) => (
                      <Card key={item.id} className={`${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}>
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            {item.image && (
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                width={120}
                                height={80}
                                className="rounded-lg object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <CardTitle className={`text-lg mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                                {item.title}
                              </CardTitle>
                              <div className="flex items-center gap-4 text-sm">
                                <span
                                  className={`px-2 py-1 rounded text-xs ${isDarkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-700"}`}
                                >
                                  {item.category}
                                </span>
                                <span
                                  className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                                >
                                  <Clock className="w-4 h-4" />
                                  {item.readTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className={`leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {item.content}
                          </p>
                          <div className="flex items-center gap-2 mt-4">
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              اقرأ التفاصيل
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              حفظ
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <Share2 className="w-4 h-4" />
                              مشاركة
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* القسم الثاني: الخطب المصورة */}
            <div className="lg:col-span-1">
              <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                <div className="flex items-center gap-3 mb-6">
                  <Play className="w-6 h-6 text-red-600" />
                  <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>خطب ومحاضرات</h2>
                </div>

                {/* شريط البحث والفلترة */}
                <div className="space-y-4 mb-6">
                  <div className="flex">
                    <Input
                      type="text"
                      placeholder="ابحث في الخطب والمحاضرات..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 rounded-l-none"
                    />
                    <Button className="bg-red-600 hover:bg-red-700 rounded-r-lg rounded-l-none">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>

                  <select
                    value={selectedVideoCategory}
                    onChange={(e) => setSelectedVideoCategory(e.target.value)}
                    className={`w-full p-2 border rounded-lg ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    {videoCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* قائمة الفيديوهات */}
                <div className="space-y-4 max-h-[800px] overflow-y-auto">
                  {filteredVideos.map((video) => (
                    <Card
                      key={video.id}
                      className={`cursor-pointer hover:shadow-lg transition-all ${isDarkMode ? "bg-gray-700 border-gray-600 hover:bg-gray-650" : "bg-gray-50 hover:bg-gray-100"}`}
                    >
                      <CardContent className="p-4">
                        <div className="relative mb-3">
                          <Image
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            width={300}
                            height={180}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button
                              onClick={() => handleVideoPlay(video)}
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              <Play className="w-4 h-4 ml-1" />
                              تشغيل
                            </Button>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                            {video.duration}
                          </div>
                        </div>

                        <h3
                          className={`font-semibold text-sm mb-2 line-clamp-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                        >
                          {video.title}
                        </h3>

                        <p className={`text-xs mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {video.sheikh}
                        </p>

                        <p className={`text-xs mb-3 line-clamp-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {video.description}
                        </p>

                        <div className="flex items-center justify-between text-xs">
                          <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {video.views} مشاهدة
                          </span>
                          <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {video.uploadDate}
                          </span>
                        </div>

                        <div className="mt-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${isDarkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-700"}`}
                          >
                            {video.category}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredVideos.length === 0 && (
                  <div className="text-center py-8">
                    <Search className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                    <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>لا توجد نتائج للبحث</p>
                  </div>
                )}
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
