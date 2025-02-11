# Project Setup Guide

This guide walks you through setting up and running the application, which consists of two main components:

1. **LibreTranslate** (Translation Service)
2. **Next.js** (Frontend Application)

It also includes some background on the decision-making process behind these choices.

---

## 1. Setting Up LibreTranslate

LibreTranslate is an open-source translation API that we’re using in this project. Instead of relying on an external API, I decided to go with a local installation. This provides several benefits:

- **No API rate limits** – Running it locally means we’re not restricted by request limits or potential pricing concerns.
- **Better control** – We can tweak performance, update models, and even modify the source if needed.
- **Offline support** – This setup works without an internet connection, making it more reliable in certain environments.

### Prerequisites

- Ensure you have **Docker** installed on your machine.

### Running LibreTranslate

From the root directory of the project, run:

```sh
./run.sh --load-only en,es,de,pt,fr --update-models --port 5000
```

This command does a few things:

- Loads only the specified languages (English, Spanish, German, Portuguese, and French).
- Updates translation models.
- Starts the LibreTranslate server on **port 5000**.

Once it’s running, the API will be accessible at:

```
http://localhost:5000
```

---

## 2. Setting Up Next.js (Frontend Application)

The Next.js frontend interacts with the LibreTranslate API to provide translations in a user-friendly way. Initially, I debated whether to use Next.js or stick to a simpler setup. Transitioning to Next.js added some development overhead, but ultimately, it made sense because:

- **It’s a widely used framework** – Demonstrating the ability to work with it is valuable.
- **Server-side capabilities** – It allows us to optimize API requests and improve performance.
- **Scalability** – This decision ensures the project can grow and support future features easily.

### Prerequisites

- Ensure you have **Node.js** installed (preferably version 18 or later).
- Ensure you have **npm** installed (comes with Node.js).

### Running Next.js

Navigate to the `nextjs` folder:

```sh
cd nextjs
```

Install dependencies (only required the first time or after updating dependencies):

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

The Next.js application will be accessible at:

```
http://localhost:3000
```

---

## Summary

- **Run LibreTranslate**: `./run.sh --load-only en,es,de,pt,fr --update-models --port 5000`
- **Run Next.js**: `cd nextjs && npm run dev`
- **LibreTranslate API URL**: `http://localhost:5000`
- **Next.js App URL**: `http://localhost:3000`

Make sure both services are running before accessing the frontend.

This setup provides flexibility, control, and a strong foundation for future improvements.
