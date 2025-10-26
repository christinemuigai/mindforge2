# MindForge

This document provides instructions on how to set up and run the MindForge application locally.

## Prerequisites

- Git
- Node.js and npm
- Python 3 and pip

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/christinemuigai/mindforge2.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd mindforge2
    ```

The application consists of a `client` (frontend) and a `server` (backend). You will need two separate terminals to run them concurrently.

---

### Terminal 1: Running the Client (Frontend)

1.  **Navigate to the client directory:**

    ```bash
    cd client
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

---

### Terminal 2: Running the Server (Backend)

1.  **Navigate to the server directory:**

    ```bash
    cd server
    ```

2.  **Create and activate a virtual environment:**

    - **Windows:**
      ```bash
      python -m venv venv
      venv\Scripts\activate
      ```
    - **Linux/macOS:**
      ```bash
      python3 -m venv venv
      source venv/bin/activate
      ```

3.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Create a `.env` file** in the `server` directory with the following content, adding your API keys:

    ```env
    GROQ_API_KEY=
    GOOGLE_MAPS_API_KEY=
    ```

5.  **Run the server application:**
    ```bash
    python run.py
    ```
