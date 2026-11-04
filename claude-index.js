import { ChatAnthropic } from "@langchain/anthropic";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
async function main ()
{
    const chat = new ChatAnthropic({
        modelName: "claude-sonnet-5-5",
        max_tokens: 1024,
    });
    const prompt = ChatPromptTemplate.fromTemplate(" You are a helpful assistant that translates {input_language} to {output_language}.\n\n{input_language}: {text}\n{output_language}:");
    const chain = RunnableSequence.from([
        prompt,
        chat,
        new StringOutputParser(),
    ]);
    const result = await chain.invoke({
        input_language: "English",
        output_language: "French",
        text: "I love programming.",
    });
    console.log(result);
}
main().catch(console.error);
