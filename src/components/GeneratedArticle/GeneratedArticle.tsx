import React, { useState, useEffect, useCallback } from "react";
import { Configuration, OpenAIApi } from "openai";

interface GeneratedArticleProps {
  title: string;
  description: string;
}

function GeneratedArticle({ title, description }: GeneratedArticleProps) {
  const [generatedArticle, setGeneratedArticle] = useState("");
  const generateArticle = useCallback(async () => {
    try {
      const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
      });
      const openai = new OpenAIApi(configuration);

      const article = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `write an original article about ${title} ${description}`,
        temperature: 0.9,
        max_tokens: 3000,
      });
      const articleResponse = article.data.choices[0].text as string;
      setGeneratedArticle(articleResponse);
    } catch (error) {
      console.error(`An error occurred while fetching the story: ${error}`);
      return error;
    }
  }, [title, description]);

  useEffect(() => {
    generateArticle();
  }, [generateArticle]);

  return (
    <>
      <h4 className="font-bold pb-2">Generated content from gpt:</h4>
      <p>{generatedArticle}</p>
    </>
  );
}

export default GeneratedArticle;
