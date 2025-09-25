"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "../../shared/ui/input"
import { Label } from "../../shared/ui/label"
import { Checkbox } from "../../shared/ui/checkbox"
import { Eye, EyeOff, Info, CheckCircle } from "lucide-react"
import { OnboardingLayout } from "./onboarding-layout"
import { cn } from "../../lib/utils"

interface SignUpFormProps {
  onComplete: (userData: { email: string; firstName: string; password: string }) => void
  onBack?: () => void
}

export function SignUpForm({ onComplete, onBack: _onBack }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.firstName) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!acceptedTerms) {
      newErrors.terms = "Please accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(formData)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const isPasswordValid = formData.password.length >= 6
  const isFormValid = formData.email && formData.firstName && isPasswordValid && acceptedTerms

  return (
    <OnboardingLayout
      progress={{ current: 6, total: 6 }}
      title="Đăng ký miễn phí và bắt đầu học!"
      onNext={() => handleSubmit(new Event('submit') as any)}
      onBack={_onBack}
      nextButtonText="Đăng ký"
      nextButtonDisabled={!isFormValid}
    >
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-2xl border-2 transition-colors text-base",
                  errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500",
                )}
                placeholder="Nhập email của bạn"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* First Name Field */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                Tên của bạn
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("firstName", e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-2xl border-2 transition-colors text-base",
                  errors.firstName ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500",
                )}
                placeholder="Nhập tên của bạn"
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("password", e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 pr-12 rounded-2xl border-2 transition-colors text-base",
                    errors.password ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500",
                  )}
                  placeholder="Tạo mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                {isPasswordValid ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Info className="w-4 h-4 text-gray-400" />
                )}
                <span className={cn("text-sm", isPasswordValid ? "text-green-500" : "text-gray-500")}>
                  Tối thiểu 6 ký tự
                </span>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked: boolean) => {
                    setAcceptedTerms(checked as boolean)
                    if (errors.terms) {
                      setErrors((prev) => ({ ...prev, terms: "" }))
                    }
                  }}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                  Bằng việc đăng ký, bạn đồng ý với
                  <button type="button" className="text-blue-500 hover:underline font-medium"> Điều khoản </button>
                  và
                  <button type="button" className="text-blue-500 hover:underline font-medium"> Chính sách bảo mật</button>.
                </Label>
              </div>
              {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
            </div>

            {/* Submit Button */}
            <div className="hidden" aria-hidden>
              <button type="submit" />
            </div>
          </form>
    </OnboardingLayout>
  )
}
