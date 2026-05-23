import React, { useState, useEffect } from "react";
import "./FlashcardLoader.css";

const loadingTexts = [
  "جاري إعداد محتوى البطاقات بالذكاء الاصطناعي...",
  "تحليل النصوص والمصادر المرفقة...",
  "تجهيز الأسئلة والتعاريف الوجيزة...",
  "تنظيم البطاقات لتسهيل الحفظ والمراجعة...",
  "لحظات قليلة وتصبح بطاقاتك جاهزة..."
];

export default function FlashcardLoader() {
  const [textIndex, setTextIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    const textInterval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % loadingTexts.length);
        setFadeClass("fade-in");
      }, 400); // Match transition duration
    }, 2800);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <div className="flashcard-loader-overlay">
      <div className="flashcard-loader-container">
        {/* 3D Animated Card Shuffling Stack */}
        <div className="flashcard-loader-stack">
          {/* Card 1 */}
          <div className="loader-card loader-card--1">
            <span className="loader-card-badge">مصطلح</span>
            <div className="loader-card-content">
              <div className="loader-card-line loader-card-line--long"></div>
              <div className="loader-card-line loader-card-line--short"></div>
            </div>
            <div className="loader-card-stars">✨</div>
          </div>
          
          {/* Card 2 */}
          <div className="loader-card loader-card--2">
            <span className="loader-card-badge loader-card-badge--definition">تعريف</span>
            <div className="loader-card-content">
              <div className="loader-card-line"></div>
              <div className="loader-card-line loader-card-line--medium"></div>
            </div>
            <div className="loader-card-stars">⭐</div>
          </div>
          
          {/* Card 3 */}
          <div className="loader-card loader-card--3">
            <span className="loader-card-badge">سؤال</span>
            <div className="loader-card-content">
              <div className="loader-card-line loader-card-line--long"></div>
              <div className="loader-card-line"></div>
            </div>
            <div className="loader-card-stars">✨</div>
          </div>
        </div>

        {/* Dynamic Loading Text */}
        <div className="flashcard-loader-text-wrapper">
          <p className={`flashcard-loader-text ${fadeClass}`}>
            {loadingTexts[textIndex]}
          </p>
          <span className="flashcard-loader-subtext">الرجاء عدم إغلاق هذه الصفحة</span>
        </div>
      </div>
    </div>
  );
}
