import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [valorInput, setValorInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setChatLog((preventChatLog) => [
      ...preventChatLog,
      { type: "user", message: valorInput },
    ]);
    sendMessage(valorInput);
    setValorInput("");
  }

  const sendMessage = (message) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer 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`,
    };
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: message }],
    };
    setIsLoading(true);

    axios
      .post(url, data, { headers: headers })
      .then((response) => {
        setChatLog((preventChatLog) => [
          ...preventChatLog,
          { type: "bot", message: response.data.choices[0].message.content },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>CHATGPT</h1>
      {chatLog.map((message, index) => (
        <div key={index}>{console.log(message) /* message.message */}</div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese el texto aqui"
          value={valorInput}
          onChange={(e) => setValorInput(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
