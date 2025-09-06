"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { StepIndicator } from "@/components/onboarding/step-indicator"
import { TagInput } from "@/components/onboarding/tag-input"
import { useAuth } from "@/lib/auth"
import { mockDatabase } from "@/lib/database"
import { GraduationCap, ArrowLeft, ArrowRight, Check } from "lucide-react"

interface OnboardingData {
  fullName: string
  studentId: string
  department: string
  level: string
  skills: string[]
  researchInterests: string[]
  careerGoals: string
  preferredLearningStyle: string
}

const departments = [
  "Computer Science",
  "Cybersecurity",
  "Information Systems",
  "Computer Engineering",
  "Software Engineering",
  "Data Science",
  "Artificial Intelligence",
]

const levels = ["Undergraduate", "Masters", "PhD"]

const skillSuggestions = [
  "Python",
  "JavaScript",
  "React",
  "Node.js",
  "Java",
  "C++",
  "SQL",
  "MongoDB",
  "Machine Learning",
  "Data Analysis",
  "Cybersecurity",
  "Cloud Computing",
  "Mobile Development",
  "Web Development",
  "DevOps",
  "UI/UX Design",
]

const researchAreas = [
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Software Engineering",
  "Systems Programming",
  "Robotics",
  "Computer Vision",
  "Natural Language Processing",
  "Blockchain",
  "Internet of Things",
  "Human-Computer Interaction",
]

const careerGoalOptions = [
  "Academic Research",
  "Industry Research",
  "Software Development",
  "Data Science",
  "Cybersecurity",
  "Product Management",
  "Entrepreneurship",
  "Consulting",
]

const learningStyleOptions = [
  "Visual Learning",
  "Hands-on Practice",
  "Theoretical Study",
  "Group Discussions",
  "Independent Research",
  "Project-based Learning",
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<OnboardingData>({
    fullName: user?.name || "",
    studentId: "",
    department: "",
    level: "",
    skills: [],
    researchInterests: [],
    careerGoals: "",
    preferredLearningStyle: "",
  })

  const stepTitles = ["Basic Info", "Academic Details", "Skills & Interests", "Review & Submit"]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      if (!user?.email) {
        throw new Error("User email not found")
      }

      await mockDatabase.saveStudentProfile({
        email: user.email,
        name: formData.fullName,
        studentId: formData.studentId,
        year: formData.level,
        program: formData.department,
        researchInterests: formData.researchInterests,
        skills: formData.skills,
        careerGoals: formData.careerGoals,
        preferredLearningStyle: formData.preferredLearningStyle,
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to save profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStep1Valid = formData.fullName && formData.studentId
  const isStep2Valid = formData.department && formData.level
  const isStep3Valid =
    formData.skills.length > 0 &&
    formData.researchInterests.length > 0 &&
    formData.careerGoals &&
    formData.preferredLearningStyle

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-accent/10 rounded-full">
              <GraduationCap className="h-12 w-12 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Lecturer Connect</h1>
          <p className="text-muted-foreground">
            Let's set up your profile to help you connect with the right lecturers
          </p>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={4} stepTitles={stepTitles} />

        <Card>
          <CardHeader>
            <CardTitle>
              Step {currentStep}: {stepTitles[currentStep - 1]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="Enter your student ID"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level of Study</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Skills</Label>
                  <p className="text-sm text-muted-foreground">Add your technical skills and competencies</p>
                  <TagInput
                    tags={formData.skills}
                    onTagsChange={(skills) => setFormData({ ...formData, skills })}
                    placeholder="Add a skill..."
                    suggestions={skillSuggestions}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Research Interests</Label>
                  <p className="text-sm text-muted-foreground">Select areas you're interested in researching</p>
                  <div className="grid grid-cols-2 gap-3">
                    {researchAreas.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={area}
                          checked={formData.researchInterests.includes(area)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                researchInterests: [...formData.researchInterests, area],
                              })
                            } else {
                              setFormData({
                                ...formData,
                                researchInterests: formData.researchInterests.filter((interest) => interest !== area),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={area} className="text-sm">
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="careerGoals">Career Goals</Label>
                  <Select
                    value={formData.careerGoals}
                    onValueChange={(value) => setFormData({ ...formData, careerGoals: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary career goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {careerGoalOptions.map((goal) => (
                        <SelectItem key={goal} value={goal}>
                          {goal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="learningStyle">Preferred Learning Style</Label>
                  <Select
                    value={formData.preferredLearningStyle}
                    onValueChange={(value) => setFormData({ ...formData, preferredLearningStyle: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your preferred learning style" />
                    </SelectTrigger>
                    <SelectContent>
                      {learningStyleOptions.map((style) => (
                        <SelectItem key={style} value={style}>
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg">Profile Summary</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                      <p className="font-medium">{formData.fullName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Student ID</Label>
                      <p className="font-medium">{formData.studentId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                      <p className="font-medium">{formData.department}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Level of Study</Label>
                      <p className="font-medium">{formData.level}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Career Goals</Label>
                      <p className="font-medium">{formData.careerGoals}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Learning Style</Label>
                      <p className="font-medium">{formData.preferredLearningStyle}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Skills ({formData.skills.length})
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.map((skill) => (
                        <span key={skill} className="bg-accent/10 text-accent px-2 py-1 rounded-md text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Research Interests ({formData.researchInterests.length})
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.researchInterests.map((interest) => (
                        <span
                          key={interest}
                          className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-md text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-accent" />
                    <p className="text-sm">
                      Your profile will be used to recommend relevant lecturers and research opportunities.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !isStep1Valid) ||
                    (currentStep === 2 && !isStep2Valid) ||
                    (currentStep === 3 && !isStep3Valid)
                  }
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Complete Setup</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
