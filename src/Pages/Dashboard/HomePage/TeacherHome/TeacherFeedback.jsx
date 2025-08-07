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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";

export default function TeacherFeedback() {
  const [selectedGrammar, setSelectedGrammar] = useState("");
  const [selectedArgument, setSelectedArgument] = useState("");
  const [selectedClarity, setSelectedClarity] = useState("");
  const [selectedVocabulary, setSelectedVocabulary] = useState("");
  const [feedback, setFeedback] = useState("");

  const feedbackOptions = [
    { label: "Inadequate", color: "bg-[#f54a45]", textColor: "text-white" },
    {
      label: "Needs Improvement",
      color: "bg-[#ff8800]",
      textColor: "text-white",
    },
    { label: "Satisfactory", color: "bg-[#e89908]", textColor: "text-white" },
    { label: "Good", color: "bg-[#34c724]", textColor: "text-white" },
    { label: "Excellent", color: "bg-[#1155ff]", textColor: "text-white" },
  ];

  return (
    <div className="flex h-screen bg-[#f9f9f9]">
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* AI Scores Panel */}
        <div className="w-96 p-6 bg-white border-r border-[#e3e4e6]">
          <h2 className="text-xl font-semibold text-[#1e2839] mb-6">
            Review John Smith Essay
          </h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-[#1e2839]">
                AI Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1e2839]">
                  Total Score: 82/100
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[#647187]">Grammar</div>
                  <div className="font-semibold text-[#1e2839]">
                    (25%): 20/25
                  </div>
                </div>
                <div>
                  <div className="text-[#647187]">Argument Strength</div>
                  <div className="font-semibold text-[#1e2839]">
                    (30%): 24/30
                  </div>
                </div>
                <div>
                  <div className="text-[#647187]">Clarity</div>
                  <div className="font-semibold text-[#1e2839]">
                    (25%): 20/25
                  </div>
                </div>
                <div>
                  <div className="text-[#647187]">Vocabulary</div>
                  <div className="font-semibold text-[#1e2839]">
                    (20%): 18/20
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-[#1e2839]">
                Teacher Rubric (1-25 Scale)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1e2839] mb-2">
                  Grammar
                </label>
                <Select
                  value={selectedGrammar}
                  onValueChange={setSelectedGrammar}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 25 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-xs text-[#acacac] mt-1">
                  Reason for score...
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e2839] mb-2">
                  Argument strength
                </label>
                <Select
                  value={selectedArgument}
                  onValueChange={setSelectedArgument}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 25 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-xs text-[#acacac] mt-1">
                  Reason for score...
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e2839] mb-2">
                  Clarity
                </label>
                <Select
                  value={selectedClarity}
                  onValueChange={setSelectedClarity}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 25 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-xs text-[#acacac] mt-1">
                  Reason for score...
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e2839] mb-2">
                  Vocabulary
                </label>
                <Select
                  value={selectedVocabulary}
                  onValueChange={setSelectedVocabulary}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 25 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-xs text-[#acacac] mt-1">
                  Reason for score...
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-[#1e2839]">
                Teacher Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {feedbackOptions.map((option, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 rounded-lg ${option.color} ${option.textColor} text-sm font-medium`}
                >
                  {option.label}
                </div>
              ))}
              <Textarea
                placeholder="Provide general feedback for the student..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="mt-4 min-h-[80px] text-sm"
              />
            </CardContent>
          </Card>
        </div>

        {/* Essay Content Panel */}
        <div className="flex-1 p-6 bg-[#f9f9f9]">
          <Tabs defaultValue="original" className="h-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="original"
                className="bg-[#e3e4e6] data-[state=active]:bg-white"
              >
                Original Essay
              </TabsTrigger>
              <TabsTrigger
                value="suggestions"
                className="bg-[#e3e4e6] data-[state=active]:bg-white"
              >
                AI Suggestions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="original" className="h-full">
              <Card className="h-full">
                <CardContent className="p-8 h-full overflow-auto">
                  <h1 className="text-2xl font-bold text-[#1e2839] mb-6">
                    The Fourth Floor
                  </h1>

                  <div className="prose prose-gray max-w-none text-[#505050] leading-relaxed space-y-4">
                    <p>
                      For years, the old Hamilton Hospital stood abandoned at
                      the edge of town, draped in ivy and silence. She don't
                      goes to the school yesterday because it raining hardly.
                      The locals called it cursed, a place where screams once
                      echoed in the hallways long after the patients were gone.
                      No one had dared step inside—until Sarah.
                    </p>

                    <p>
                      A curious urban explorer and freelance photographer, Sarah
                      craved places forgotten by time. She ignored the warnings,
                      brushing off stories about the hospital's "missing" fourth
                      floor.
                    </p>

                    <p>The blueprints showed only three levels.</p>

                    <p>
                      But residents claimed to have seen a fourth floor at
                      night, glowing dimly through
                      <span className="underline decoration-red-500">
                        broken
                      </span>{" "}
                      broken windows—always just one window, lit by flickering
                      yellow light that moved slowly from left to right, like
                      someone pacing inside.
                    </p>

                    <p>
                      Sarah entered on a rainy afternoon, camera in hand. The
                      ground floor groaned under her steps. Wallpaper peeled
                      like old skin. Graffiti lined the walls. She found a
                      crumbling staircase and climbed.
                    </p>

                    <p>One.</p>
                    <p>Two.</p>
                    <p>Three.</p>

                    <p>
                      Then... a short hallway, ending in an elevator. Its doors
                      were wide open.
                    </p>

                    <p>Above it: a faded sign. One word.</p>
                    <p>"FOUR."</p>

                    <p>Her breath caught.</p>

                    <p>
                      There was no floor here. No hallway. Just this one
                      elevator, doors agape like a gaping mouth, inviting her
                      in. She laughed nervously, thinking it a prank or relic
                      from reconstruction. But something drew her in. Against
                      better judgment, she stepped inside.
                    </p>

                    <p>
                      With a lurch, the elevator moved upward, though no button
                      had been pressed.
                    </p>

                    <p>
                      When the doors opened, Sarah stepped out into a corridor
                      that shouldn't exist. It was pristine—new walls, spotless
                      floors, lights softly buzzing overhead. It smelled like
                      antiseptic and... burnt hair.
                    </p>

                    <p>
                      No windows. No exits. Just doors lining the corridor, each
                      marked with a number and one repeated phrase etched
                      beneath:
                    </p>

                    <p>"We never left."</p>

                    <p>She opened the first door.</p>
                    <p>...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suggestions" className="h-full">
              <Card className="h-full">
                <CardContent className="p-8 h-full overflow-auto">
                  <div className="text-center text-[#acacac] mt-20">
                    AI suggestions would appear here...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" className="px-8">
              Cancel
            </Button>
            <Button className="px-8 bg-[#1155ff] hover:bg-[#0d47d9]">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
