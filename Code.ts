const doc = DocumentApp.getActiveDocument();
const ui = DocumentApp.getUi();

const onOpen = () => {
  ui.createMenu("Corrections")
    .addItem("Dyslexia ", "dyslexiaText")
    .addItem("Clearer English", "clearerText")
    .addSeparator()
    .addItem("Set API key", "setApiKey")
    .addToUi();
};

const dyslexiaText = () => {
  const selection = getSelectedText();
  const template = DIS_ENG;
  gpt(selection, template, {
    prompt: template.text.replace("{{INPUT}}", selection.text),
    ...template.req,
  });
};

const clearerText = () => {
  const selection = getSelectedText();
  const template = CLEARER_ENG;
  gpt(selection, template, {
    prompt: template.text.replace("{{INPUT}}", selection.text),
    ...template.req,
  });
};

const testSelection = () => {
  const selection = doc.getSelection();
  const elem = selection.getRangeElements();
  elem[elem.length - 1].getElement().asText().appendText("\nHello world");
};

const getSelectedText = () => {
  const selection = doc.getSelection();
  if (!selection) {
    throw new Error("No text was selected");
  }
  let total = "";
  let selectedElements = selection.getRangeElements();
  if (selection) {
    for (let i = 0; i < selectedElements.length; i++) {
      const selElem = selectedElements[i];
      const el = selElem.getElement();
      const isPartial = selElem.isPartial();
      let selStart: number;
      let selEnd: number;
      if (isPartial) {
        selStart = selElem.getStartOffset();
        selEnd = selElem.getEndOffsetInclusive();
      } else {
        selStart = selElem.getStartOffset();
        selEnd = selElem.getEndOffsetInclusive();
      }
      const elType = el.getType();
      let txt = "";
      if (elType == DocumentApp.ElementType.TEXT) {
        txt = selElem
          .getElement()
          .asText()
          .getText()
          .slice(selStart, selEnd + 1);
      }
      if (elType == DocumentApp.ElementType.PARAGRAPH) {
        txt = selElem.getElement().asParagraph().getText();
      }
      Logger.log(selElem.getEndOffsetInclusive());
      total += txt;
    }
  }

  return {
    text: total.trim(),
    lastElem: selectedElements[selectedElements.length - 1].getElement(),
  };
};

const setApiKey = () => {
  PropertiesService.getDocumentProperties().setProperty(
    "apiKey",
    createPrompt("Your API key")
  );
};

const getApiKey = () => {
  const key = PropertiesService.getDocumentProperties().getProperty("apiKey");
  if (!key) throw new Error("No API key");
  return key;
};

const createPrompt = (title: string): string | null => {
  const prompt = ui.prompt(title);
  if (prompt.getSelectedButton() == ui.Button.OK) {
    return prompt.getResponseText();
  } else {
    return null;
  }
};
