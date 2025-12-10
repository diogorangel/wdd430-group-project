Project by @_diogorangel (Diogo Rangel Dos Santos)
WDD430 - React and next project
🏡 Handcrafted Haven: Artisan Marketplace
Handcrafted Haven is a simplified, dynamic marketplace application built on the Next.js framework using TypeScript and React Hooks. It simulates a platform where independent artisans can list their unique products.

This project was initially converted from a standard "To-Do List" application, focusing the logic on product listings, seller management, and sales aggregation.
✨ Key Features
Product Listing: Artisans can add new products (title) and assign themselves as the seller from a predefined list.

Dynamic Pricing: Each new product is automatically assigned a random price (e.g., $1.00 - $100.00) upon listing.

Seller Sales Summary (Core Feature): The application calculates and displays the total sales amount for each unique artisan in real-time. This logic aggregates sales whenever the listings change.

Curated Collection: Products can be toggled as "Featured" or "Curated," separating them into a special collection view.

Persistent Data: All product listings and sales data are stored in the browser's Local Storage, ensuring data persists even after the user closes and reopens the application.
🛠️ Technology Stack<
Technology | Purpose
-- | --
Next.js | React Framework for structure and routing.
TypeScript | Ensures type safety and improves code quality.
React Hooks | Manages component state and side effects (useState, useEffect, useMemo).
Local Storage | Simple data persistence for the listings.
Tailwind CSS | Used indirectly via globals.css and utility classes for basic styling.
🚀 Getting Started
Follow these steps to set up and run the project locally.

Prerequisites
You need Node.js (version 18.0 or later) and npm installed on your system.

Installation
Clone the repository:

Bash
git clone [YOUR-REPO-URL]
cd handcrafted-haven
Install dependencies:

Bash

npm install
Running the Application
Start the development server:

Bash

npm run dev
Access the application: Open your browser and navigate to http://localhost:3000.

📂 Project Structure
The key files defining the application logic are:

page.tsx: Contains the core logic, state management (useState, useMemo), listing creation, removal, featured status toggling, and the Sales Summary calculation.

layout.tsx: Defines the overall structure, metadata for SEO/branding, global CSS import, and includes the persistent Footer component.

globals.css: Contains base styles and theme variables.

lib/useLocalStorage.ts: (Assumed utility file) Custom hook to handle data persistence to and from Local Storage.

Seller Sales Calculation Logic
The sales aggregation is performed efficiently using useMemo in page.tsx:
// Located in page.tsx
const salesSummary = useMemo(() => {
    const totals: Record<string, number> = {};
    listings.forEach(listing => {
        // Parse the price string to a float
        const price = parseFloat(listing.price); 
        const seller = listing.seller;
        
        // Accumulate the total sales for the seller
        totals[seller] = (totals[seller] || 0) + price;
    });
    return totals;
}, [listings]); // Recalculates ONLY when listings change

🤝 Contribution and Contact
This project was developed as a group exercise for WDD430, led by Diogo Rangel Dos Santos.

Copyright © 2025 Wdd430 Group Project - [Diogo Rangel Dos Santos](https://www.linkedin.com/in/diogorangels/). All Rights Reserved.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
