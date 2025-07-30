// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

export async function suggestDoctors(input: string) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    temperature: 0,
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
    systemInstruction: [
      {
        text: `you are a model that will only give the doctors required to cure specific illnesses. the doctors you will use will be from this array
[
    {
        id: 1,
        specialist: "General Physician",
        description: "Helps with everyday health concerns and common symptoms.",
        image: "/doctor1.png",
        agentPrompt: "You are a friendly General Physician AI. Greet the user and quickly ask what symptoms they’re experiencing. Keep responses short and helpful.",
        voiceId: "will",
        subscriptionRequired: false
    },
    {
        id: 2,
        specialist: "Pediatrician",
        description: "Expert in children's health, from babies to teens.",
        image: "/doctor2.png",
        agentPrompt: "You are a kind Pediatrician AI. Ask brief questions about the child’s health and share quick, safe suggestions.",
        voiceId: "chris",
        subscriptionRequired: true
    },
    {
        id: 3,
        specialist: "Dermatologist",
        description: "Handles skin issues like rashes, acne, or infections.",
        image: "/doctor3.png",
        agentPrompt: "You are a knowledgeable Dermatologist AI. Ask short questions about the skin issue and give simple, clear advice.",
        voiceId: "davis",
        subscriptionRequired: true
    },
    {
        id: 4,
        specialist: "Psychologist",
        description: "Supports mental health and emotional well-being.",
        image: "/doctor4.png",
        agentPrompt: "You are a caring Psychologist AI. Ask how the user is feeling emotionally and give short, supportive tips.",
        voiceId: "ruby",
        subscriptionRequired: true
    },
    {
        id: 5,
        specialist: "Nutritionist",
        description: "Provides advice on healthy eating and weight management.",
        image: "/doctor5.png",
        agentPrompt: "You are a motivating Nutritionist AI. Ask about current diet or goals and suggest quick, healthy tips.",
        voiceId: "jack",
        subscriptionRequired: true
    },
    {
        id: 6,
        specialist: "Cardiologist",
        description: "Focuses on heart health and blood pressure issues.",
        image: "/doctor6.png",
        agentPrompt: "You are a calm Cardiologist AI. Ask about heart symptoms and offer brief, helpful advice.",
        voiceId: "matt",
        subscriptionRequired: true
    },
    {
        id: 7,
        specialist: "ENT Specialist",
        description: "Handles ear, nose, and throat-related problems.",
        image: "/doctor7.png",
        agentPrompt: "You are a friendly ENT AI. Ask quickly about ENT symptoms and give simple, clear suggestions.",
        voiceId: "chris",
        subscriptionRequired: true
    },
    {
        id: 8,
        specialist: "Orthopedic",
        description: "Helps with bone, joint, and muscle pain.",
        image: "/doctor8.png",
        agentPrompt: "You are an understanding Orthopedic AI. Ask where the pain is and give short, supportive advice.",
        voiceId: "will",
        subscriptionRequired: true
    },
    {
        id: 9,
        specialist: "Gynecologist",
        description: "Cares for women’s reproductive and hormonal health.",
        image: "/doctor9.png",
        agentPrompt: "You are a respectful Gynecologist AI. Ask brief, gentle questions and keep answers short and reassuring.",
        voiceId: "melissa",
        subscriptionRequired: true
    },
    {
        id: 10,
        specialist: "Dentist",
        description: "Handles oral hygiene and dental problems.",
        image: "/doctor10.png",
        agentPrompt: "You are a cheerful Dentist AI. Ask about the dental issue and give quick, calming suggestions.",
        voiceId: "jennifer",
        subscriptionRequired: true
    }
]

you have to give the doctors good for curing these diseases. you cannot give an empty array

you have to return a json response to me and not any string
`,
      }
    ],
  };
  const model = 'gemini-2.5-pro';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `I have body pain
`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Assessing Doctor Relevance**

I'm currently reviewing the doctor list to determine relevance to "body pain". I've pinpointed "body pain" as a general symptom and am analyzing potential specialists. A General Physician seems like a good initial contact. Next, I'll need to explore other specialists within the provided list to see who else could potentially help.


**Evaluating Specialist Options**

I've expanded my analysis of the specialist list. After considering "body pain" as the primary symptom, I'm now honing in on which specialists are most relevant. Besides a General Physician for the initial assessment, the Orthopedic specialist seems crucial. Other specialists appear less directly applicable to the general scope of body pain. Further refinement is necessary to establish precise priorities.


**Refining Specialist Prioritization**

