# Roteiro do video demonstrativo

Tempo maximo: 5 minutos.

## 1. Abertura - 30s

Apresentar o projeto **GS Generative AI - 1S 2026** como um assistente RAG para documentos da nova economia espacial.

Explicar o problema: documentos tecnicos de clima, satelites, agricultura inteligente, monitoramento ambiental e exploracao espacial sao extensos, e o assistente ajuda a consultar informacoes com base em fontes recuperadas.

## 2. Arquitetura - 60s

Mostrar o fluxo:

1. Upload ou documentos de exemplo.
2. Extracao de texto.
3. Divisao em chunks.
4. Geracao de embeddings.
5. Vector store local.
6. Recuperacao dos trechos mais similares.
7. Resposta com modelo Groq Llama 70B.

## 3. Demonstracao pratica - 2min

Abrir a aplicacao local.

Mostrar:

- documentos de exemplo carregados;
- upload de um arquivo TXT, PDF ou DOCX;
- pergunta sobre desastres naturais, satelites ou agricultura inteligente;
- resposta gerada;
- fontes recuperadas com trechos e scores.

## 4. Tecnologias - 45s

Citar:

- Next.js, React e TypeScript;
- Tailwind CSS;
- `pdf-parse`;
- `mammoth`;
- embeddings locais;
- Groq API.

## 5. Limitacoes e melhorias - 45s

Explicar que a versao atual usa vector store em memoria e embeddings locais para demonstracao. Como melhorias, citar banco vetorial persistente, embeddings especializados, OCR e filtros avancados.
