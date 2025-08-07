/** @format */

"use client";

import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

import { FileText } from "lucide-react";

export default function AssignmentResult() {
  const [essayType, setEssayType] = useState("Argumentative");
  const [aggressiveness, setAggressiveness] = useState("Medium");

  const feedbackItems = [
    { label: "Strengthen thesis statement", checked: false },
    { label: "Improve transitions", checked: false },
    { label: "Add supporting evidence", checked: false },
    { label: "Correct grammar and mechanics", checked: true },
  ];

  return (
    <>
      {/* Main Content */}
      <div className="px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#1c274c]">
            Assignment Details
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 w-full justify-between">
          <Card className="mb-6 col-span-1 lg:col-span-3  xl:col-span-3 border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-[#1c274c]">
                    Feedback Checklist
                  </CardTitle>
                  <p className="text-sm text-[#647187] mt-1">
                    Here is the details of your file
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#34c724] rounded-full"></div>
                  <span className="text-sm font-medium text-[#34c724]">
                    22% complete
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {feedbackItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`feedback-${index}`}
                      checked={item.checked}
                      className="data-[state=checked]:bg-[#34c724] data-[state=checked]:border-[#34c724]"
                    />
                    <label
                      htmlFor={`feedback-${index}`}
                      className="text-sm text-[#647187] cursor-pointer"
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Essay Type */}
          <div className="mb-6  col-span-1 lg:col-span-2 xl:col-span-2  border border-gray-200 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#1c274c] rounded flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-[#1c274c]">Essay Type</span>
            </div>
            <div className="flex gap-2">
              <Select value={essayType} onValueChange={setEssayType}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Argumentative">Argumentative</SelectItem>
                  <SelectItem value="Narrative">Narrative</SelectItem>
                  <SelectItem value="Descriptive">Descriptive</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-[#1c274c] hover:bg-[#283347] text-white">
                Generate
              </Button>
            </div>
            {/* Suggestion Aggressiveness */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1c274c] mb-2">
                Suggestion Aggressiveness
              </label>
              <Select value={aggressiveness} onValueChange={setAggressiveness}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Feedback Checklist */}

        {/* Essay Content */}
        <Card className="flex-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-[#647187]">
              Untitled Name
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-[#f9f9f9] rounded-lg p-6 min-h-[400px]">
              <h2 className="text-xl font-bold text-[#1c274c] mb-4">
                The Fourth Floor
              </h2>
              <div className="text-[#1c274c] leading-relaxed space-y-4">
                <p>
                  For years, the old Hamilton Hospital stood abandoned at the
                  edge of town, draped in{" "}
                  <span className="bg-red-200 text-red-800 px-1 rounded">
                    ivy and silence
                  </span>
                  . She{" "}
                  <span className="bg-red-200 text-red-800 px-1 rounded">
                    don&apos;t goes to the school
                  </span>{" "}
                  yesterday because it raining hardly. The locals called it
                  cursed, a place where screams once echoed in the hallways long
                  after the patients were gone. No one had dared step
                  inside—until Sarah.
                </p>
                <p>
                  A curious urban explorer and freelance photographer, Sarah
                  craved places forgotten by time. She ignored the warnings,
                  brushing off stories about the hospital&apos;s "missing"
                  fourth floor.
                </p>
                <p>The blueprints showed only three levels.</p>
                <p>
                  But residents claimed to have seen a fourth floor at night,
                  glowing dimly through broken windows—always just one window,
                  lit by flickering yellow light that{" "}
                  <span className="bg-blue-200 text-blue-800 px-1 rounded">
                    moved
                  </span>{" "}
                  slowly from left to right, like someone pacing inside.
                </p>
                <p>
                  Sarah entered on a rainy afternoon, camera in hand. The ground
                  floor groaned under her steps. Wallpaper{" "}
                  <span className="bg-red-200 text-red-800 px-1 rounded">
                    peeled
                  </span>{" "}
                  like old skin. Graffiti lined the walls. She found a crumbling
                  staircase and climbed....
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="w-80 p-6 bg-white border-l border-[#e2e2e2]">
          {/* Rubric Scores */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-[#1c274c]">
                Rubric Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Total Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[#1c274c]">
                    Total Score: 82/100
                  </span>
                </div>
              </div>

              {/* Grammar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#1c274c]">
                    Grammar (25%): 90/100
                  </span>
                </div>
                <div className="text-xs text-[#647187] space-y-1">
                  <p>Example 1: Mostly correct grammar enhances readability</p>
                  <p>Example 2: Minor verb agreement errors detected.</p>
                </div>
              </div>

              {/* Clarity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#1c274c]">
                    Clarity (25%): 75/100
                  </span>
                </div>
                <div className="text-xs text-[#647187] space-y-1">
                  <p>Example 1: Main ideas are generally clear.</p>
                  <p>Example 2: Some sentences lack precision.</p>
                </div>
              </div>

              {/* Argument Strength */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#1c274c]">
                    Argument Strength (30%): 80/100
                  </span>
                </div>
                <div className="text-xs text-[#647187] space-y-1">
                  <p>Example 1: Presents a clear opinion on the book.</p>
                  <p>Example 2: Lacks specific evidence to support claims.</p>
                </div>
              </div>

              {/* Vocabulary */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#1c274c]">
                    Vocabulary (20%): 85/100
                  </span>
                </div>
                <div className="text-xs text-[#647187] space-y-1">
                  <p>Example 1: Uses engaging word choices.</p>
                  <p>Example 2: Repetitive words reduce impact</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
