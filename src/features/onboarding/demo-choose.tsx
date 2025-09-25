"use client"

import { useState } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"

export function DemoChoose({ onNext }: { onNext?: () => void }) {
  const [picked, setPicked] = useState<1 | 2 | null>(null)
  return (
    <div className="min-h-screen bg-[#fff9f3] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl mx-auto bg-card/90 border-border/50 shadow-xl">
        <div className="p-6 md:p-10 space-y-8">
          {/* Top Progress */}
          <div className="h-3 w-full rounded-full bg-amber-200 overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: "28%" }} />
          </div>

          {/* Title */}
          <h2 className="text-center text-xl font-semibold">Chọn ký hiệu đúng!</h2>

          {/* Two-choice layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setPicked(i as 1 | 2)}
                className={`aspect-video w-full rounded-xl border-2 ${picked === i ? "border-orange-500" : "border-border"} bg-muted/30`}
              />
            ))}
          </div>

          <div className="pt-2 flex justify-center">
            <Button disabled={!picked} onClick={onNext} className="min-w-[260px] bg-orange-500 hover:bg-orange-600">
              Kiểm tra
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}


