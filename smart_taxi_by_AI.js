// Données initiales
const Taxis = [
  { id: 1, position: 5, available: true, timeRemaining: 0, totalRides: 0 },
  { id: 2, position: 12, available: true, timeRemaining: 0, totalRides: 0 },
  { id: 3, position: 20, available: true, timeRemaining: 0, totalRides: 0 }
];

const Requests = [
  { reqId: 1, position: 10, duration: 3, time: 0 },
  { reqId: 2, position: 3, duration: 4, time: 2 },
  { reqId: 3, position: 18, duration: 2, time: 4 },
  { reqId: 4, position: 7, duration: 5, time: 5 }
];

// File d'attente pour les demandes
const waitingQueue = [];

// Variables de simulation
let currentTime = 0;
let totalRides = 0;

// A. Trouver le taxi le plus proche et disponible
function findNearestAvailableTaxi(requestPosition) {
  let nearestTaxi = null;
  let minDistance = Infinity;

  for (const taxi of Taxis) {
    if (taxi.available) {
      const distance = Math.abs(taxi.position - requestPosition);
      if (distance < minDistance) {
        minDistance = distance;
        nearestTaxi = taxi;
      }
    }
  }

  return { taxi: nearestTaxi, distance: minDistance };
}

// B. Assigner un taxi à une demande
function assignTaxiToRequest(taxi, request) {
  taxi.available = false;
  taxi.timeRemaining = request.duration;
  taxi.totalRides++;
  totalRides++;
  
  console.log(`→ Request ${request.reqId} at position ${request.position} → Taxi ${taxi.id} assigned (distance: ${Math.abs(taxi.position - request.position)})`);
  
  // Mise à jour de la position du taxi (se déplace vers la demande)
  taxi.position = request.position;
}

// C. Libérer les taxis et gérer le temps
function updateTaxis() {
  for (const taxi of Taxis) {
    if (!taxi.available && taxi.timeRemaining > 0) {
      taxi.timeRemaining--;
      
      // Libérer le taxi quand le trajet est terminé
      if (taxi.timeRemaining === 0) {
        taxi.available = true;
        console.log(`→ Taxi ${taxi.id} finished ride`);
        
        // D. Vérifier s'il y a des demandes en attente
        if (waitingQueue.length > 0) {
          const nextRequest = waitingQueue.shift();
          console.log(`→ Taxi ${taxi.id} takes Request ${nextRequest.reqId} from queue`);
          assignTaxiToRequest(taxi, nextRequest);
        }
      }
    }
  }
}

// Traiter les demandes à un moment donné
function processRequestsAtTime(time) {
  const requestsAtTime = Requests.filter(req => req.time === time);
  
  for (const request of requestsAtTime) {
    const { taxi, distance } = findNearestAvailableTaxi(request.position);
    
    if (taxi) {
      assignTaxiToRequest(taxi, request);
    } else {
      console.log(`→ Request ${request.reqId} at position ${request.position} → all taxis busy → added to queue`);
      waitingQueue.push(request);
    }
  }
}

// E. Générer le rapport final
function generateFinalReport() {
  console.log('\n--- Final Report ---');
  for (const taxi of Taxis) {
    console.log(`Taxi ${taxi.id}: ${taxi.totalRides} rides, position ${taxi.position}`);
  }
  console.log(`Total rides: ${totalRides}`);
  console.log(`Total simulation time: ${currentTime} minutes`);
}

// Simulation principale
function runSimulation() {
  console.log('=== SMART TAXI DISPATCHER ===\n');
  
  const maxTime = Math.max(...Requests.map(r => r.time)) + 
                  Math.max(...Requests.map(r => r.duration)) + 5;
  
  for (currentTime = 0; currentTime <= maxTime; currentTime++) {
    // Vérifier s'il y a des événements à afficher
    const hasRequests = Requests.some(req => req.time === currentTime);
    const hasTaxiActivity = Taxis.some(taxi => !taxi.available && taxi.timeRemaining === 1);
    const hasQueueActivity = waitingQueue.length > 0 && Taxis.some(taxi => taxi.available);
    
    if (hasRequests || hasTaxiActivity || hasQueueActivity) {
      console.log(`\nMinute ${currentTime}:`);
    }
    
    // Traiter les nouvelles demandes
    processRequestsAtTime(currentTime);
    
    // Mettre à jour les taxis
    updateTaxis();
    
    // Vérifier si tous les trajets sont terminés
    const allTaxisAvailable = Taxis.every(taxi => taxi.available);
    const noWaitingRequests = waitingQueue.length === 0;
    const allRequestsProcessed = Requests.every(req => req.time <= currentTime);
    
    if (allTaxisAvailable && noWaitingRequests && allRequestsProcessed) {
      console.log(`\nMinute ${currentTime}:`);
      console.log('All rides completed.');
      break;
    }
  }
  
  generateFinalReport();
}

// Lancer la simulation
runSimulation();