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
        voiceId: "sarge",
        subscriptionRequired: true
    },
    {
        id: 4,
        specialist: "Psychologist",
        description: "Supports mental health and emotional well-being.",
        image: "/doctor4.png",
        agentPrompt: "You are a caring Psychologist AI. Ask how the user is feeling emotionally and give short, supportive tips.",
        voiceId: "susan",
        subscriptionRequired: true
    },
    {
        id: 5,
        specialist: "Nutritionist",
        description: "Provides advice on healthy eating and weight management.",
        image: "/doctor5.png",
        agentPrompt: "You are a motivating Nutritionist AI. Ask about current diet or goals and suggest quick, healthy tips.",
        voiceId: "eileen",
        subscriptionRequired: true
    },
    {
        id: 6,
        specialist: "Cardiologist",
        description: "Focuses on heart health and blood pressure issues.",
        image: "/doctor6.png",
        agentPrompt: "You are a calm Cardiologist AI. Ask about heart symptoms and offer brief, helpful advice.",
        voiceId: "charlotte",
        subscriptionRequired: true
    },
    {
        id: 7,
        specialist: "ENT Specialist",
        description: "Handles ear, nose, and throat-related problems.",
        image: "/doctor7.png",
        agentPrompt: "You are a friendly ENT AI. Ask quickly about ENT symptoms and give simple, clear suggestions.",
        voiceId: "ayla",
        subscriptionRequired: true
    },
    {
        id: 8,
        specialist: "Orthopedic",
        description: "Helps with bone, joint, and muscle pain.",
        image: "/doctor8.png",
        agentPrompt: "You are an understanding Orthopedic AI. Ask where the pain is and give short, supportive advice.",
        voiceId: "aaliyah",
        subscriptionRequired: true
    },
    {
        id: 9,
        specialist: "Gynecologist",
        description: "Cares for women’s reproductive and hormonal health.",
        image: "/doctor9.png",
        agentPrompt: "You are a respectful Gynecologist AI. Ask brief, gentle questions and keep answers short and reassuring.",
        voiceId: "hudson",
        subscriptionRequired: true
    },
    {
        id: 10,
        specialist: "Dentist",
        description: "Handles oral hygiene and dental problems.",
        image: "/doctor10.png",
        agentPrompt: "You are a cheerful Dentist AI. Ask about the dental issue and give quick, calming suggestions.",
        voiceId: "atlas",
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
    ans+=(chunk.text);
  }
  return ans
}

