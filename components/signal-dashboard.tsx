"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OneSlideView } from "@/components/one-slide-view"
import { DataInput } from "@/components/data-input"
import { HistoricalView } from "@/components/historical-view"
import { SettingsView } from "@/components/settings-view"
import type { SignalData } from "@/lib/types"
import { initialSignalData } from "@/lib/sample-data"

export function SignalDashboard() {
  const [signalData, setSignalData] = useState<SignalData>(initialSignalData)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDataProcessed = (newData: SignalData) => {
    setSignalData(newData)
    setIsProcessing(false)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="one-slide" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="executive-summary">Executive Summary</TabsTrigger>
          <TabsTrigger value="input">Input Data</TabsTrigger>
          <TabsTrigger value="historical">Historical</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="executive-summary" className="mt-6">
          <Card className="p-6">
            <OneSlideView data={signalData} isLoading={isProcessing} />
          </Card>
        </TabsContent>

        <TabsContent value="input" className="mt-6">
          <Card className="p-6">
            <DataInput onProcessStart={() => setIsProcessing(true)} onDataProcessed={handleDataProcessed} />
          </Card>
        </TabsContent>

        <TabsContent value="historical" className="mt-6">
          <Card className="p-6">
            <HistoricalView />
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="p-6">
            <SettingsView />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
