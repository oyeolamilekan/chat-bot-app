import { OpenAIApi, Configuration } from "openai-edge";
import md5 from "md5";
import { Pinecone } from "@pinecone-database/pinecone";
import { getPineconeClient } from "./pinecone";
import { stringToSlug } from "./utils";

export type BlogDocument = {
  title: string;
  body: string;
  url: string
}

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(config);

export const getEmbeddings = async (text: string) => {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });
    const result = await response.json();
    return result.data[0].embedding as number[];
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}

export const embedDocument = async (document: BlogDocument) => {
  try {
    const embeddings = await getEmbeddings(`${document.title} ${document.body}`)
    const hash = md5(document.url);
    return {
      id: hash,
      values: embeddings,
      metadata: {
        title: document.title,
        body: document.body,
        url: document.url,
      }
    }
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );

  let docs = qualifyingDocs.map((match) => match.metadata);
  // 5 vectors
  let dataMap = {
    reference: docs,
    content: docs.map(data => `
      Blog Title: ${data?.title} 
      Blog Body: ${data?.body}
      \n
    `).join("\n").substring(0, 3000)
  }
  return dataMap
}

export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  })
  const index = pinecone.Index('ai-knowldge-base')
  try {
    const namespace = (fileKey)
    const queryResult = await index.namespace(namespace).query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    })
    return queryResult.matches || []
  } catch (error) {
    console.log('error querying embedding', error)
    throw error
  }
}

export const loadBlogToPinecone = async (blogPosts: BlogDocument[], blogTitle: string) => {
  const vectors = await Promise.all(blogPosts.flat().map(embedDocument));
  const blogKey = stringToSlug(blogTitle)
  const client = getPineconeClient();
  const pineconeIndex = client.index<BlogDocument>("ai-knowldge-base");
  const namespace = pineconeIndex.namespace(blogKey);
  await namespace.upsert(vectors);
}