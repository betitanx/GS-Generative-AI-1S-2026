# GS Generative AI - 1S 2026

Assistente inteligente com arquitetura RAG para responder perguntas sobre documentos e dados da nova economia espacial: clima, satelites, agricultura inteligente, monitoramento ambiental, desastres naturais e exploracao espacial.

## Funcionalidades

- Interface web em Next.js para upload de documentos e chat.
- Leitura de arquivos `PDF`, `TXT` e `DOCX`.
- Chunking de texto com sobreposicao.
- Embeddings OpenAI para uploads, com fallback local por hashing vetorial.
- Vector store em memoria no navegador para demonstracao.
- Busca semantica por similaridade cosseno.
- Respostas generativas com Groq API e modelo Llama 70B.
- Documentos de exemplo embutidos para demo imediata.

## Como executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Variaveis de ambiente

Crie um arquivo `.env.local`:

```bash
GROQ_API_KEY=sua_chave_groq
GROQ_MODEL=llama-3.3-70b-versatile
OPENAI_API_KEY=sua_chave_openai
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
```

Sem `GROQ_API_KEY`, a aplicacao ainda executa a recuperacao semantica e mostra as fontes recuperadas, mas informa que a chave da Groq precisa ser configurada para gerar a resposta final. Sem `OPENAI_API_KEY`, os embeddings usam fallback local deterministico.

## Fluxo RAG

1. O usuario carrega documentos ou usa a base de exemplo.
2. A rota `/api/ingest` extrai texto de PDF, TXT ou DOCX.
3. O texto e normalizado e dividido em chunks.
4. Cada chunk recebe embedding OpenAI quando configurado, ou embedding local deterministico como fallback.
5. A pergunta do usuario tambem vira embedding.
6. A aplicacao recupera os chunks mais similares.
7. A rota `/api/ask` envia pergunta e contexto recuperado ao modelo Groq.
8. A resposta e exibida com as fontes usadas.

## Documentos oficiais NASA/NOAA

Para uma demonstracao mais completa, adicione PDFs ou textos oficiais em uma pasta local, por exemplo `data/external-docs`, e envie esses arquivos pela interface.

Sugestoes de fontes:

- NASA Earthdata
- NASA Technical Reports Server
- NOAA Climate.gov
- Relatorios ambientais e climaticos publicos

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Entregaveis

- Aplicacao funcional.
- Repositorio organizado.
- Documento tecnico em `docs/documento-tecnico.md`.
- Roteiro do video demonstrativo em `docs/roteiro-video.md`.
