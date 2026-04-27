export const TOTAL_DURATION_MS = 11_000;

export const USER_PROMPT = "I'm not sleeping well and I feel anxious";

export const FINAL_RESPONSE =
  "It makes sense that anxiety and sleep are tangled up — they tend to feed each other. Before we dig into what's keeping your mind busy at night, can I ask: is this something new, or has it been building for a while?";

export const SCRATCHPAD_FRAGMENTS: { at: number; text: string }[] = [
  { at: 500, text: "...listening..." },
  { at: 1600, text: "...sitting with this..." },
  { at: 2900, text: "...taking this in..." },
  { at: 4300, text: "...choosing my words..." },
  { at: 5700, text: "...thinking about what matters most..." },
  { at: 7100, text: "...finding the right question..." },
  { at: 8300, text: "...okay, ready." },
];

export const TIMELINE_STAGES: { label: string; from: number; to: number }[] = [
  { label: "Listening", from: 0, to: 1_000 },
  { label: "Sitting with this", from: 1_000, to: 4_000 },
  { label: "Considering what to say", from: 4_000, to: 8_000 },
  { label: "Writing", from: 8_000, to: 11_000 },
];
