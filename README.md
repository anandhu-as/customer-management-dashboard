# CRM Dashboard

A modern, high-performance Customer Relationship Management (CRM) dashboard built with a focus on usability, clean architecture, and scalability.

## Architecture & Tech Stack

This project is built using a modern React ecosystem, specifically leveraging the Next.js App Router for optimal performance and server-side capabilities.

### Frontend Technologies
*   **Next.js (App Router):** The core framework, providing file-system based routing, Server Components, and optimized rendering.
*   **React:** For building user interfaces and managing state.
*   **TypeScript:** Enforces type safety, enhancing developer experience and code reliability.
*   **Tailwind CSS:** A utility-first CSS framework used for rapid, responsive, and consistent styling without leaving the HTML.
*   **shadcn/ui & Radix UI:** Accessible, customizable UI component primitives used to build the design system (buttons, dropdowns, panels).
*   **dnd-kit:** A lightweight, performant, and accessible drag-and-drop toolkit used for reordering interactive elements like saved filters.
*   **Lucide React:** A clean and consistent icon library.

### Component Architecture
The application follows a modular component architecture:
*   `app/`: Contains the Next.js App Router definitions, pages, and layouts.
*   `components/ui/`: Reusable, foundational design system components (buttons, inputs).
*   `components/`: Feature-specific and layout components grouped by domain (e.g., `customers/`, `filters/`). 

We prioritize breaking down complex components into smaller, single-responsibility components to improve maintainability and readability.

## Data Pagination

### Cursor-Based Pagination
To handle large datasets efficiently, the application uses **Cursor-Based Pagination** instead of traditional offset-based pagination. 

*   **How it Works:** Instead of skipping a certain number of records (which becomes slow with deep pagination), a "cursor" (usually a unique identifier or timestamp from the last received item) is passed to fetch the next set of results.
*   **Benefits:**
    *   **Performance:** Queries remain consistently fast regardless of how many pages the user navigates through, as the database uses an index to locate the cursor.
    *   **Consistency:** Resolves issues with duplicate or missing records when items are added or deleted while the user is paginating.
*   **Implementation:** The data tables and hooks (like `useCustomers`) manage the cursor state (`nextCursor`, `prevCursor`) to seamlessly fetch subsequent pages of data.

## Getting Started

1.  Install dependencies:
    ```bash
    pnpm install
    ```
2.  Run the development server:
    ```bash
    pnpm dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
