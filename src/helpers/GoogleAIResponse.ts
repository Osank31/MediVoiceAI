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
                    text: `**Determining Suitable Specialists**

I'm currently focused on the challenge of identifying the right doctors for "body pain" within the given list. Initially, the vagueness of the symptom posed a hurdle. Now, I am in the midst of a methodical review, looking into the specialities of each listed doctor. I'm carefully evaluating if their expertise align with the general nature of body pain, starting with the potential suitability of a General Physician.


**Evaluating Doctor Specializations**

I'm now zeroing in on the specifics, particularly the suitability of each listed doctor. My process now involves a closer look, focusing on the core specialties that best address "body pain." The General Physician remains a solid first choice, given their broad approach. However, I'm finding the Orthopedic specialist is a likely target, their expertise in bone, joint, and muscle pain perfectly aligns. I'm carefully determining the primary and secondary options for the user.


**Selecting Appropriate Doctors**

I've completed my analysis of the doctors, focusing on their specialties and "body pain." The General Physician remains a strong first choice, their wide-ranging knowledge proving invaluable. Further, the Orthopedic specialist emerged as the perfect specialist for musculoskeletal pain. My analysis confirms the list \`[General Physician, Orthopedic]\` as the solution.


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
    let ans = ""
    for await (const chunk of response) {
        ans = ans + (chunk.text);
    }
    return ans
}

