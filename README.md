
# 🚖 Smart Taxi Dispatcher

### 🧩 Overview

This project simulates a **smart taxi dispatch system** written in JavaScript (Node.js).
The goal is to manage multiple taxis and assign them efficiently to incoming ride requests based on proximity and availability — like a simplified version of how real ride-hailing apps (Uber, Bolt, etc.) handle dispatching.

It’s meant as a **learning project**, built step by step to understand loops, functions, arrays, and simulation logic in JavaScript — without using advanced built-ins like `filter`, `map`, or `reduce`.

---

### ⚙️ How It Works

* **Taxis:** Each taxi has an ID, a position, availability status, total rides count, and remaining time to finish its current ride.
* **Requests:** Each ride request has an ID, a position (where the client is), a duration, and the time it appears in the system.
* **Simulation Loop:**
  The program simulates time passing (minute by minute).
  At each minute:

  1. New requests may appear.
  2. The system looks for the **nearest available taxi** to that request.
  3. If found → the taxi is assigned and becomes busy.
  4. If no taxi is free → the request is added to a **waiting list**.
  5. Once a taxi finishes its ride, it becomes available again.

---

### 🧠 Main Objectives

* Practice **basic programming concepts** (loops, conditions, functions, arrays, indices).
* Understand **simulation logic** (how events evolve over time).
* Avoid shortcuts (no arrow functions, no array methods like `filter` or `reduce`).
* Build toward a clean, working model of a dispatching algorithm.

---

### 📁 File Structure

```
Smart_Taxi_Dispatcher/
│
├── Smart_taxi_dispatcher.js   # Main simulation script
├── README.md                  # Project description
└── package.json               # (optional) Node setup if needed
```

---

### ▶️ How to Run

Make sure you have **Node.js** installed.
Then, open a terminal in the project folder and run:

```bash
node Smart_taxi_dispatcher.js
```

You’ll be asked to input ride request IDs or see simulation logs minute by minute.

---

### 🔍 Current Status

The core simulation is functional but still in progress:

* Taxi assignment works.
* Waiting list logic is being refined.
* Need better handling for when no taxis are available.

Next steps could include:

* Visual output or console table for each minute.
* More realistic distance and time models.
* Automatic processing of waiting requests once taxis become available.

---

### 🧑‍💻 Author

Developed by **Anas Berkaoui**,
as a practice project to improve logic and simulation skills in JavaScript.


