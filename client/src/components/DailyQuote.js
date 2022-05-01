import React, { useState } from "react";

function DailyQuote() {
  const [quoteList, setQuoteList] = useState(null);
  const [quote, setQuote] = useState({ text: "Quote of the day" });

  async function getQuote() {
    let source = quoteList;
    if (quoteList === null) {
      const data = await (await fetch(`https://type.fit/api/quotes`)).json();
      source = data;
      setQuoteList(data);
    }
    const randomIndex = Math.floor(Math.random() * source.length);
    const randomQuote = source[randomIndex];

    setQuote(randomQuote);
  }

  return (
    <div className="tipsContainer item7">
      <div className="innerTipContainer">
        <span>{quote.text}</span>
        <span style={{ fontStyle: "italic" }}>-{quote.author}</span>
      </div>
      <button onClick={getQuote} className="btn random-tip">
        New Quote
      </button>
    </div>
  );
}

export default DailyQuote;
