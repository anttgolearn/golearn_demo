"use client"

import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { ChevronRight } from "lucide-react"

export function DemoLearn({ onNext }: { onNext?: () => void }) {
  return (
    <div className="min-h-screen bg-[#fff9f3] flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl mx-auto bg-card/90 border-border/50 shadow-xl">
        <div className="p-6 md:p-10 space-y-8">
          {/* Top Progress */}
          <div className="h-3 w-full rounded-full bg-amber-200 overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: "12%" }} />
          </div>

          {/* Title */}
          <h2 className="text-center text-xl font-semibold">Học ký hiệu mới!</h2>

          {/* Video Placeholder */}
          <div className="mx-auto aspect-video w-full max-w-2xl rounded-xl border bg-muted/30"></div>

          {/* Caption */}
          <div className="mx-auto w-full max-w-2xl">
            <div className="w-full text-center py-3 rounded-xl border text-sm font-medium">XIN CHÀO</div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 flex justify-center">
            <Button onClick={onNext} className="min-w-[260px] bg-orange-500 hover:bg-orange-600">
              Tiếp tục
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}


