"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingsView() {
  const [signalThreshold, setSignalThreshold] = useState(70)
  const [maxItems, setMaxItems] = useState(3)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Settings</h2>

      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
          <TabsTrigger value="integration">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="mt-4 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-md font-medium">Executive Summary Settings</h3>
              <p className="text-sm text-gray-500">Configure how the AI generates leadership-focused summaries</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="signal-threshold">Signal Threshold</Label>
                  <span className="text-sm">{signalThreshold}%</span>
                </div>
                <Slider
                  id="signal-threshold"
                  min={0}
                  max={100}
                  step={1}
                  value={[signalThreshold]}
                  onValueChange={(value) => setSignalThreshold(value[0])}
                />
                <p className="text-xs text-gray-500">Higher values mean only the most important signals are included</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="max-items">Max Items Per Section</Label>
                  <span className="text-sm">{maxItems}</span>
                </div>
                <Slider
                  id="max-items"
                  min={1}
                  max={5}
                  step={1}
                  value={[maxItems]}
                  onValueChange={(value) => setMaxItems(value[0])}
                />
                <p className="text-xs text-gray-500">Limit the number of items shown in each section</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="leadership-focus">Leadership Focus</Label>
                  <p className="text-xs text-gray-500">Prioritize content based on leadership engagement patterns</p>
                </div>
                <Switch id="leadership-focus" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-summarize">Auto-Summarize</Label>
                  <p className="text-xs text-gray-500">Automatically generate executive summaries</p>
                </div>
                <Switch id="auto-summarize" defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-md font-medium">AI Model Settings</h3>
              <p className="text-sm text-gray-500">Configure the underlying AI model behavior</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model-selection">Model</Label>
                <select id="model-selection" className="w-full p-2 border rounded-md" defaultValue="gpt-4o">
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="claude-3">Claude 3</option>
                  <option value="custom">Custom Model</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" placeholder="Enter your API key" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="mt-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-md font-medium">Connected Services</h3>
            <div className="space-y-3">
              {[
                { name: "Jira", connected: true },
                { name: "Slack", connected: true },
                { name: "Google Workspace", connected: false },
                { name: "Microsoft Teams", connected: false },
                { name: "Asana", connected: false },
                { name: "GitHub", connected: false },
              ].map((service) => (
                <div key={service.name} className="flex justify-between items-center p-3 border rounded-md">
                  <span>{service.name}</span>
                  {service.connected ? (
                    <div className="flex items-center">
                      <span className="text-sm text-green-600 mr-2">Connected</span>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-md font-medium">Notification Settings</h3>
            <div className="space-y-3">
              {[
                { name: "Weekly Summary", description: "Get a weekly summary of all updates" },
                { name: "Critical Blockers", description: "Be notified when critical blockers are identified" },
                { name: "Missed Deadlines", description: "Be notified when deadlines are missed" },
                { name: "Leadership Views", description: "Know when leadership views your updates" },
              ].map((notification) => (
                <div key={notification.name} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{notification.name}</p>
                    <p className="text-xs text-gray-500">{notification.description}</p>
                  </div>
                  <Switch defaultChecked={notification.name === "Critical Blockers"} />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
