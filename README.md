🚖 Smart Taxi Dispatcher
🧩 Problem Statement

In a busy city, managing multiple taxis and assigning them efficiently to customer requests can be chaotic. The goal of this project is to simulate an intelligent taxi dispatch system that assigns the closest available taxi to each ride request while handling waiting queues when no taxis are free.

⚙️ Project Steps

Define Data Structures – Create arrays for taxis and ride requests, each with properties like position, duration, and availability.

Build Core Functions – Implement logic to find the nearest available taxi and assign it to a request.

Simulate Time – Create a time loop that increases each minute, updating taxi states and handling new requests as they come.

Manage Waiting List – Store unassigned requests and recheck them once taxis become available.

Generate Final Report – Show each taxi’s total rides and final position at the end of the simulation.

🧠 Challenges Faced

Handling errors when requests were assigned to undefined taxis.

Managing waiting list requests without breaking the loop.

Making the time simulation realistic (taxis becoming available again after rides).

Testing edge cases with chaotic and random data sets.

✅ Result

The program now runs smoothly — taxis get assigned efficiently, waiting requests are handled properly, and a clear final report summarizes all rides.
