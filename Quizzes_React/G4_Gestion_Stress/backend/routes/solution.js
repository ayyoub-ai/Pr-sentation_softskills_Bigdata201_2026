import express from 'express';
import axios from 'axios';
import { OPENROUTER_API_KEY, LLM_MODEL } from '../config.js';

const router = express.Router();

// POST /solution - Handle free text solution phase
router.post('/', async (req, res) => {
    const { situationText, aiContext, studentSolution } = req.body;

    const systemPrompt = `You are an AI expert in workplace stress management and organizational psychology.
You are playing "Human vs AI – Stress Source Challenge".
Based on the situation and your previous analysis, propose a practical, actionable solution.
Keep your response concise (2-4 sentences). Write in French.`;

    let contextString = '';
    if (aiContext) {
        if (aiContext.source) {
            contextString += `\nSource identified: "${aiContext.source}"`;
        }
        if (aiContext.whys && aiContext.whys.length > 0) {
            aiContext.whys.forEach((w, i) => {
                contextString += `\nWhy ${i + 1}: "${w}"`;
            });
        }
    }

    const userPrompt = `Situation: "${situationText}"

Your analysis so far:${contextString}

Based on your analysis above, propose a concrete, actionable solution to address the root cause of stress in this situation. Be practical and specific.`;

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: LLM_MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                max_tokens: 300,
                temperature: 0.7
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

        const aiSolution = response.data.choices[0].message.content.trim();
        res.json({ aiSolution });
    } catch (err) {
        console.error('LLM Solution Error:', err.response?.data || err.message);
        res.json({
            aiSolution: "Solution IA indisponible. Veuillez réessayer.",
            fallback: true
        });
    }
});

export default router;
