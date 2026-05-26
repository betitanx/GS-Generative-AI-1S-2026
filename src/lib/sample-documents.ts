import { createChunks } from "@/lib/rag";

export const sampleDocuments = [
  {
    id: "sample-climate",
    name: "Clima espacial e observacao da Terra.txt",
    text: "Satelites de observacao da Terra combinam sensores opticos, radar e infravermelho para acompanhar temperatura da superficie, cobertura de nuvens, queimadas e mudancas no uso do solo. Em um fluxo RAG, relatorios climaticos podem ser indexados para responder perguntas sobre risco ambiental, eventos extremos e tendencias regionais com base em evidencias recuperadas.",
  },
  {
    id: "sample-satellites",
    name: "Satelites e conectividade orbital.txt",
    text: "A nova economia espacial usa constelacoes de pequenos satelites para comunicacao, internet de baixa latencia, navegacao e sensoriamento remoto. Dados orbitais ajudam governos e empresas a monitorar infraestrutura critica, prever falhas e apoiar respostas rapidas a desastres naturais.",
  },
  {
    id: "sample-agriculture",
    name: "Agricultura inteligente com dados espaciais.txt",
    text: "A agricultura inteligente utiliza imagens de satelite, indices de vegetacao e modelos meteorologicos para estimar saude das lavouras, necessidade de irrigacao, estresse hidrico e produtividade. Assistentes generativos com RAG podem explicar recomendacoes agronomicas citando mapas, boletins e documentos tecnicos.",
  },
  {
    id: "sample-disasters",
    name: "Monitoramento ambiental e desastres.txt",
    text: "Em enchentes, secas, queimadas e deslizamentos, dados espaciais permitem detectar areas afetadas, comparar imagens antes e depois do evento e orientar equipes de defesa civil. Um assistente RAG reduz alucinacoes ao recuperar trechos relevantes antes de gerar uma resposta em linguagem natural.",
  },
  {
    id: "sample-exploration",
    name: "Exploracao espacial e pesquisa.txt",
    text: "Missoes de exploracao espacial produzem documentos sobre trajetorias, instrumentacao, geologia planetaria, radiacao e habitabilidade. Consultar esses documentos com busca vetorial permite que estudantes encontrem rapidamente conceitos e limitacoes sem ler relatorios extensos por completo.",
  },
];

export function getSampleChunks() {
  return sampleDocuments.flatMap((document) =>
    createChunks(document.id, document.name, document.text),
  );
}
