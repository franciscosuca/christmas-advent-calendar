# GEA Digital Advent Calendar

A responsive, interactive Digital Advent Calendar built for GEA to celebrate the holiday season. The application features 24 unlockable days, snowfall animations, and a responsive design tailored for GEA branding.

![GEA Digital](./assets/gea-logo.png)

## 🎄 Features

*   **24-Day Countdown:** Locks future dates and unlocks past/current dates automatically.
*   **Interactive Modal:** Displays images, text, and external links (e.g., LinkedIn posts) for each day.
*   **Snowfall Effect:** Performance-optimized CSS/JS particle system.
*   **Developer Mode:** Simulate specific dates to preview content before it goes live.
*   **Responsive Design:** optimized for Mobile, Tablet, and Desktop.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/franciscosuca/christmas-advent-calendar
    ```
2.  Navigate to the project folder:
    ```bash
    cd christmas-advent-calendar
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the local server:
    ```bash
    npm start
    ```

## 🖼️ Asset Management

### Logo
The main logo is located at `assets/gea-logo.png`.
*   To update the logo, simply replace this file.
*   **Filename:** Must remain `gea-logo.png` (or update `components/Header.tsx`).

### Daily Images
Images for the 24 days are stored in `assets/days/`.
*   **Naming Convention:** `day1.jpg`, `day2.jpg`, ..., `day24.jpg`.
*   **Supported Formats:** The code defaults to `.jpg`. If you use `.png`, please update the paths in `services/contentData.ts`.

## ⚙️ Configuration

### Content Data
Edit `services/contentData.ts` to change the text, titles, and links for each day.

```typescript
{
  day: 1,
  type: ContentType.LINKEDIN, // or ContentType.CUSTOM
  title: "The Season Begins!",
  imageUrl: "/assets/days/day1.jpg",
  text: "Description text here...",
  sourceUrl: "https://linkedin.com/..."
}
```

### Developer Mode (Testing)
To test future dates (e.g., to see what Day 24 looks like while it is currently December 1st), edit `constants.ts`:

```typescript
// Set to true to unlock days based on SIMULATED_DATE
export const USE_SIMULATED_DATE = true;

// Set the date you want to simulate (YYYY-MM-DD)
export const SIMULATED_DATE = '2024-12-25';
```

**⚠️ Important:** Remember to set `USE_SIMULATED_DATE = false` before deploying to production!

## 🛠️ Tech Stack

*   **Framework:** React 18+ with TypeScript
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **Fonts:** Nunito (Body), Mountains of Christmas (Headings)

## 📝 License

Internal Project for GEA.
