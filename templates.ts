const DIS_ENG = {
  text: `Rewrite Original sentence to Correct and understandable English sentence:
    ###
    Original sentence: Dxyislea is ceaiercrhatzd by dtiffcluiy wtih lnarenig to read fltluney
    Correct and understandable English: Dyslexia is characterized by difficulty with learning to read fluently.
    ###
    Original sentence: It also acftfes one’s epsixsvere lguganae slikls. 
    Correct and understandable English sentence: It also effects one's expressive language skills. 
    ###
    Original sentence: Smoe see deixlsya as dtinscit form redinag dtfeliificus rsetnluig from ohter caseus, scuh as a non-nieulogarocl deciifecny wtih visoin or heriang.
    Correct and understandable English sentence: Some see dyslexia as a distinct form of reading difficulties resulting from other causes, such as a non-neurological deficiency  with vision, or hearing.
    ###
    Original sentence: {{INPUT}}`,
  end: "Correct and understandable English sentence:",
  req: {
    max_tokens: 120,
    temperature: 0.1,
    stop: ["###"],
    n: 1,
  },
};

const CLEARER_ENG = {
  text: `
    ###
    Original sentence: When there is a lot of work, I often feel a lot of stress.
    Clearer English sentence: When I have a lot of work to do, I often feel stressed out.
    ###
    Original sentence: I have much games who I like to play with.
    Clearer English sentence:  I have several games that I like to play.
    ###
    Original sentence: If I’m stressed out about something, I tend to have problem to fall asleep.
    Clearer English sentence: When I am stressed about something, it is hard for me to fall asleep.
    ###
    Original sentence: {{INPUT}}
    `,
  end: "Clearer English sentence:",
  req: {
    max_tokens: 120,
    temperature: 0.4,
    stop: ["###"],
    n: 1,
  },
};





























/* 

const CLEARER_ENGLISH = {
  text: `The following is transformation to English that is clearer and more understandable
    ###
    Non-standard English: If I’m stressed out about something, I tend to have problem to fall asleep.
    Clearer English: If I'm stressed about something, I tend to have trouble falling asleep.
    ###
    Non-standard English: There is plenty of fun things to do in the summer when your able to go outside.
    Clearer English: There are so many fun things to do in the summer when you can go out.
    ###
    Non-standard English: Google autocomplete is among other factored also consider on what others people searches.
    Clearer English: Among other things, Google's auto-completion takes into account what other people are looking for.
    ###
    Non-standard English: {{INPUT}}`,
  end: "Clearer English:",
  req: {
    max_tokens: 120,
    temperature: 0.4,
    stop: ["###"],
    n: 1,
  },
};

*/
