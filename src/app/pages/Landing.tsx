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
  Handshake
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
      alert("Đăng ký thành công! Chuyển đến onboarding...");
      onGetStarted?.();
      setLoading(false);
    }, 1000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate signin process
    setTimeout(() => {
      alert("Đăng nhập thành công! Chuyển đến dashboard...");
      onGetStarted?.();
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
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
      {/* Header */}
      <header className="px-6 py-4 bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">GL</span>
              </div>
              <span className="text-2xl font-bold text-foreground">GoLearn</span>
            </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Tính năng</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">Về dự án</a>
            <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">Cộng đồng</a>
            <a href="#download" className="text-muted-foreground hover:text-foreground transition-colors">Tải ứng dụng</a>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => setShowAuthModal(true)}
              >
                Đăng nhập
              </Button>
               <Button 
                 onClick={() => setShowAuthModal(true)}
                 className="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90"
               >
                 Đăng ký
               </Button>
            </div>
          </nav>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="h-4 w-4" />
                <span>Ứng dụng học ngôn ngữ ký hiệu #1 Việt Nam</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Học ngôn ngữ ký hiệu Việt Nam –{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  vui, hiệu quả và đầy kết nối!
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Khám phá thế giới giao tiếp bằng ký hiệu qua video HD, bài học tương tác và trò chơi ngôn ngữ.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
               <Button 
                 size="lg" 
                 className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 shadow-lg"
                 onClick={handleGetStarted}
               >
                 <Play className="mr-2 h-5 w-5" />
                 Bắt đầu ngay
               </Button>
               <Button 
                 variant="outline" 
                 size="lg" 
                 className="text-lg px-8 py-6"
                 onClick={handleGoToDashboard}
               >
                 Tôi đã có tài khoản
               </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-muted-foreground">học viên</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-muted-foreground">bài học ký hiệu</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-muted-foreground">hài lòng</div>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-secondary/50 to-secondary/20 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-8xl">👋</div>
                <p className="text-xl font-semibold text-foreground">Xin chào!</p>
                <p className="text-muted-foreground">Học cùng những người bạn mới</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Tại sao chọn GoLearn?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Chúng tôi kết hợp công nghệ hiện đại với phương pháp giảng dạy hiệu quả
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center space-y-4 p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Video className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Video trực quan</h3>
              <p className="text-muted-foreground">Bài học HD, được hoạt hình hoá với giáo viên chuyên nghiệp</p>
            </Card>

            <Card className="text-center space-y-4 p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Gamification</h3>
              <p className="text-muted-foreground">XP, streak, bảng xếp hạng, huy hiệu để duy trì động lực</p>
            </Card>

            <Card className="text-center space-y-4 p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI feedback</h3>
              <p className="text-muted-foreground">Hệ thống nhận diện cử chỉ, gợi ý sửa sai thông minh</p>
            </Card>

            <Card className="text-center space-y-4 p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Cộng đồng</h3>
              <p className="text-muted-foreground">Học cùng người điếc và người nghe trong môi trường thân thiện</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Học viên nói gì về GoLearn</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Minh An",
                role: "Học viên",
                content: "GoLearn giúp tôi học ngôn ngữ ký hiệu một cách tự nhiên và thú vị. Video rất rõ ràng!",
                rating: 5
              },
              {
                name: "Thúy Hằng", 
                role: "Giáo viên",
                content: "Ứng dụng tuyệt vời để kết nối cộng đồng người điếc và người nghe. Rất recommend!",
                rating: 5
              },
              {
                name: "Đức Anh",
                role: "Phụ huynh", 
                content: "Con tôi rất thích học với GoLearn. Bé tiến bộ rất nhanh và luôn hào hứng.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Project Section */}
      <section id="about" className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Về dự án GoLearn</h2>
            <p className="text-xl text-muted-foreground">Kết nối cộng đồng người điếc và người nghe thông qua công nghệ</p>
          </div>

          {/* Project Vision & Mission */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center space-y-4 p-8 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Tầm nhìn</h3>
              <p className="text-muted-foreground">Trở thành nền tảng học ngôn ngữ ký hiệu hàng đầu Việt Nam, xóa bỏ rào cản giao tiếp giữa người điếc và người nghe.</p>
            </Card>

            <Card className="text-center space-y-4 p-8 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Sứ mệnh</h3>
              <p className="text-muted-foreground">Cung cấp công cụ học tập hiệu quả, dễ tiếp cận và thú vị để mọi người có thể học ngôn ngữ ký hiệu một cách tự nhiên.</p>
            </Card>

            <Card className="text-center space-y-4 p-8 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Cộng đồng</h3>
              <p className="text-muted-foreground">Xây dựng một cộng đồng học tập tích cực, nơi người điếc và người nghe cùng hỗ trợ nhau trong việc học hỏi.</p>
            </Card>
          </div>

          {/* Project Statistics */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-12 mb-16">
            <div className="text-center space-y-4 mb-12">
              <h3 className="text-3xl font-bold text-foreground">Thành tựu đạt được</h3>
              <p className="text-lg text-muted-foreground">Những con số ấn tượng sau 1 năm phát triển</p>
          </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Video ký hiệu được sản xuất</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Người dùng đăng ký</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Giáo viên tham gia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Độ hài lòng người dùng</div>
              </div>
            </div>
              </div>
              
          {/* Team Section */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-foreground">Đội ngũ phát triển</h3>
              <p className="text-lg text-muted-foreground">Những con người đam mê công nghệ và giáo dục</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <Card className="p-8 space-y-6 hover:shadow-lg transition-shadow border-2 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <GraduationCap className="h-12 w-12 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-foreground">Nguyễn Văn An</h4>
                  <p className="text-blue-600 font-medium">Project Manager & UX Designer</p>
                  <p className="text-sm text-muted-foreground">5+ năm kinh nghiệm trong giáo dục đặc biệt và thiết kế UX. Chuyên gia về accessibility và inclusive design.</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-blue-600">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-blue-600">
                    <Mail className="h-4 w-4" />
               </Button>
                </div>
            </Card>

              {/* Team Member 2 */}
              <Card className="p-8 space-y-6 hover:shadow-lg transition-shadow border-2 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-200 to-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Code className="h-12 w-12 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-foreground">Trần Thị Minh</h4>
                  <p className="text-green-600 font-medium">Lead Developer & AI Engineer</p>
                  <p className="text-sm text-muted-foreground">Chuyên gia AI và Machine Learning với 7+ năm kinh nghiệm. Phát triển hệ thống nhận diện cử chỉ tiên tiến.</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-green-600">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-green-600">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </Card>

              {/* Team Member 3 */}
              <Card className="p-8 space-y-6 hover:shadow-lg transition-shadow border-2 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-200 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Laptop className="h-12 w-12 text-purple-600" />
                </div>
              <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-foreground">Lê Đức Hùng</h4>
                  <p className="text-purple-600 font-medium">Frontend Developer & Content Creator</p>
                  <p className="text-sm text-muted-foreground">Chuyên gia React/TypeScript với niềm đam mê về trải nghiệm người dùng. Phụ trách phát triển giao diện và nội dung giáo dục.</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-purple-600">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-purple-600">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
                </div>
              </div>
              
          {/* Technology Stack */}
          <div className="mt-16 space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-foreground">Công nghệ sử dụng</h3>
              <p className="text-lg text-muted-foreground">Stack công nghệ hiện đại và đáng tin cậy</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                <div className="text-4xl">⚛️</div>
                <div>
                  <h4 className="font-semibold text-foreground">React + TypeScript</h4>
                  <p className="text-sm text-muted-foreground">Frontend framework mạnh mẽ</p>
                </div>
              </Card>
              
              <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                <div className="text-4xl">🤖</div>
                <div>
                  <h4 className="font-semibold text-foreground">TensorFlow.js</h4>
                  <p className="text-sm text-muted-foreground">AI nhận diện cử chỉ</p>
                </div>
              </Card>
              
              <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                <div className="text-4xl">🎨</div>
                <div>
                  <h4 className="font-semibold text-foreground">Tailwind CSS</h4>
                  <p className="text-sm text-muted-foreground">Thiết kế responsive đẹp</p>
                </div>
              </Card>
              
              <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                <div className="text-4xl">🔥</div>
                <div>
                  <h4 className="font-semibold text-foreground">Firebase</h4>
                  <p className="text-sm text-muted-foreground">Backend và database</p>
                </div>
            </Card>
          </div>
        </div>

          {/* Call to Action */}
          <div className="mt-16 text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">Tham gia cùng chúng tôi</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                GoLearn không chỉ là một ứng dụng, mà là một phong trào xã hội nhằm tạo ra một thế giới kết nối hơn.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90"
                onClick={handleGetStarted}
              >
                <Play className="mr-2 h-5 w-5" />
                Bắt đầu học ngay
                  </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
              >
                <Github className="mr-2 h-5 w-5" />
                Xem mã nguồn
                  </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Methodology Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Phương pháp học tiên tiến</h2>
            <p className="text-xl text-muted-foreground">Dựa trên nghiên cứu khoa học và kinh nghiệm thực tế từ chuyên gia</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 space-y-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mx-auto">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground text-center">Visual Learning</h3>
              <p className="text-muted-foreground text-center">Sử dụng memory palace và visual association để ghi nhớ lâu dài. Mỗi ký hiệu được liên kết với hình ảnh và ngữ cảnh cụ thể trong cuộc sống.</p>
              <div className="text-center">
                <Badge variant="secondary" className="text-xs">Hiệu quả 85%</Badge>
              </div>
            </Card>

            <Card className="p-8 space-y-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground text-center">Spaced Repetition</h3>
              <p className="text-muted-foreground text-center">Hệ thống lặp lại cách quãng thông minh dựa trên đường cong망각 Ebbinghaus, giúp chuyển từ bộ nhớ ngắn hạn sang dài hạn hiệu quả.</p>
              <div className="text-center">
                <Badge variant="secondary" className="text-xs">Tăng 60% ghi nhớ</Badge>
              </div>
            </Card>

            <Card className="p-8 space-y-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground text-center">Microlearning</h3>
              <p className="text-muted-foreground text-center">Học theo từng phần nhỏ 5-10 phút mỗi ngày. Phù hợp với lối sống bận rộn và tăng khả năng tập trung theo nghiên cứu neuroscience.</p>
              <div className="text-center">
                <Badge variant="secondary" className="text-xs">Tiết kiệm 40% thời gian</Badge>
              </div>
            </Card>
          </div>

          {/* Advanced Features */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12">
            <div className="text-center space-y-4 mb-12">
              <h3 className="text-3xl font-bold text-foreground">Công nghệ AI tiên tiến</h3>
              <p className="text-lg text-muted-foreground">Hệ thống học máy được đào tạo trên 100,000+ video ký hiệu</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-foreground">Computer Vision</h4>
                <p className="text-sm text-muted-foreground">Nhận diện cử chỉ với độ chính xác 96%</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Lightbulb className="h-8 w-8 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-foreground">Adaptive Learning</h4>
                <p className="text-sm text-muted-foreground">Điều chỉnh tốc độ theo năng lực cá nhân</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-foreground">Progress Analytics</h4>
                <p className="text-sm text-muted-foreground">Phân tích chi tiết tiến độ học tập</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Gamepad2 className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-foreground">Gamification</h4>
                <p className="text-sm text-muted-foreground">XP, streaks, leaderboards và rewards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rich Learning Resources Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Tài nguyên học tập phong phú</h2>
            <p className="text-xl text-muted-foreground">Từ cơ bản đến chuyên sâu, phù hợp với mọi đối tượng và mục tiêu</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground text-center">Video Library</h3>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-blue-600">1,200+</div>
                <p className="text-sm text-muted-foreground">Video bài học HD được phân loại theo cấp độ và chủ đề</p>
              </div>
              <Button variant="outline" size="sm" className="w-full group">
                Khám phá <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground text-center">Interactive Quizzes</h3>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-green-600">3,500+</div>
                <p className="text-sm text-muted-foreground">Câu hỏi và mini-games tương tác với nhiều định dạng khác nhau</p>
              </div>
              <Button variant="outline" size="sm" className="w-full group">
                Thử ngay <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mx-auto">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground text-center">Study Materials</h3>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-purple-600">500+</div>
                <p className="text-sm text-muted-foreground">Tài liệu học tập, flashcards và bài tập thực hành</p>
              </div>
              <Button variant="outline" size="sm" className="w-full group">
                Tải về <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto">
                <Camera className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground text-center">AI Practice</h3>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-orange-600">24/7</div>
                <p className="text-sm text-muted-foreground">Luyện tập với AI coach và nhận feedback real-time</p>
              </div>
              <Button variant="outline" size="sm" className="w-full group">
                Luyện tập <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </div>

          {/* Curriculum Overview */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-foreground">Chương trình học bài bản</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Alphabet & Cơ bản (Level 1-2)</h4>
                    <p className="text-sm text-muted-foreground">Học 26 chữ cái và 200 từ vựng cơ bản trong cuộc sống hàng ngày</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">15 bài học</Badge>
                      <Badge variant="outline" className="text-xs">~2 tuần</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Giao tiếp thường ngày (Level 3-5)</h4>
                    <p className="text-sm text-muted-foreground">Hội thoại cơ bản, giới thiệu bản thân, hỏi đường, mua sắm</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">25 bài học</Badge>
                      <Badge variant="outline" className="text-xs">~1 tháng</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Nâng cao & Chuyên ngành (Level 6+)</h4>
                    <p className="text-sm text-muted-foreground">Y tế, giáo dục, pháp lý, kinh doanh và giao tiếp phức tạp</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">40+ bài học</Badge>
                      <Badge variant="outline" className="text-xs">Không giới hạn</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <h4 className="text-xl font-bold text-foreground mb-6 text-center">Thống kê học tập</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">96%</div>
                  <div className="text-sm text-muted-foreground">Hoàn thành khóa học</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">4.8★</div>
                  <div className="text-sm text-muted-foreground">Đánh giá trung bình</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">30</div>
                  <div className="text-sm text-muted-foreground">Ngày trung bình</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                  <div className="text-sm text-muted-foreground">Tiến bộ rõ rệt</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-indigo-200">
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90">
                  <Rocket className="h-4 w-4 mr-2" />
                  Bắt đầu học ngay
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories & Social Impact */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Câu chuyện thành công & Tác động xã hội</h2>
            <p className="text-xl text-muted-foreground">Những thay đổi tích cực mà GoLearn mang lại cho cộng đồng</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            {/* Success Stories */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-foreground">Câu chuyện truyền cảm hứng</h3>
              
              <Card className="p-6 space-y-4 border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Kết nối gia đình</h4>
                    <p className="text-sm text-muted-foreground">Chị Lan, 32 tuổi - Hà Nội</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"Con tôi sinh ra đã khiếm thính. Trước đây, chúng tôi chỉ giao tiếp bằng cử chỉ đơn giản. Nhờ GoLearn, cả gia đình đã học được NNKH và giờ chúng tôi có thể trò chuyện về mọi thứ - từ bài học ở trường đến ước mơ tương lai của con."</p>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-700">Đã học 8 tháng</Badge>
                  <Badge className="bg-green-100 text-green-700">Hoàn thành Level 5</Badge>
                </div>
              </Card>

              <Card className="p-6 space-y-4 border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <School className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Giáo viên tình nguyện</h4>
                    <p className="text-sm text-muted-foreground">Thầy Minh, 28 tuổi - TP.HCM</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"Tôi làm việc tại trường chuyên biệt 5 năm nhưng chỉ biết NNKH cơ bản. GoLearn đã giúp tôi nâng cao kỹ năng và hiểu sâu hơn về văn hóa người Điếc. Giờ tôi có thể hỗ trợ học sinh tốt hơn và thậm chí đào tạo cho các đồng nghiệp khác."</p>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-700">Chứng chỉ GoLearn Pro</Badge>
                  <Badge className="bg-purple-100 text-purple-700">Trainer Program</Badge>
                </div>
              </Card>

              <Card className="p-6 space-y-4 border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Môi trường làm việc inclusive</h4>
                    <p className="text-sm text-muted-foreground">Anh Đức, 35 tuổi - Đà Nẵng</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"Công ty tôi có 2 đồng nghiệp khiếm thính tài năng nhưng giao tiếp khó khăn. Tôi đã thuyết phục cả team học NNKH qua GoLearn. Sau 3 tháng, productivity của team tăng 40% và môi trường làm việc trở nên gắn kết hơn rất nhiều."</p>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-purple-100 text-purple-700">Corporate Program</Badge>
                  <Badge className="bg-orange-100 text-orange-700">Team Leader</Badge>
                </div>
              </Card>
            </div>

            {/* Social Impact Metrics */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-foreground">Tác động xã hội</h3>
              
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <h4 className="text-xl font-bold text-foreground mb-6 text-center">Chương trình Xã hội</h4>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span className="text-muted-foreground">Miễn phí 100% cho học sinh khiếm thính</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span className="text-muted-foreground">Đào tạo giáo viên & tình nguyện viên</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span className="text-muted-foreground">Hỗ trợ trường học chuyên biệt</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span className="text-muted-foreground">Workshop cộng đồng định kỳ</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span className="text-muted-foreground">Chương trình doanh nghiệp inclusive</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90">
                  <Handshake className="h-4 w-4 mr-2" />
                  Tham gia chương trình
                </Button>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="text-3xl font-bold text-green-600 mb-2">5,200+</div>
                  <div className="text-sm text-muted-foreground">Học sinh được hỗ trợ miễn phí</div>
                  <TrendingUp className="h-4 w-4 text-green-600 mx-auto mt-2" />
                </Card>
                <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="text-3xl font-bold text-blue-600 mb-2">320+</div>
                  <div className="text-sm text-muted-foreground">Giáo viên được đào tạo</div>
                  <GraduationCap className="h-4 w-4 text-blue-600 mx-auto mt-2" />
                </Card>
                <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-violet-50">
                  <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
                  <div className="text-sm text-muted-foreground">Trường học tham gia</div>
                  <Building className="h-4 w-4 text-purple-600 mx-auto mt-2" />
                </Card>
                <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-red-50">
                  <div className="text-3xl font-bold text-orange-600 mb-2">48</div>
                  <div className="text-sm text-muted-foreground">Workshop & event/năm</div>
                  <Calendar className="h-4 w-4 text-orange-600 mx-auto mt-2" />
                </Card>
              </div>

              <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Crown className="h-6 w-6 text-yellow-600" />
                  <h4 className="font-bold text-foreground">Giải thưởng & Công nhận</h4>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>🏆 "App của năm" - Vietnam ICT Awards 2023</div>
                  <div>🌟 "Social Impact Award" - TechForGood 2023</div>
                  <div>📱 "Best Accessibility App" - Apple App Store</div>
                  <div>🤝 Công nhận từ Hiệp hội Người khiếm thính VN</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility & Platform Compatibility */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Accessibility & Đa nền tảng</h2>
            <p className="text-xl text-muted-foreground">Thiết kế cho mọi người, hoạt động trên mọi thiết bị</p>
          </div>

          {/* Accessibility Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Accessibility className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">WCAG 2.1 AAA</h3>
              <p className="text-sm text-muted-foreground">Tuân thủ tiêu chuẩn accessibility quốc tế cao nhất cho người khuyết tật</p>
              <Badge variant="outline" className="text-xs">Chứng nhận quốc tế</Badge>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto">
                <Headphones className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Screen Reader</h3>
              <p className="text-sm text-muted-foreground">Hỗ trợ VoiceOver, TalkBack, NVDA và tất cả screen readers phổ biến</p>
              <Badge variant="outline" className="text-xs">100% tương thích</Badge>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mx-auto">
                <Languages className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Đa ngôn ngữ</h3>
              <p className="text-sm text-muted-foreground">Giao diện tiếng Việt, English và đang mở rộng sang 8 ngôn ngữ khác</p>
              <Badge variant="outline" className="text-xs">Quốc tế hóa</Badge>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto">
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Visual Support</h3>
              <p className="text-sm text-muted-foreground">High contrast, large text, color blind support, dark/light mode</p>
              <Badge variant="outline" className="text-xs">Tùy chỉnh toàn diện</Badge>
            </Card>
          </div>

          {/* Platform Compatibility */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Smartphone className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Mobile Apps</h3>
                <p className="text-muted-foreground">iOS 14+ và Android 8+</p>
                <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <WifiOff className="h-4 w-4" />
                    <span>Offline mode</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Camera className="h-4 w-4" />
                    <span>Camera integration</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Push notifications</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto">
                <Tablet className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Tablets</h3>
                <p className="text-muted-foreground">iPad & Android Tablet</p>
                <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <Monitor className="h-4 w-4" />
                    <span>Optimized for large screens</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Users2 className="h-4 w-4" />
                    <span>Multi-user support</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Gamepad2 className="h-4 w-4" />
                    <span>Split-screen mode</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mx-auto">
                <Monitor className="h-10 w-10 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Web Platform</h3>
                <p className="text-muted-foreground">Chrome, Safari, Firefox, Edge</p>
                <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <Wifi className="h-4 w-4" />
                    <span>Progressive Web App</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>No installation required</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Activity className="h-4 w-4" />
                    <span>Real-time sync</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Technical Specifications */}
          <Card className="p-8 bg-gradient-to-r from-gray-50 to-slate-100">
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">Thông số kỹ thuật & Bảo mật</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Server className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime guarantee</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">&lt; 100ms</div>
                <div className="text-sm text-muted-foreground">Average response time</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">AES-256</div>
                <div className="text-sm text-muted-foreground">End-to-end encryption</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Download className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-600">&lt; 30MB</div>
                <div className="text-sm text-muted-foreground">App download size</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Enhanced App Download Section */}
      <section id="download" className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 rounded-3xl p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">🚀 Ra mắt phiên bản 2.0</Badge>
                  <h2 className="text-4xl font-bold text-foreground">Bắt đầu hành trình ngay hôm nay</h2>
                  <p className="text-xl text-muted-foreground">
                    Tải ứng dụng GoLearn miễn phí và tham gia cộng đồng 50,000+ người học ngôn ngữ ký hiệu
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-muted-foreground">Miễn phí 100% tất cả tính năng cơ bản</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-muted-foreground">Không cần thẻ tín dụng, đăng ký trong 30 giây</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-muted-foreground">Hoạt động offline, học mọi lúc mọi nơi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-muted-foreground">AI coach cá nhân và community support</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="flex items-center justify-center space-x-3 px-6 py-4 bg-black hover:bg-gray-800 text-white">
                      <div className="text-2xl">📱</div>
                      <div className="text-left">
                        <div className="text-xs">Download on the</div>
                        <div className="font-semibold">App Store</div>
                      </div>
                    </Button>
                    <Button className="flex items-center justify-center space-x-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white">
                      <div className="text-2xl">🤖</div>
                      <div className="text-left">
                        <div className="text-xs">Get it on</div>
                        <div className="font-semibold">Google Play</div>
                      </div>
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto px-6 py-4 border-2">
                    <Monitor className="h-5 w-5 mr-2" />
                    Hoặc sử dụng trên Web
                  </Button>
                </div>

                <div className="flex items-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">4.8★</div>
                    <div className="text-xs text-muted-foreground">App Store</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">4.9★</div>
                    <div className="text-xs text-muted-foreground">Google Play</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">50K+</div>
                    <div className="text-xs text-muted-foreground">Downloads</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="text-9xl">📱</div>
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Học ngôn ngữ ký hiệu trên mọi thiết bị</h3>
                  <p className="text-muted-foreground">iPhone • Android • iPad • Web • Apple Watch</p>
                </div>
                
                <Card className="p-4 bg-white/50 backdrop-blur-sm border border-white/20">
                  <div className="text-sm text-muted-foreground">
                    <div className="font-semibold mb-2">🎁 Ưu đãi đặc biệt cho người dùng mới:</div>
                    <div>• 14 ngày Premium miễn phí</div>
                    <div>• Khóa học "Alphabet" hoàn toàn free</div>
                    <div>• 1-on-1 coaching session với expert</div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">GL</span>
              </div>
              <span className="text-2xl font-bold text-foreground">GoLearn</span>
            </div>
              <p className="text-muted-foreground max-w-sm">
                Ứng dụng học ngôn ngữ ký hiệu Việt Nam hàng đầu, kết nối cộng đồng người điếc và người nghe.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Về chúng tôi</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Giới thiệu</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Đội ngũ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tuyển dụng</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tin tức</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Sản phẩm</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Ngôn ngữ ký hiệu Việt Nam</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Hỗ trợ phụ huynh</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Người học khiếm thính</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Giáo viên</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Hỗ trợ</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Liên hệ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Chính sách bảo mật</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Điều khoản sử dụng</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground">
              © 2024 GoLearn. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Facebook</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">YouTube</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Bắt đầu học ngay</CardTitle>
              <CardDescription>
                Tạo tài khoản miễn phí để bắt đầu hành trình học ngôn ngữ ký hiệu
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                        placeholder="your.email@example.com"
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
                      {loading ? "Đang đăng ký..." : "Tạo tài khoản miễn phí"}
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
                        placeholder="your.email@example.com"
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
                      {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <div className="p-6 pt-0">
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