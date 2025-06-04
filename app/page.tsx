import { SignalDashboard } from "@/components/signal-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Executive Summary Generator</h1>
        <p className="text-gray-600 mb-8">Transforming raw team updates into concise leadership-focused summaries</p>
        <SignalDashboard />
      </div>
    </main>
  )
}
