import express from 'express';
import axios from 'axios';
import { OPENROUTER_API_KEY, LLM_MODEL } from '../config.js';

const router = express.Router();

// POST /answer - Handle QCM answer and get AI response
router.post('/', async (req, res) => {
    const { situationText, questionLabel, options, aiContext } = req.body;

    if (!options || options.length === 0) {
        return res.status(400).json({ error: 'Options are required for QCM' });
    }

    // Build the prompt with full context for consistency
    const numberedOptions = options.map((opt, i) => `${i + 1}. ${opt}`).join('\n');

    const systemPrompt = `You are an AI expert in workplace stress analysis, playing "Human vs AI – Stress Source Challenge". 
You must analyze workplace stress situations using the 5 Whys methodology.
CRITICAL RULES:
- Choose EXACTLY ONE option from the provided list
- Respond with ONLY the exact text of your chosen option, nothing else
- No explanations, no numbering, no quotes, just the raw option text
- Your choice must be logically consistent with your previous selections`;

    let contextString = '';
    if (aiContext) {
        if (aiContext.source) {
            contextString += `\nYour previous Source selection: "${aiContext.source}"`;
        }
        if (aiContext.whys && aiContext.whys.length > 0) {
            aiContext.whys.forEach((w, i) => {
                contextString += `\nYour previous Why ${i + 1} selection: "${w}"`;
            });
        }
    }

    const userPrompt = `Situation: "${situationText}"
${contextString ? `\n--- Your Previous Selections (maintain logical consistency) ---${contextString}\n---` : ''}

Current question: ${questionLabel}

Available options:
${numberedOptions}

Choose exactly one option. Respond ONLY with the exact text of your choice.`;

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: LLM_MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                max_tokens: 100,
                temperature: 0.3
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:5173',
                    'X-Title': 'Human vs AI Stress Challenge'
                }
            }
        );

        let aiChoice = response.data.choices[0].message.content.trim();

        // Clean up AI response - remove quotes, numbering, etc.
        aiChoice = aiChoice.replace(/^["']|["']$/g, '');
        aiChoice = aiChoice.replace(/^\d+\.\s*/, '');

        // Validate: AI must pick from the provided options
        const matchedOption = options.find(opt =>
            opt.toLowerCase() === aiChoice.toLowerCase() ||
            aiChoice.toLowerCase().includes(opt.toLowerCase()) ||
            opt.toLowerCase().includes(aiChoice.toLowerCase())
        );

        if (matchedOption) {
            aiChoice = matchedOption; // Use the exact option text
        } else {
            // Fallback: find closest match
            console.warn(`AI response "${aiChoice}" didn't match any option. Using best-effort match.`);
            const scored = options.map(opt => ({
                opt,
                score: similarity(aiChoice.toLowerCase(), opt.toLowerCase())
            }));
            scored.sort((a, b) => b.score - a.score);
            aiChoice = scored[0].opt;
        }

        res.json({ aiChoice });
    } catch (err) {
        console.error('LLM Error:', err.response?.data || err.message);
        // Fallback: pick a random option if LLM fails
        const fallback = options[Math.floor(Math.random() * options.length)];
        res.json({ aiChoice: fallback, fallback: true });
    }
});

// Simple similarity score between two strings
function similarity(a, b) {
    const aWords = new Set(a.split(/\s+/));
    const bWords = new Set(b.split(/\s+/));
    let common = 0;
    for (const w of aWords) {
        if (bWords.has(w)) common++;
    }
    return common / Math.max(aWords.size, bWords.size);
}

export default router;