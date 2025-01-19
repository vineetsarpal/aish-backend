import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from '@langchain/core/documents'

export async function capture(info) {

  const openAIApiKey = process.env.OPENAI_API_KEY;
  const embeddings = new OpenAIEmbeddings({ openAIApiKey });

  const doc = { pageContent: info, metadata: {} }

  const supabaseClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
  );

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabaseClient,
    tableName: "documents",
    queryName: "match_documents",
  });
}
