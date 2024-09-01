import React, { useEffect, useState } from 'react';
import.meta.env.VITE_GOOGLE_API_KEY;

const GoogleTranslate = () => {
  const [targetLang, setTargetLang] = useState('en');
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const translateText = async (text, targetLang) => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
        }),
      });

      const data = await response.json();
      if (data && data.data && data.data.translations) {
        return data.data.translations[0].translatedText;
      } else {
        console.error('Unexpected response structure:', data);
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching the translation:', error);
      throw new Error('Translation failed');
    }
  };

  const translateElement = async (element, lang) => {
    const childNodes = element.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      const node = childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        const originalText = node.nodeValue.trim();
        if (originalText) {
          try {
            const translatedText = await translateText(originalText, lang);
            node.nodeValue = translatedText;
          } catch (error) {
            console.error('Error translating node:', error);
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        await translateElement(node, lang); // Recursively translate child elements
      }
    }
  };

  const translatePage = async (lang) => {
    const textElements = document.querySelectorAll('h1, h2, h3, p, span, div, button, label');
    const promises = Array.from(textElements).map(element => translateElement(element, lang));
    await Promise.all(promises);
    console.log("Translation complete.");
  };

  useEffect(() => {
    if (apiKey) {
      translatePage(targetLang);
    } else {
      console.error("API key is missing");
    }
  }, [targetLang]);

  return (
    <div>
      <select onChange={(e) => setTargetLang(e.target.value)} value={targetLang}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="zh">Chinese</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
      </select>
    </div>
  );
};

export default GoogleTranslate;
