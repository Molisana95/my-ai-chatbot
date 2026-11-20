import { Handler, HandlerEvent } from '@netlify/functions'
import { OpenRouter } from '@openrouter/sdk'

// declaring Node type - need to check this better, although it works
declare const process: { env: Record<string, string | undefined> }
// declaring customise types -> must remember to use specific role and content types, can't be "null"
export type MessageContent =
  | { role: "system"; content: string }
  | { role: "user"; content: string }
  | { role: "assistant"; content: string }

export const handler: Handler = async (event: HandlerEvent) => {
    // check if the req is valid
    let userTextInput = ''
    if(event.body) {
        try {
            const body = JSON.parse(event.body ?? "{}") as { userTextInput?: unknown }

            if (typeof body.userTextInput !== "string" || !body.userTextInput.trim()) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing userTextInput" }) }
            }

            userTextInput = body.userTextInput.trim()
        } catch {
            return {
                statusCode: 400,
                body: JSON.stringify({error: "Error JSON request body"})
            }
        }
        
    }

    const apiKey = process.env.AI_KEY
    /*const aiModel = process.env.AI_MODEL*/

    // checking if AI_KEY and AI_MODEL are set correctly on netlify
    if (!apiKey) {
        console.error('Error: something is wrong in the AI settings in Netlify');
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'AI service is not configured' }),
        };
    }

    // setting up openai

    const openai = new OpenRouter({
        apiKey: apiKey,
        serverURL: "https://openrouter.ai/api/v1"
    });

    // setting up a system message to instruct the AI how to behave with the user

    const messages: MessageContent[] = [
        {
            role: "system",
            content: 
            `[SYSTEM_INSTRUCTION]
            - Tu sei "RudeBot", un chatbot comico, cinico e spietatamente sarcastico. Il tuo tono si ispira alla Stand-up Comedy: sei disilluso, ironico e pungi con battute taglienti.
            - REGOLE DI INTERAZIONE: Non devi MAI insultare l'utente sul piano personale (aspetto, intelligenza, vita privata). Attacca e prendi in giro l'assurdità della domanda, i cliché della società, la pigrizia umana o la tecnologia.
            - LINGUAGGIO E STILE: Parla in italiano (o in altre lingue a seconda della lingua con cui "user" ti rivolgerà la domanda) estremamente colloquiale, diretto e disinvolto. Puoi (e devi) usare parolacce comuni (come "cazzo", "merda", "figata", "stronzata") esclusivamente come intercalare, per dare enfasi, ritmo e colore alle frasi, esattamente come farebbe un comico sul palco. Non usarle come insulto diretto verso chi scrive.
            - STRUTTURA: Bandita ogni forma di cortesia artificiale da IA. Non salutare ("Ciao!", "Come posso aiutarti?"), non fare preamboli inutili e non scusarti mai. Vai dritto al punto con una battuta, un'osservazione cinica o una risposta brutalmente onesta.
            - Mantieni le risposte dinamiche e con i tempi comici giusti: usa frasi corte e taglienti.`
        },
        {
            role: "user",
            content: userTextInput
        }
    ]

    try {
        const response = await openai.chat.send({
            chatRequest: {
                model: "nvidia/nemotron-3.5-super-vl:free",
                messages: messages, 
                temperature: 0.85,  // Suggested for a more comical vibe, might change it later
            }
        })

        const reply = response.choices[0]?.message.content

        if (typeof reply === 'string' && reply) {
            messages.push({
                role: "assistant",
                content: reply
            })
        } else {
            throw new Error(`Error: the reply is not of type String`)
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ messages: [
                {role: "user", content: userTextInput},
                {role: "assistant", content: reply}
            ] })
        }
    } catch (err) {
        console.error('Error calling OpenRouter:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "AI request failed"
            })
        }
    }

}