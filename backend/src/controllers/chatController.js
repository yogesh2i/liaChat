const Chat = require("../models/Chat");
const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();

//save chat to db
exports.save = async (req, res) => {
    const { user, text, timestamp, type } = req.body;
    if (!user || !text || !timestamp || !type) {
        return res.status(400).json({ success: false, error: 'All fields are required', data: null });
    }

    try {
        const chat = new Chat({ user, text, type, timestamp });
        await chat.save();
        res.status(201).json({ success: true, message: 'Chat saved successfully', data: chat });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error saving chat', data: null });
    }
}


//get chat history
exports.history = async (req, res) => {
    try {
        const chats = await Chat.find().sort({ timestamp: 1 }).limit(100);
        res.status(200).json({ success: true, message: 'Chat history retrieved successfully', data: chats });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error retrieving chat history', data: null });
    }
}


//get chat summary
exports.summarize = async (req, res) => {
    const { history } = req.body;
    if (!history) {
        return res.status(400).json({ success: false, error: 'Text is required for summarization', data: null });
    }

    try {

        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
         
        //formatting data in "user:text" string format as gen AI cant accept array
        const formattedHistory = history
            .map((item) => `${item.user}: ${item.text}`)
            .join('\n');

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: formattedHistory,
            config: {
                systemInstruction: "You are an AI model. You need to summarize all the chats provided to you.",
            },
        });
        const summary = response.text;

        res.status(200).json({ success: true, message: 'Chat summarized successfully', data: summary });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error summarizing chat', data: null });
    }
}