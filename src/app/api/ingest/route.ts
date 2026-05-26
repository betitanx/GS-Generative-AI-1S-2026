import mammoth from "mammoth";
import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import { createChunks, normalizeText, type RagChunk } from "@/lib/rag";

export const runtime = "nodejs";

type IngestedDocument = {
  id: string;
  name: string;
  size: number;
  chunkCount: number;
  chunks: RagChunk[];
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll("files").filter((item): item is File => item instanceof File);

  if (!files.length) {
    return NextResponse.json({ error: "Envie ao menos um arquivo PDF, TXT ou DOCX." }, { status: 400 });
  }

  const documents: IngestedDocument[] = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const text = normalizeText(await extractText(file, buffer));

    if (!text) {
      continue;
    }

    const documentId = `upload-${Date.now()}-${documents.length + 1}`;
    const chunks = createChunks(documentId, file.name, text);

    documents.push({
      id: documentId,
      name: file.name,
      size: file.size,
      chunkCount: chunks.length,
      chunks,
    });
  }

  if (!documents.length) {
    return NextResponse.json(
      { error: "Nao foi possivel extrair texto dos arquivos enviados." },
      { status: 422 },
    );
  }

  return NextResponse.json({ documents });
}

async function extractText(file: File, buffer: Buffer) {
  const name = file.name.toLowerCase();

  if (name.endsWith(".txt") || file.type === "text/plain") {
    return buffer.toString("utf-8");
  }

  if (name.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    const parser = new PDFParse({ data: buffer });
    try {
      const result = await parser.getText();
      return result.text;
    } finally {
      await parser.destroy();
    }
  }

  throw new Error(`Formato nao suportado: ${file.name}`);
}
