# AI Flashcards Study Tool - Functional Requirements (MVP)

## Overview
A minimal MVP web app that helps users convert any content into flashcards using AI and study them efficiently.

Focus:
- Manual flashcards creation
- AI-generated flashcards from content
- Study & review loop with feedback

---

# System Structure (3 Pages Only)

## 1. Home Page (Flashcard Sets Dashboard)

Purpose:
Display all flashcard sets and allow filtering and navigation.

Features:
- List all flashcard sets
- Each set shows:
  - Title
  - Description (optional)
  - Progress percentage
  - Performance status color

Status Colors:
- Strong: #9AD872
- Medium: #E87F24
- Weak: #FF3737

Filters:
- By performance status: Weak / Medium / Strong
- By source type: AI-generated / Manually created

Action:
- Click set → open Study Page

---

## 2. Create / Edit Set Page

Purpose:
Create or edit flashcard sets and add cards manually or via AI.

Set Fields:
- Title (required)
- Description (optional)

Flashcard Modes:

A) Manual Mode:
- Front (question / term)
- Back (answer / explanation)

B) AI Mode:

Inputs:
- Text input
- YouTube URL
- File upload (optional UI)
- AI Instructions box

AI Instructions Examples:
- Focus on definitions
- Make exam-level questions
- Keep it simple

Output:
- front
- back

Requirements:
- User can edit AI-generated cards
- User can delete cards
- Combine manual + AI cards

---

## 3. Study Page (Flashcard Viewer)

Purpose:
Interactive learning system.

Behavior:
- Show one card at a time
- Stacked deck UI effect

Navigation:
- Left / Right arrows OR buttons:
  - I Understand
  - I Don’t Understand

Logic:
- Save response
- Auto move to next card

Tracking:
- New
- Understood
- Not understood

---

# UI / Design System

Style:
- Cartoonish
- Playful
- Lively
- Rounded UI
- Soft shadows

Main Colors:
- #622B14
- #995F2F
- #978F66
- #E4D6A9

Card Status Colors:
- Strong: #9AD872
- Medium: #E87F24
- Weak: #FF3737

---

# Core Learning Concept

Input → AI Flashcards → Study → Feedback → Better Understanding

---

# MVP Limitations

Not included:
- Spaced repetition system
- Gamification
- Exams mode
- Analytics dashboard
- Video upload processing
