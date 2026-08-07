/**
 * Groq/LLM responses often come wrapped in markdown fences or with leading
 * prose despite instructions not to. This strips that and parses safely.
 * Throws a tagged error so callers can distinguish "AI gave bad data"
 * from other failures instead of a blanket 500.
 */
function parseAIJson(raw) {
    if (typeof raw !== "string") {
        const err = new Error("AI response was not a string");
        err.isAIParseError = true;
        throw err;
    }

    const cleaned = raw
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/, "")
        .trim();

    try {
        return JSON.parse(cleaned);
    } catch (e) {
        const err = new Error("AI returned invalid JSON: " + e.message);
        err.isAIParseError = true;
        err.raw = cleaned;
        throw err;
    }
}

module.exports = parseAIJson;
