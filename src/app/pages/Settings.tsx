import { useState } from "react";
import { Button } from "../../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
 
import { Label } from "../../shared/ui/label";
import { Switch } from "../../shared/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shared/ui/tabs";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Moon, 
  Volume2, 
  Shield, 
  Download,
  Trash2,
  Save,
  ArrowLeft
} from "lucide-react";
import Header from "../../shared/components/Header";

interface SettingsProps {
  onBackToDashboard?: () => void;
}

const Settings = ({ onBackToDashboard }: SettingsProps) => {
  const [settings, setSettings] = useState({
    notifications: {
      dailyReminder: true,
      lessonComplete: true,
      streakWarning: true,
      achievement: true,
      emailUpdates: false
    },
    appearance: {
      theme: "auto",
      language: "vi",
      fontSize: "medium"
    },
    audio: {
      soundEffects: true,
      voiceGuidance: true,
      volume: 70
    },
    privacy: {
      dataCollection: true,
      analytics: true,
      crashReports: true
    }
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handleAppearanceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value
      }
    }));
  };

  const handleAudioChange = (key: string, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      audio: {
        ...prev.audio,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    alert("Cài đặt đã được lưu!");
  };

  const handleExportData = () => {
    // Export data logic here
    alert("Dữ liệu đã được xuất!");
  };

  const handleDeleteAccount = () => {
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.")) {
      alert("Tài khoản đã được xóa!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={onBackToDashboard}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Cài đặt</h1>
              <p className="text-muted-foreground">Quản lý tài khoản và tùy chọn ứng dụng</p>
            </div>
          </div>

          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="notifications">Thông báo</TabsTrigger>
              <TabsTrigger value="appearance">Giao diện</TabsTrigger>
              <TabsTrigger value="audio">Âm thanh</TabsTrigger>
              <TabsTrigger value="privacy">Quyền riêng tư</TabsTrigger>
              <TabsTrigger value="account">Tài khoản</TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Thông báo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Nhắc nhở học tập hàng ngày</Label>
                        <p className="text-sm text-muted-foreground">
                          Nhận thông báo nhắc nhở học tập mỗi ngày
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.dailyReminder}
                        onCheckedChange={(value) => handleNotificationChange('dailyReminder', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Hoàn thành bài học</Label>
                        <p className="text-sm text-muted-foreground">
                          Thông báo khi hoàn thành bài học
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.lessonComplete}
                        onCheckedChange={(value) => handleNotificationChange('lessonComplete', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Cảnh báo chuỗi ngày</Label>
                        <p className="text-sm text-muted-foreground">
                          Thông báo khi chuỗi ngày học có nguy cơ bị mất
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.streakWarning}
                        onCheckedChange={(value) => handleNotificationChange('streakWarning', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Thành tích mới</Label>
                        <p className="text-sm text-muted-foreground">
                          Thông báo khi đạt được thành tích mới
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.achievement}
                        onCheckedChange={(value) => handleNotificationChange('achievement', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Cập nhật qua email</Label>
                        <p className="text-sm text-muted-foreground">
                          Nhận bản tin và cập nhật qua email
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.emailUpdates}
                        onCheckedChange={(value) => handleNotificationChange('emailUpdates', value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-blue-600" />
                    Giao diện
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Chủ đề</Label>
                      <Select 
                        value={settings.appearance.theme} 
                        onValueChange={(value) => handleAppearanceChange('theme', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Sáng</SelectItem>
                          <SelectItem value="dark">Tối</SelectItem>
                          <SelectItem value="auto">Tự động</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Ngôn ngữ</Label>
                      <Select 
                        value={settings.appearance.language} 
                        onValueChange={(value) => handleAppearanceChange('language', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vi">Tiếng Việt</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Cỡ chữ</Label>
                      <Select 
                        value={settings.appearance.fontSize} 
                        onValueChange={(value) => handleAppearanceChange('fontSize', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Nhỏ</SelectItem>
                          <SelectItem value="medium">Trung bình</SelectItem>
                          <SelectItem value="large">Lớn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audio" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-blue-600" />
                    Âm thanh
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Hiệu ứng âm thanh</Label>
                        <p className="text-sm text-muted-foreground">
                          Phát âm thanh khi tương tác với ứng dụng
                        </p>
                      </div>
                      <Switch
                        checked={settings.audio.soundEffects}
                        onCheckedChange={(value) => handleAudioChange('soundEffects', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Hướng dẫn bằng giọng nói</Label>
                        <p className="text-sm text-muted-foreground">
                          Phát hướng dẫn bằng giọng nói trong bài học
                        </p>
                      </div>
                      <Switch
                        checked={settings.audio.voiceGuidance}
                        onCheckedChange={(value) => handleAudioChange('voiceGuidance', value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Âm lượng ({settings.audio.volume}%)</Label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.audio.volume}
                        onChange={(e) => handleAudioChange('volume', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Quyền riêng tư
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Thu thập dữ liệu học tập</Label>
                        <p className="text-sm text-muted-foreground">
                          Cho phép thu thập dữ liệu để cải thiện trải nghiệm học tập
                        </p>
                      </div>
                      <Switch
                        checked={settings.privacy.dataCollection}
                        onCheckedChange={(value) => handlePrivacyChange('dataCollection', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Phân tích sử dụng</Label>
                        <p className="text-sm text-muted-foreground">
                          Gửi dữ liệu phân tích để cải thiện ứng dụng
                        </p>
                      </div>
                      <Switch
                        checked={settings.privacy.analytics}
                        onCheckedChange={(value) => handlePrivacyChange('analytics', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Báo cáo lỗi</Label>
                        <p className="text-sm text-muted-foreground">
                          Tự động gửi báo cáo lỗi để cải thiện ứng dụng
                        </p>
                      </div>
                      <Switch
                        checked={settings.privacy.crashReports}
                        onCheckedChange={(value) => handlePrivacyChange('crashReports', value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5 text-blue-600" />
                    Tài khoản
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Xuất dữ liệu</Label>
                      <p className="text-sm text-muted-foreground">
                        Tải xuống tất cả dữ liệu học tập của bạn
                      </p>
                      <Button variant="outline" onClick={handleExportData}>
                        <Download className="w-4 h-4 mr-2" />
                        Xuất dữ liệu
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Đổi mật khẩu</Label>
                      <p className="text-sm text-muted-foreground">
                        Thay đổi mật khẩu tài khoản
                      </p>
                      <Button variant="outline">
                        Đổi mật khẩu
                      </Button>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="space-y-2">
                        <Label className="text-destructive">Xóa tài khoản</Label>
                        <p className="text-sm text-muted-foreground">
                          Xóa vĩnh viễn tài khoản và tất cả dữ liệu
                        </p>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa tài khoản
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Lưu cài đặt
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
