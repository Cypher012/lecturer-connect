import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepTitles: string[]
}

export function StepIndicator({ currentStep, totalSteps, stepTitles }: StepIndicatorProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <div key={stepNumber} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                    isCompleted
                      ? "bg-accent border-accent text-white"
                      : isCurrent
                        ? "border-accent text-accent bg-accent/10"
                        : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium ${isCurrent ? "text-accent" : "text-muted-foreground"}`}>
                  {stepTitles[index]}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? "bg-accent" : "bg-muted-foreground/30"}`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