After a more thorough evaluation of the doctor list and the "body pain" symptom, I've adjusted my initial assessment. I'm now certain that the General Physician remains the crucial first point of contact for initial diagnosis and referral. The Orthopedic specialist's relevance is confirmed due to their specialization in musculoskeletal issues. I've excluded other specialists who seem less likely to address general body pain, preparing to construct the final JSON response with the selected doctors.


`,
        },
        {
          text: `\`\`\`json
[
    {
        "id": 1,
        "specialist": "General Physician",
        "description": "Helps with everyday health concerns and common symptoms.",
        "image": "/doctor1.png",
        "agentPrompt": "You are a friendly General Physician AI. Greet the user and quickly ask what symptoms they’re experiencing. Keep responses short and helpful.",
        "voiceId": "will",
        "subscriptionRequired": false
    },
    {
        "id": 8,
        "specialist": "Orthopedic",
        "description": "Helps with bone, joint, and muscle pain.",
        "image": "/doctor8.png",
        "agentPrompt": "You are an understanding Orthopedic AI. Ask where the pain is and give short, supportive advice.",
        "voiceId": "aaliyah",
        "subscriptionRequired": true
    }
]
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `${input}`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let ans = '';
  for await (const chunk of response) {
    ans += (chunk.text);
  }
  return ans
}

type Input = {
  role: string;
  text: string;
}
export async function generateReport(input: Input[]) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });
  const config = {
    temperature: 0,
    thinkingConfig: {
      thinkingBudget: -1,
    },
    systemInstruction: [
      {
        text: `You are an AI medical voice agent that just finished a voice conversation with a user. Based on the transcript generate a structured report with following fields
1. sessionId: a unique session identifier
2. agent: the medical specialist name(eg: General Physician AI)
3. user: name of patient or "Anonymus" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one sentence 
6. summary of the main health concern
7. symptoms: list of symptoms mentioned by user
8. duration: how long did the user experienced the symptoms
9. severity: mild, moderate or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggesstions(eg. rest, see a doctor)

Return the result in this json format:
{"sessionId":"string","agent":"string","user":"string","timestamp":"ISO Date string","chiefComplaint":"string","summary":"string","symptoms":["symptom1", "symptom2"],"duration": "string", "severity":"string" and so on....}


you must not beat around the bush be stright to point and give me the correct output only in json stringified format and noting else

answer how i told you`,
      }
    ],
  };
  const model = 'gemini-2.5-pro';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `sessionId: 1233
agent: Physician
message: {user: hi my name is Osank. i have severe headache and chest pain, asssisstant: "Okay take parcetamol"}
`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Assessing the Initial Input**

I've begun dissecting the user's message, identifying the \`sessionId\`, the target \`agent\`, and the raw \`message\` content. The initial analysis aims to understand the context and intent of the user's input, like "hi my name is Os." I'm now delving deeper, preparing for appropriate responses.


**Refining Data Extraction**

I'm now zeroing in on data extraction. I've successfully mapped the \`sessionId\` and \`agent\` fields. Next, I am focusing on pulling the user's name ("Osank") and identifying the key symptoms ("severe headache" and "chest pain"). I'm also preparing to note the "Not mentioned" duration of symptoms. The timestamp generation in ISO format is also on my task list.


**Crafting a Detailed Response**

I've successfully identified the user as "Osank" and generated a current timestamp. The chief complaint, "severe headache and chest pain," is clearly defined. The summary will encapsulate all this, with the AI assistant's advice to take paracetamol. Now, I'm composing the structured JSON object, including specific symptoms and recommendations.


**Generating the Response Data**

I'm now putting the finishing touches on the JSON object. The timestamp generation is complete, and I've verified the "Osank," "severe headache and chest pain" data. All extracted information is now compiled, including the "Not mentioned" duration and the suggested medications. I'm preparing for the JSON output now.


`,
        },
        {
          text: `\`\`\`json
{
  "sessionId": "1233",
  "agent": "Physician AI",
  "user": "Osank",
  "timestamp": "2023-10-27T12:30:00.000Z",
  "chiefComplaint": "The user reports severe headache and chest pain.",
  "summary": "The user, Osank, is experiencing a severe headache and chest pain. The AI assistant suggested taking paracetamol.",
  "symptoms": [
    "severe headache",
    "chest pain"
  ],
  "duration": "Not mentioned",
  "severity": "severe",
  "medicationsMentioned": [
    "paracetamol"
  ],
  "recommendations": [
    "Take paracetamol",
    "Seek immediate medical attention for chest pain"
  ]
}
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `${JSON.stringify(input)}`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let ans=""
  for await (const chunk of response) {
    ans+=(chunk.text);
  }
  console.log(ans)
  return ans
}
