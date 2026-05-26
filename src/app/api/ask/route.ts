import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { type RagChunk, retrieveRelevantChunks } from "@/lib/rag";

export const runtime = "nodejs";

type AskPayload = {
  question?: string;
  chunks?: RagChunk[];
};

export async function POST(request: Request) {
  const payload = (await request.json()) as AskPayload;
  const question = payload.question?.trim();
  const chunks = payload.chunks ?? [];

  if (!question) {
    return NextResponse.json({ error: "Digite uma pergunta para consultar o assistente." }, { status: 400 });
  }

  if (!chunks.length) {
    return NextResponse.json(
      { error: "Nenhum documento foi indexado. Use os exemplos ou envie arquivos." },
      { status: 400 },
    );
  }

  const sources = retrieveRelevantChunks(question, chunks, 5);

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      {
        error:
          "GROQ_API_KEY nao configurada. Crie um arquivo .env.local com sua chave da Groq para gerar respostas.",
        sources,
      },
      { status: 503 },
    );
  }

  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";
  const context = sources
    .map(
      (source, index) =>
        `[Fonte ${index + 1}: ${source.documentName} | score ${source.score.toFixed(3)}]\n${source.text}`,
    )
    .join("\n\n");

  const completion = await client.chat.completions.create({
    model,
    temperature: 0.25,
    max_tokens: 850,
    messages: [
      {
        role: "system",
        content:
          "Voce e um assistente academico de IA generativa com RAG. Responda em portugues do Brasil, use apenas o contexto fornecido quando ele for suficiente, indique limitacoes quando faltar evidencia e cite as fontes recuperadas no formato [Fonte 1].",
      },
      {
        role: "user",
        content: `Pergunta: ${question}\n\nContexto recuperado:\n${context}`,
      },
    ],
  });

  return NextResponse.json({
    answer: completion.choices[0]?.message?.content?.trim() ?? "Nao foi possivel gerar uma resposta.",
    model,
    sources,
  });
}
