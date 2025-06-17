# Guess the Song Website

A React app that lets users guess songs by listening to YouTube audio clips, using local JSON files for questions.

## Features

- Loads questions from local JSON files in `public/`
- Randomly picks a song and searches YouTube for a playable video
- Lets users guess the song or singer

## Setup

1. **Clone this repo** (or copy the files to your project directory)

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add your YouTube Data API key**

   Create a `.env` file in the project root:

   ```env
   REACT_APP_YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY_HERE
   ```

4. **Add your question JSON files**

   Place your new problems set in the `public/` folder. Example structure:

   ```json
   {
     "update": "2025/1/2",
     "problems": [
       { "song": "不能說的秘密", "singer": "周杰倫" },
       { "song": "掉了", "singer": "張惠妹" }
     ]
   }
   ```
5. **Build the project**
   ```bash
   npm run build
   ```
6. **Start the app**

   ```bash
   npm run start
   ```

6. **Open in browser**

   Visit [http://localhost:3000](http://localhost:3000)

---

## Notes

- Your API key will be visible in the frontend (not for production use).
- You can add more JSON files and update `src/App.js` to include them.
