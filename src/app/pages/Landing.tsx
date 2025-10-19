import { useState } from "react";
import { Button } from "../../shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shared/ui/card";
import { Input } from "../../shared/ui/input";
import { Label } from "../../shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shared/ui/tabs";
import { Badge } from "../../shared/ui/badge";
import { 
  Play, 
  Trophy, 
  Bot, 
  Heart, 
  Star, 
  Check, 
  Download,
  Menu,
  Video,
  Users,
  Target,
  Code,
  Laptop,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  BookOpen,
  Brain,
  Headphones,
  Calendar,
  Zap,
  Camera,
  BarChart3,
  Smartphone,
  Tablet,
  Monitor,
  ArrowRight,
  Lightbulb,
  Gamepad2,
  FileText,
  Eye,
  Accessibility,
  Languages,
  Wifi,
  WifiOff,
  Lock,
  Server,
  Activity,
  Briefcase,
  School,
  Building,
  Users2,
  TrendingUp,
  Sparkles,
  Rocket,
  Crown,
  Handshake,
  Apple,
  Facebook,
  Phone,
  MapPin
} from "lucide-react";

interface LandingProps {
  onGetStarted?: () => void;
  onGoToDashboard?: () => void;
}

const Landing = ({ onGetStarted, onGoToDashboard }: LandingProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      alert("Đăng ký demo thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất!");
      onGetStarted?.();
      setLoading(false);
    }, 1000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate signin process
    setTimeout(() => {
      alert("Đăng nhập demo thành công! Chào mừng bạn đến với GoLearn!");
      onGoToDashboard?.();
      setLoading(false);
    }, 1000);
  };

  const handleGetStarted = () => {
    onGetStarted?.();
  };

  const handleGoToDashboard = () => {
    onGoToDashboard?.();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GL</span>
              </div>
            <span className="text-xl font-bold text-gray-900">GoLearn</span>
            </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Tính năng</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">Giới thiệu</a>
            <a href="#demo" className="text-gray-600 hover:text-gray-900 transition-colors">Demo</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Liên hệ</a>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => setShowAuthModal(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                Đăng nhập
              </Button>
               <Button 
                 onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
               >
                Thử Demo
               </Button>
            </div>
          </nav>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              <span className="block">Học ngôn ngữ ký hiệu Việt Nam</span>
              <span className="block text-blue-600">và bắt đầu xây dựng cầu nối!</span>
              </h1>
              
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button 
                 size="lg" 
                className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                 onClick={handleGetStarted}
               >
                Xem Demo
               </Button>
              <Button 
                 size="lg" 
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                 onClick={handleGoToDashboard}
               >
                Đã có tài khoản
               </Button>
            </div>
              </div>
              </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Đây là<br />cách<br />hoạt động</h2>
              </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center space-y-4 p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-semibold text-orange-500">Kỹ năng giao tiếp thực tế</h3>
              <p className="text-sm lg:text-base text-gray-600">Đắm mình trong ngôn ngữ ký hiệu thông qua các cuộc hội thoại tương tác và hữu ích giúp bạn giao tiếp nhanh chóng.</p>
            </div>

            <div className="text-center space-y-4 p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-semibold text-orange-600">Ghi nhớ những gì đã học</h3>
              <p className="text-sm lg:text-base text-gray-600">Sử dụng bộ luyện từ vựng của chúng tôi để củng cố trí nhớ và giữ lại kiến thức lâu dài.</p>
          </div>

            <div className="text-center space-y-4 p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-semibold text-red-500">Từ điển NNKH</h3>
              <p className="text-sm lg:text-base text-gray-600">Muốn tra cứu một ký hiệu hoặc câu cụ thể? Không vấn đề - từ điển <em>Ngôn ngữ ký hiệu Việt Nam</em> của chúng tôi sẽ giúp bạn.</p>
              </div>

            <div className="text-center space-y-4 p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-semibold text-red-600">Ký hiệu với tự tin</h3>
              <p className="text-sm lg:text-base text-gray-600">Không chắc chắn bạn có đang ký hiệu đúng cách? Cải thiện kỹ thuật với gương ký hiệu GoLearn và tự tin ký hiệu!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Vấn đề & Giải pháp</h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <h3 className="font-semibold text-red-700 mb-2">Vấn đề hiện tại</h3>
                  <p className="text-gray-600">
                    Hơn 1 triệu người khiếm thính tại Việt Nam gặp khó khăn trong giao tiếp với cộng đồng nghe. 
                    Thiếu nguồn học Ngôn ngữ ký hiệu Việt Nam (NNKH) chất lượng và dễ tiếp cận.
            </p>
          </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <h3 className="font-semibold text-green-700 mb-2">Giải pháp GoLearn</h3>
                  <p className="text-gray-600">
                    Nền tảng học NNKH tương tác với AI, video HD và hệ thống gamification giúp mọi người 
                    học ngôn ngữ ký hiệu một cách hiệu quả và thú vị.
                  </p>
              </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white">
                  <Play className="h-4 w-4 mr-2" />
                  Xem Demo
                </Button>
                <Button variant="outline" className="px-6 py-3 border-blue-600 text-blue-600 hover:bg-blue-50" onClick={handleGoToDashboard}>
                  Đã có tài khoản
                </Button>
              </div>
              </div>
            <div className="text-center">
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Cơ hội thị trường</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Thị trường lớn",
                content: "1.2 triệu người khiếm thính + 98 triệu người nghe tại Việt Nam",
                icon: ""
              },
              {
                title: "Nhu cầu cao",
                content: "90% người khiếm thính gặp khó khăn trong giao tiếp hàng ngày",
                icon: ""
              },
              {
                title: "Cạnh tranh thấp",
                content: "Chưa có nền tảng học NNKH chuyên nghiệp nào tại Việt Nam",
                icon: ""
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 lg:p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm lg:text-base">{item.content}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 lg:mb-8">Xây dựng cầu nối</h2>
          <div className="text-6xl lg:text-8xl mb-6 lg:mb-8">🤝</div>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-6 lg:mb-8">
            Sứ mệnh của chúng tôi là giúp bạn kết nối với các thành viên gia đình, bạn bè, đồng nghiệp và hàng xóm khiếm thính. Bắt đầu học Ngôn ngữ ký hiệu Việt Nam ngay bây giờ và giúp xây dựng cầu nối.
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
              className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                onClick={handleGetStarted}
              >
              Xem Demo
                  </Button>
              <Button 
                size="lg" 
              variant="outline"
              className="text-lg px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={handleGoToDashboard}
              >
              Đã có tài khoản
                  </Button>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Công nghệ tiên tiến</h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Sử dụng các công nghệ AI và Machine Learning hiện đại nhất để tạo ra trải nghiệm học tập tối ưu
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900">AI & ML</h3>
              <p className="text-sm text-gray-600">TensorFlow.js, Computer Vision, Gesture Recognition</p>
            </div>

            <div className="text-center space-y-4 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900">Frontend</h3>
              <p className="text-sm text-gray-600">React, TypeScript, Tailwind CSS, Progressive Web App</p>
            </div>

            <div className="text-center space-y-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900">Backend</h3>
              <p className="text-sm text-gray-600">Firebase, Cloud Functions, Real-time Database</p>
            </div>

            <div className="text-center space-y-4 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900">Cross-platform</h3>
              <p className="text-sm text-gray-600">Web, iOS, Android, Desktop compatibility</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Lộ trình phát triển</h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Kế hoạch phát triển GoLearn trong 12 tháng tới với các mốc quan trọng
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              {/* Q1 2025 */}
              <div className="flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Q1 2025</h3>
                    <h4 className="font-semibold text-gray-900 mb-2">MVP Launch</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Phát hành phiên bản beta</li>
                      <li>• 100 bài học cơ bản</li>
                      <li>• AI nhận diện cử chỉ</li>
                    </ul>
                  </div>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* Q2 2025 */}
              <div className="flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="w-8 h-8 bg-green-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">Q2 2025</h3>
                    <h4 className="font-semibold text-gray-900 mb-2">Feature Enhancement</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Gamification system</li>
                      <li>• Community features</li>
                      <li>• Mobile app launch</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Q3 2025 */}
              <div className="flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-purple-600 mb-2">Q3 2025</h3>
                    <h4 className="font-semibold text-gray-900 mb-2">Scale & Optimize</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 1000+ bài học</li>
                      <li>• AI tutor cá nhân</li>
                      <li>• Partnership với trường học</li>
                    </ul>
                  </div>
                </div>
                <div className="w-8 h-8 bg-purple-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* Q4 2025 */}
              <div className="flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="w-8 h-8 bg-orange-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Q4 2025</h3>
                    <h4 className="font-semibold text-gray-900 mb-2">Market Expansion</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Mở rộng ra thị trường Đông Nam Á</li>
                      <li>• Enterprise solutions</li>
                      <li>• Series A funding</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Câu chuyện thành công</h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Những thay đổi tích cực mà GoLearn mang lại cho cộng đồng
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border-l-4 border-blue-500">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Kết nối gia đình</h3>
                  <p className="text-sm text-gray-600">Chị Lan, 32 tuổi - Hà Nội</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "Con tôi sinh ra đã khiếm thính. Trước đây, chúng tôi chỉ giao tiếp bằng cử chỉ đơn giản. 
                Nhờ GoLearn, cả gia đình đã học được NNKH và giờ chúng tôi có thể trò chuyện về mọi thứ."
              </p>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Đã học 8 tháng</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">Hoàn thành Level 5</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border-l-4 border-green-500">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <School className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Giáo dục hòa nhập</h3>
                  <p className="text-sm text-gray-600">Trường Tiểu học Hòa Bình - TP.HCM</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "GoLearn đã giúp chúng tôi tích hợp NNKH vào chương trình giảng dạy. 
                Tỷ lệ hòa nhập của học sinh khiếm thính tăng 80% trong học kỳ vừa qua."
              </p>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">120 học sinh</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">15 giáo viên</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Team Section */}
      <section id="community" className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Cộng đồng & Đội ngũ</h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Đội ngũ đam mê công nghệ và cộng đồng hỗ trợ mạnh mẽ đằng sau GoLearn
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nguyễn Văn An</h3>
              <p className="text-blue-600 font-medium mb-2">Project Manager & UX Designer</p>
              <p className="text-sm text-gray-600">5+ năm kinh nghiệm trong giáo dục đặc biệt và thiết kế UX</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-200 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trần Thị Minh</h3>
              <p className="text-green-600 font-medium mb-2">Lead Developer & AI Engineer</p>
              <p className="text-sm text-gray-600">Chuyên gia AI và Machine Learning với 7+ năm kinh nghiệm</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-200 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Laptop className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lê Đức Hùng</h3>
              <p className="text-purple-600 font-medium mb-2">Frontend Developer & Content Creator</p>
              <p className="text-sm text-gray-600">Chuyên gia React/TypeScript với niềm đam mê về UX</p>
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Người dùng đăng ký</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Giáo viên tham gia</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Độ hài lòng</div>
              </div>
            </div>
          </div>

          {/* Community Actions */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg">
                <Users className="h-5 w-5 mr-2" />
                Tham gia cộng đồng
              </Button>
              <Button variant="outline" className="px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg" onClick={handleGoToDashboard}>
                Đã có tài khoản
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Partnership Section */}
      <section id="contact" className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Liên hệ & Đối tác</h2>
            <p className="text-base lg:text-lg text-blue-100 max-w-3xl mx-auto">
              Hãy liên hệ với chúng tôi để tìm hiểu về cơ hội hợp tác và đầu tư
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-blue-100 text-sm">contact@golearn.vn</p>
              <p className="text-blue-200 text-xs mt-1">Phản hồi trong 24h</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Điện thoại</h3>
              <p className="text-blue-100 text-sm">+84 123 456 789</p>
              <p className="text-blue-200 text-xs mt-1">Thứ 2-6, 8:00-18:00</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Địa chỉ</h3>
              <p className="text-blue-100 text-sm">123 Nguyễn Huệ, Q1</p>
              <p className="text-blue-200 text-xs mt-1">TP. Hồ Chí Minh</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold">Về dự án</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tầm nhìn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Đội ngũ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Lộ trình phát triển</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Đối tác</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Demo & Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#demo" className="hover:text-white transition-colors">Đặt lịch Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tài liệu kỹ thuật</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Cộng đồng</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Pháp lý</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bản quyền</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GL</span>
            </div>
              <span className="text-xl font-bold">GoLearn</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 GoLearn. Tất cả quyền được bảo lưu.
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] flex flex-col">
            <CardHeader className="text-center flex-shrink-0">
            <CardTitle className="text-2xl">Đăng ký Demo</CardTitle>
              <CardDescription>
              Đăng ký để được xem demo và tìm hiểu về dự án GoLearn
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup">Đăng ký</TabsTrigger>
                  <TabsTrigger value="signin">Đăng nhập</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-signup">Email</Label>
                      <Input
                        id="email-signup"
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signup">Mật khẩu</Label>
                      <Input
                        id="password-signup"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Đang đăng ký..." : "Đăng ký Demo"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-signin">Email</Label>
                      <Input
                        id="email-signin"
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signin">Mật khẩu</Label>
                      <Input
                        id="password-signin"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Đang đăng nhập..." : "Đăng nhập Demo"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <div className="p-6 pt-0 flex-shrink-0">
              <Button 
                variant="ghost" 
                className="w-full" 
                onClick={() => setShowAuthModal(false)}
              >
                Đóng
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Landing;