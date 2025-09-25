"use client"

import { useState } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"

export function DemoFillGap({ onNext }: { onNext?: () => void }) {
  const [picked, setPicked] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const correct = picked === "BẠN"

  return (
    <div className="min-h-screen bg-[#fff9f3] flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl mx-auto bg-card/90 border-border/50 shadow-xl">
        <div className="p-6 md:p-10 space-y-8">
          {/* Top Progress */}
          <div className="h-3 w-full rounded-full bg-amber-200 overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: "44%" }} />
          </div>

          <h2 className="text-center text-xl font-semibold">Điền từ còn thiếu!</h2>

          {/* Sentence */}
          <div className="mx-auto w-full max-w-xl flex items-center justify-center gap-3 text-xl md:text-2xl font-bold">
            <span className="text-foreground">XIN CHÀO</span>
            <div className="min-w-[120px] h-12 border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center bg-muted">
              {picked && <span>{picked}</span>}
            </div>
          </div>

          {/* Options */}
          {!checked && (
            <div className="mx-auto w-full max-w-xl grid grid-cols-1 gap-3">
              {["CHÀO MỪNG", "BẠN", "KHỎE"].map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => setPicked(opt)}
                  className={`h-12 rounded-xl border-2 text-sm md:text-base font-medium ${
                    picked === opt ? "border-orange-500" : "border-border"
                  }`}
                >
                  <span className="mr-2 text-muted-foreground">{i + 1}</span>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="pt-2 flex justify-center">
            {!checked ? (
              <Button disabled={!picked} onClick={() => setChecked(true)} className="min-w-[260px] bg-orange-500 hover:bg-orange-600">
                Kiểm tra
              </Button>
            ) : (
              <Button onClick={onNext} className="min-w-[260px] bg-orange-500 hover:bg-orange-600">
                {correct ? "Tiếp tục" : "Thử lại"}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}


