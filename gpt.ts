declare type GPTEngines = "davinci" | "ada" | "babbage" | "curie";

declare interface GPTRequest {
  prompt: string;
  max_tokens: number;
  temperature: number;
  top_p?: number;
  n: number;
  echo?: boolean;
  stop?: string[] | null;
}

declare interface GPTResult {
  id: string;
  object: string;
  model: string;
  choices: GPTChoice[];
}

declare interface GPTChoice {
  text: string;
  index: number;
  finish_reason: string;
  temperature?: number;
}

const callGPT3 = (engine: GPTEngines = "davinci", req: GPTRequest) => {
  if (req.max_tokens > 1000 || req.max_tokens < 0 || req?.n > 15) {
    throw new Error("Incorrect GPT3 request");
  }

  if (req.stop?.[0] === "") {
    req.stop = null;
  }

  const data: GPTRequest = req;

  const url = `https://api.openai.com/v1/engines/${engine}/completions`;

  const result = UrlFetchApp.fetch(url, {
    method: "post",
    payload: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
  });

  const parsed = JSON.parse(result.getContentText()) as GPTResult;
  return parsed.choices;
};

const gpt = async (
  selection: { text: string; lastElem: GoogleAppsScript.Document.Element },
  template = DIS_ENG,
  req: GPTRequest = {
    prompt: template.text.replace("{{INPUT}}", selection.text),
    max_tokens: 120,
    temperature: 0.1,
    stop: ["###"],
    n: 1,
  }
) => {
  try {
    const [result] = callGPT3("davinci", req);
    if (!result || !result?.text) {
      throw new Error("Missing GPT3 reply");
    }

    const gptTextOutput = result.text;
    Logger.log(gptTextOutput);
    //createPrompt((gptTextOutput));
  
    const gptText = gptTextOutput
      .split(template.end)[1]
      .replace(/\n/g, "")
      .trim();
    
    const body = doc.getBody();
    const idx = body.getChildIndex(selection.lastElem.getParent());
    const p = body.insertParagraph(idx + 1, "\n" + gptText + "\n");

    p.setAttributes({
      [DocumentApp.Attribute.FOREGROUND_COLOR]: "#5465FF",
      [DocumentApp.Attribute.FONT_FAMILY]: "Roboto Mono",
    
    });
  } catch (error) {
    throw new Error(error);
  }
};
