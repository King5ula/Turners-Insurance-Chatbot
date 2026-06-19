export async function sendChatHistoryToBakend(historyArray) {
  const response = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messageHistory: historyArray }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response from backend server");
  }

  const data = await response.json();
  return data.reply;
}
