# Documento Tecnico - GS Generative AI - 1S 2026

## Problema escolhido

Organizacoes, estudantes e equipes tecnicas que trabalham com a nova economia espacial precisam consultar documentos extensos sobre clima, satelites, agricultura inteligente, monitoramento ambiental, desastres naturais e exploracao espacial. A leitura manual desses materiais consome tempo e pode dificultar a tomada de decisao.

A solucao proposta e um assistente inteligente com RAG que recupera trechos relevantes dos documentos antes de gerar uma resposta. Isso reduz respostas sem base documental e facilita o acesso ao conhecimento tecnico.

## Arquitetura da solucao

A aplicacao usa Next.js com rotas API para ingestao e pergunta. A interface envia arquivos para extracao de texto, recebe chunks vetorizados e mantem uma vector store em memoria no navegador. Quando o usuario faz uma pergunta, os chunks sao enviados para a API de pergunta, que faz a busca semantica e chama o modelo generativo da Groq com o contexto recuperado.

Fluxo resumido:

1. Upload ou uso de documentos de exemplo.
2. Extracao de texto de PDF, TXT ou DOCX.
3. Normalizacao e divisao em chunks.
4. Geracao de embeddings locais por hashing vetorial.
5. Busca vetorial por similaridade cosseno.
6. Montagem do prompt com os trechos mais relevantes.
7. Geracao de resposta com Groq Llama 70B.
8. Exibicao da resposta com fontes citadas.

## Ferramentas utilizadas

- Next.js, React e TypeScript para aplicacao web.
- Tailwind CSS para interface.
- `pdf-parse` para extrair texto de PDFs.
- `mammoth` para extrair texto de DOCX.
- `groq-sdk` para chamada ao modelo generativo.
- `lucide-react` para icones da interface.

## Modelo utilizado

O modelo generativo planejado e `llama-3.3-70b-versatile` via Groq API. A variavel `GROQ_MODEL` permite trocar o modelo sem alterar o codigo caso a disponibilidade mude.

## Vector store utilizada

Para a demonstracao academica, a vector store e local e em memoria. Os documentos carregados sao mantidos no estado da aplicacao, junto com seus chunks e embeddings. Essa abordagem facilita a demonstracao e evita depender de banco externo.

Em uma versao de producao, a vector store poderia ser substituida por Pinecone, Weaviate, Qdrant, Chroma, pgvector ou outro banco vetorial persistente.

## Fluxo RAG implementado

O fluxo RAG implementado segue o padrao Retrieval-Augmented Generation:

- Retrieval: a pergunta e comparada com os embeddings dos chunks usando similaridade cosseno.
- Augmentation: os trechos mais relevantes sao anexados ao prompt.
- Generation: o modelo da Groq gera uma resposta em portugues usando o contexto recuperado.

A resposta orienta o modelo a citar as fontes no formato `[Fonte 1]`, `[Fonte 2]` e a indicar limitacoes quando o contexto nao for suficiente.

## Limitacoes

- Embeddings locais por hashing sao simples e servem para demonstracao, mas nao possuem a mesma qualidade semantica de modelos especializados.
- A vector store em memoria e perdida ao recarregar a pagina.
- PDFs escaneados como imagem podem nao ter texto extraivel sem OCR.
- A qualidade da resposta depende da chave Groq, do modelo selecionado e dos documentos enviados.
- A aplicacao nao implementa autenticacao nem persistencia multiusuario.

## Melhorias futuras

- Usar embeddings dedicados de um provedor externo ou modelo local.
- Persistir documentos e vetores em banco vetorial.
- Adicionar OCR para PDFs digitalizados.
- Permitir filtros por fonte, data, tema e tipo de documento.
- Exportar respostas e historico da conversa.
- Adicionar avaliacao automatica de qualidade das respostas.
