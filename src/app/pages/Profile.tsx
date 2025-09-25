import { useState } from "react";
import React from "react";
import { Button } from "../../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import { Input } from "../../shared/ui/input";
import { Label } from "../../shared/ui/label";
import { Badge } from "../../shared/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shared/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../../shared/ui/avatar";
import { 
  User, 
  Settings, 
  Trophy, 
  Target, 
  Award,
  Edit,
  Save,
  X,
  Camera,
  ArrowLeft
} from "lucide-react";
import Header from "../../shared/components/Header";

interface ProfileProps {
  onBackToDashboard?: () => void;
}

const Profile = ({ onBackToDashboard }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    joinDate: "",
    level: 0,
    xp: 0,
    streak: 0,
    completedLessons: 0,
    totalLessons: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize local demo profile (no API)
  React.useEffect(() => {
    setLoading(true);
    setError(null);
    const demo = {
      name: "Người dùng Demo",
      email: "demo@example.com",
      joinDate: "01/09/2025",
      level: 3,
      xp: 450,
      streak: 5,
      completedLessons: 12,
      totalLessons: 50,
    };
    setProfile(demo);
    setLoading(false);
  }, []);

  const [editData, setEditData] = useState(profile);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-8 text-center space-y-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-muted-foreground">Đang tải thông tin cá nhân...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-8 text-center space-y-8">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <div className="text-2xl">❌</div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Lỗi tải dữ liệu</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="w-full"
              >
                Thử lại
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profile);
  };

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profile);
    setIsEditing(false);
  };

  const achievements = [
    { name: "Người mới bắt đầu", description: "Hoàn thành bài học đầu tiên", earned: true, date: "15/01/2024" },
    { name: "Học viên chăm chỉ", description: "Học liên tiếp 7 ngày", earned: true, date: "22/01/2024" },
    { name: "Thành thạo cơ bản", description: "Hoàn thành 10 bài học", earned: true, date: "28/01/2024" },
    { name: "Chuyên gia ký hiệu", description: "Hoàn thành 50 bài học", earned: false, date: null },
    { name: "Người thầy", description: "Giúp đỡ 10 người khác", earned: false, date: null }
  ];

  const learningGoals = [
    { goal: "Học 20 bài học trong tháng này", progress: 15, target: 20, color: "bg-blue-600" },
    { goal: "Duy trì chuỗi học 30 ngày", progress: 7, target: 30, color: "bg-green-600" },
    { goal: "Đạt 2000 XP", progress: 1250, target: 2000, color: "bg-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onGoToProfile={() => {}} onGoToSettings={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBackToDashboard}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Dashboard
          </Button>
        </div>
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-blue-600 text-white text-2xl">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                    <Badge className="bg-blue-600 text-white">Cấp {profile.level}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{profile.xp}</div>
                      <div className="text-sm text-muted-foreground">XP</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{profile.streak}</div>
                      <div className="text-sm text-muted-foreground">Chuỗi ngày</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{profile.completedLessons}</div>
                      <div className="text-sm text-muted-foreground">Bài hoàn thành</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round((profile.completedLessons / profile.totalLessons) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Tiến độ</div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleEdit}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Chỉnh sửa
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">Thông tin</TabsTrigger>
              <TabsTrigger value="achievements">Thành tích</TabsTrigger>
              <TabsTrigger value="goals">Mục tiêu</TabsTrigger>
              <TabsTrigger value="settings">Cài đặt</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Thông tin cá nhân
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Họ và tên</Label>
                          <Input
                            id="name"
                            value={editData.name}
                            onChange={(e) => setEditData({...editData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({...editData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                          <Save className="w-4 h-4 mr-2" />
                          Lưu
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="w-4 h-4 mr-2" />
                          Hủy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Họ và tên</Label>
                          <p className="text-lg font-medium">{profile.name}</p>
                        </div>
                        <div>
                          <Label>Email</Label>
                          <p className="text-lg font-medium">{profile.email}</p>
                        </div>
                        <div>
                          <Label>Ngày tham gia</Label>
                          <p className="text-lg font-medium">{profile.joinDate}</p>
                        </div>
                        <div>
                          <Label>Cấp độ hiện tại</Label>
                          <p className="text-lg font-medium">Cấp {profile.level}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-blue-600" />
                    Thành tích
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border-2 ${
                          achievement.earned 
                            ? 'border-blue-200 bg-blue-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.earned ? 'bg-blue-600' : 'bg-gray-400'
                          }`}>
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{achievement.name}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            {achievement.earned && achievement.date && (
                              <p className="text-xs text-blue-600 mt-1">Đạt được: {achievement.date}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Mục tiêu học tập
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {learningGoals.map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{goal.goal}</span>
                          <span>{goal.progress}/{goal.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`${goal.color} h-3 rounded-full transition-all duration-300`}
                            style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    Cài đặt tài khoản
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Thông báo</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Nhận thông báo nhắc nhở học tập
                      </p>
                      <Button variant="outline" size="sm">
                        Bật thông báo
                      </Button>
                    </div>
                    
                    <div>
                      <Label>Ngôn ngữ giao diện</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Chọn ngôn ngữ hiển thị
                      </p>
                      <Button variant="outline" size="sm">
                        Tiếng Việt
                      </Button>
                    </div>
                    
                    <div>
                      <Label>Chế độ tối</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Chuyển đổi giao diện sáng/tối
                      </p>
                      <Button variant="outline" size="sm">
                        Tự động
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button variant="destructive" size="sm">
                      Xóa tài khoản
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
