"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { SignalData } from "@/lib/types"
import { processStatusUpdate } from "@/lib/signal-processor"
import { parseCSV, extractTextFromFile } from "@/lib/file-processors"
import { initialSignalData } from "@/lib/sample-data"

interface DataInputProps {
  onProcessStart: () => void
  onDataProcessed: (data: SignalData) => void
}

interface ParsedFileData {
  fileName: string
  fileType: string
  content: string
  preview: string
  rowCount?: number
  columns?: string[]
}

export function DataInput({ onProcessStart, onDataProcessed }: DataInputProps) {
  const [inputText, setInputText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [parsedFiles, setParsedFiles] = useState<ParsedFileData[]>([])
  const [isParsingFiles, setIsParsingFiles] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      setUploadedFiles([...uploadedFiles, ...filesArray])

      // Automatically parse the files
      setIsParsingFiles(true)
      try {
        const newParsedFiles: ParsedFileData[] = []

        for (const file of filesArray) {
          let parsedData: ParsedFileData

          if (file.name.toLowerCase().endsWith(".csv")) {
            const csvData = await parseCSV(file)
            parsedData = {
              fileName: file.name,
              fileType: "CSV",
              content: csvData.content,
              preview: csvData.preview,
              rowCount: csvData.rowCount,
              columns: csvData.columns,
            }
          } else {
            const textData = await extractTextFromFile(file)
            parsedData = {
              fileName: file.name,
              fileType: file.type || "Unknown",
              content: textData.content,
              preview: textData.preview,
            }
          }

          newParsedFiles.push(parsedData)
        }

        setParsedFiles([...parsedFiles, ...newParsedFiles])
      } catch (error) {
        console.error("Error parsing files:", error)
      } finally {
        setIsParsingFiles(false)
      }

      // Reset the input value so the same file can be uploaded again if needed
      e.target.value = ""
    }
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = [...uploadedFiles]
    const newParsedFiles = [...parsedFiles]
    newFiles.splice(index, 1)
    newParsedFiles.splice(index, 1)
    setUploadedFiles(newFiles)
    setParsedFiles(newParsedFiles)
  }

  const handleProcessFiles = async () => {
    if (parsedFiles.length === 0) return

    setIsProcessing(true)
    onProcessStart()

    try {
      // Combine all parsed file content
      const combinedContent = parsedFiles.map((file) => `--- ${file.fileName} ---\n${file.content}`).join("\n\n")

      // Process the combined content with AI
      const processedData = await processStatusUpdate(combinedContent)
      onDataProcessed(processedData)
    } catch (error) {
      console.error("Error processing files:", error)
      onDataProcessed(initialSignalData)
    } finally {
      setIsProcessing(false)
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf") || fileType === "PDF") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    } else if (
      fileType.includes("spreadsheet") ||
      fileType.includes("csv") ||
      fileType.includes("excel") ||
      fileType === "CSV"
    ) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="3" y1="15" x2="21" y2="15"></line>
          <line x1="9" y1="3" x2="9" y2="21"></line>
          <line x1="15" y1="3" x2="15" y2="21"></line>
        </svg>
      )
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
          <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
      )
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const handleProcess = async () => {
    if (!inputText.trim()) return

    setIsProcessing(true)
    onProcessStart()

    try {
      const processedData = await processStatusUpdate(inputText)
      onDataProcessed(processedData)
    } catch (error) {
      console.error("Error processing data:", error)
      onDataProcessed(initialSignalData)
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInputText(text)
    } catch (error) {
      console.error("Failed to read clipboard:", error)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Input Team Updates</h2>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="text">Paste Text</TabsTrigger>
          <TabsTrigger value="upload">Upload CSV/Files</TabsTrigger>
          <TabsTrigger value="connect">Connect Source</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="mt-4 space-y-4">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Paste your raw team updates, meeting notes, or task lists</p>
            <Button variant="outline" size="sm" onClick={handlePasteFromClipboard}>
              Paste from Clipboard
            </Button>
          </div>

          <Textarea
            placeholder="Paste your status update here..."
            className="min-h-[300px]"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="flex justify-end">
            <Button onClick={handleProcess} disabled={isProcessing || !inputText.trim()}>
              {isProcessing ? "Generating..." : "Generate Executive Summary"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Upload CSV files, reports, or team update documents</p>
              <p className="text-xs text-gray-400">Supports .csv, .docx, .pdf, .txt, and .xlsx files</p>
            </div>

            <Card
              className="p-6 border-dashed border-2 flex flex-col items-center justify-center min-h-[200px] cursor-pointer relative"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".csv,.docx,.pdf,.txt,.xlsx"
                onChange={handleFileChange}
                multiple
              />
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-gray-100 p-3 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p className="text-gray-500 mb-1">Drag and drop files or click to upload</p>
                {isParsingFiles && <p className="text-sm text-blue-500">Parsing files...</p>}
              </div>
            </Card>

            {uploadedFiles.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Uploaded Files</h3>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="mr-2 text-gray-500">{getFileIcon(file.type)}</div>
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {parsedFiles[index] && (
                            <Badge variant="secondary" className="text-xs">
                              {parsedFiles[index].fileType}
                              {parsedFiles[index].rowCount && ` • ${parsedFiles[index].rowCount} rows`}
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveFile(index)
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-500"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </Button>
                        </div>
                      </div>

                      {parsedFiles[index] && (
                        <div className="space-y-2">
                          {parsedFiles[index].columns && (
                            <div>
                              <p className="text-xs font-medium text-gray-600 mb-1">Columns:</p>
                              <div className="flex flex-wrap gap-1">
                                {parsedFiles[index].columns!.slice(0, 6).map((col, colIndex) => (
                                  <Badge key={colIndex} variant="outline" className="text-xs">
                                    {col}
                                  </Badge>
                                ))}
                                {parsedFiles[index].columns!.length > 6 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{parsedFiles[index].columns!.length - 6} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-1">Preview:</p>
                            <ScrollArea className="h-20 w-full rounded border bg-gray-50 p-2">
                              <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                                {parsedFiles[index].preview}
                              </pre>
                            </ScrollArea>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleProcessFiles}
                    disabled={isProcessing || parsedFiles.length === 0 || isParsingFiles}
                  >
                    {isProcessing ? "Generating..." : "Generate Executive Summary"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="connect" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Jira", "Asana", "Slack", "GitHub", "Notion", "Google Docs"].map((source) => (
              <Card
                key={source}
                className="p-4 flex flex-col items-center justify-center h-32 hover:bg-gray-50 cursor-pointer"
              >
                <div className="font-medium mb-2">{source}</div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
