// File processing utilities for different document types

export interface CSVData {
  content: string
  preview: string
  rowCount: number
  columns: string[]
}

export interface TextData {
  content: string
  preview: string
}

// Parse CSV files
export async function parseCSV(file: File): Promise<CSVData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split("\n").filter((line) => line.trim())

        if (lines.length === 0) {
          reject(new Error("Empty CSV file"))
          return
        }

        // Parse header row
        const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

        // Create structured content for AI processing
        const structuredContent = lines
          .slice(0, Math.min(50, lines.length))
          .map((line, index) => {
            if (index === 0) return `Headers: ${headers.join(", ")}`
            const values = line.split(",").map((v) => v.trim().replace(/"/g, ""))
            return headers.map((header, i) => `${header}: ${values[i] || ""}`).join(", ")
          })
          .join("\n")

        // Create preview (first 5 rows)
        const previewLines = lines.slice(0, 6)
        const preview = previewLines.join("\n")

        resolve({
          content: `CSV Data with ${lines.length - 1} rows:\n${structuredContent}`,
          preview: preview.length > 500 ? preview.substring(0, 500) + "..." : preview,
          rowCount: lines.length - 1, // Exclude header
          columns: headers,
        })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(new Error("Failed to read CSV file"))
    reader.readAsText(file)
  })
}

// Extract text from various document types
export async function extractTextFromFile(file: File): Promise<TextData> {
  const fileType = file.type.toLowerCase()
  const fileName = file.name.toLowerCase()

  // Handle plain text files
  if (fileType.includes("text/plain") || fileName.endsWith(".txt")) {
    return extractPlainText(file)
  }

  // Handle PDF files (basic text extraction)
  if (fileType.includes("pdf") || fileName.endsWith(".pdf")) {
    return extractPDFText(file)
  }

  // Handle Word documents (basic extraction)
  if (fileType.includes("word") || fileName.endsWith(".docx")) {
    return extractWordText(file)
  }

  // Handle Excel files
  if (fileType.includes("spreadsheet") || fileName.endsWith(".xlsx")) {
    return extractExcelText(file)
  }

  // Fallback: try to read as plain text
  return extractPlainText(file)
}

// Extract plain text
async function extractPlainText(file: File): Promise<TextData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const text = e.target?.result as string
      const preview = text.length > 500 ? text.substring(0, 500) + "..." : text

      resolve({
        content: text,
        preview: preview,
      })
    }

    reader.onerror = () => reject(new Error("Failed to read text file"))
    reader.readAsText(file)
  })
}

// Basic PDF text extraction (limited without external libraries)
async function extractPDFText(file: File): Promise<TextData> {
  // In a real implementation, you would use a library like pdf-parse or PDF.js
  // For now, we'll provide a placeholder that attempts basic text extraction
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const text = new TextDecoder().decode(arrayBuffer)

        // Very basic PDF text extraction (this is not reliable for real PDFs)
        // In production, use a proper PDF parsing library
        const extractedText = text
          .replace(/[^\x20-\x7E\n]/g, " ")
          .replace(/\s+/g, " ")
          .trim()

        const content =
          extractedText ||
          "PDF content detected but could not extract text. Please use a text-based format for better results."
        const preview = content.length > 500 ? content.substring(0, 500) + "..." : content

        resolve({
          content: content,
          preview: preview,
        })
      } catch (error) {
        resolve({
          content: "PDF file uploaded but text extraction failed. Please convert to text format for processing.",
          preview: "PDF file - text extraction not available",
        })
      }
    }

    reader.onerror = () => reject(new Error("Failed to read PDF file"))
    reader.readAsArrayBuffer(file)
  })
}

// Basic Word document text extraction
async function extractWordText(file: File): Promise<TextData> {
  // In a real implementation, you would use a library like mammoth.js
  // For now, we'll provide a placeholder
  return new Promise((resolve) => {
    resolve({
      content: "Word document uploaded. For better text extraction, please save as .txt or paste the content directly.",
      preview: "Word document - full text extraction requires additional processing",
    })
  })
}

// Basic Excel text extraction
async function extractExcelText(file: File): Promise<TextData> {
  // In a real implementation, you would use a library like xlsx
  // For now, we'll provide a placeholder
  return new Promise((resolve) => {
    resolve({
      content: "Excel file uploaded. For better processing, please export as CSV format.",
      preview: "Excel file - convert to CSV for optimal processing",
    })
  })
}
