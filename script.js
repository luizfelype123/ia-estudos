async function askAI() {
    const question = document.getElementById("question").value;
    const responseElement = document.getElementById("ai-response");

    if (question.trim() === "") {
        responseElement.innerHTML = "Por favor, digite uma pergunta.";
        return;
    }

    responseElement.innerHTML = "Carregando resposta...";

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify({ inputs: question })
        });

        const data = await response.json();
        if (data.error) {
            responseElement.innerHTML = "Erro ao obter resposta da IA.";
        } else {
            responseElement.innerHTML = data.generated_text || "Não entendi, tente perguntar de outra forma!";
        }
    } catch (error) {
        responseElement.innerHTML = "Erro ao conectar com a IA.";
    }
}
