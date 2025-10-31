const prompt = require("prompt-sync")();

let Taxis = [
  { id: 1, position: 5, available: true, timeRemaining: 0, totalRides: 0 },
  { id: 2, position: 50, available: true, timeRemaining: 0, totalRides: 0 },
  { id: 3, position: 90, available: true, timeRemaining: 0, totalRides: 0 }
]

let Requests = [
  { reqId: 1, position: 10, duration: 6, time: 0 },
  { reqId: 2, position: 55, duration: 5, time: 1 },
  { reqId: 3, position: 15, duration: 8, time: 2 },
  { reqId: 4, position: 92, duration: 3, time: 3 },
  { reqId: 5, position: 45, duration: 4, time: 3 },
  { reqId: 6, position: 60, duration: 9, time: 4 },
  { reqId: 7, position: 25, duration: 3, time: 5 },
  { reqId: 8, position: 95, duration: 2, time: 5 },
  { reqId: 9, position: 12, duration: 7, time: 6 },
  { reqId: 10, position: 40, duration: 3, time: 7 },
  { reqId: 11, position: 88, duration: 5, time: 8 },
  { reqId: 12, position: 5, duration: 4, time: 9 },
  { reqId: 13, position: 20, duration: 6, time: 10 },
  { reqId: 14, position: 30, duration: 5, time: 10 },
  { reqId: 15, position: 78, duration: 7, time: 11 },
  { reqId: 16, position: 2, duration: 3, time: 12 },
  { reqId: 17, position: 53, duration: 8, time: 13 },
  { reqId: 18, position: 85, duration: 6, time: 14 },
  { reqId: 19, position: 10, duration: 4, time: 15 },
  { reqId: 20, position: 65, duration: 5, time: 16 },
  { reqId: 21, position: 70, duration: 6, time: 17 },
  { reqId: 22, position: 95, duration: 4, time: 18 },
  { reqId: 23, position: 14, duration: 5, time: 19 },
  { reqId: 24, position: 33, duration: 7, time: 20 },
  { reqId: 25, position: 45, duration: 9, time: 21 },
  { reqId: 26, position: 8, duration: 3, time: 22 },
  { reqId: 27, position: 99, duration: 8, time: 23 },
  { reqId: 28, position: 37, duration: 4, time: 24 },
  { reqId: 29, position: 55, duration: 6, time: 25 },
  { reqId: 30, position: 75, duration: 3, time: 26 }
]



let waitingList=[]
let totalTime= 60


function assignerTaxi(indice,requestId){
    Taxis[indice].available = false;
    Taxis[indice].totalRides++;
    Taxis[indice].timeRemaining = Requests[requestId].duration;
    Taxis[indice].position = Requests[requestId].position;   
}

function findNearestTaxi(requestIndice){
    let tab=[]
    let indices=[]
    
    
    for (let i = 0; i < Taxis.length; i++) {
        if(Taxis[i].available===true){
        tab.push(Math.abs(Requests[requestIndice].position - Taxis[i].position))
        indices.push(i)   
    }
    }
    if(tab.length===0) return [-1,-1]
    
    let sd=Math.min(...tab)
    
    // console.log("le taxi le plus prés est ",Taxis[tab.indexOf(sd)].id,"");
    let taxiIndex = indices[tab.indexOf(sd)]
     return [taxiIndex, sd]
}




for (let minute = 0; minute <= totalTime; minute++) {
    console.log("Minute:", minute);

   

        for (let t = 0; t < Taxis.length; t++) {
            if (Taxis[t].available == false) {                
                Taxis[t].timeRemaining--;

       
                if (Taxis[t].timeRemaining <= 0) {
                    Taxis[t].available = true;
                    Taxis[t].timeRemaining = 0;
                    console.log("Taxi", Taxis[t].id, "is now available again.");
                }
        }

        }



 for(let i =0;i<Requests.length;i++){
        if(Requests[i].time==minute){
        let [index, shortDistance] = findNearestTaxi(i);
        if(index != -1){
            console.log("Request: ",Requests[i].reqId," at position ",Requests[i].position+" -> Taxi ",Taxis[index].id +" assigné (distance",shortDistance+")");
            assignerTaxi(index,i)
         
        }else{
            console.log("Request:", Requests[i].reqId, "added to waiting list (no taxi available)");
            waitingList.push(Requests[i]);
             }
        }
    }


    if (waitingList.length > 0) {
        let stillWaiting = [];
        for (let w = 0; w < waitingList.length; w++) {
            let [index, shortDistance] = findNearestTaxi(w);
            if (index != -1) {
                console.log("Request (waiting):", waitingList[w].reqId, "-> Taxi", Taxis[index].id, 
                            "assigné (distance", shortDistance + ")");
                let reqIndex = Requests.findIndex(r => r.reqId == waitingList[w].reqId);
                assignerTaxi(index, reqIndex);
            } else {
                stillWaiting.push(waitingList[w]);
            }
        }
        waitingList = stillWaiting;
    }

   
    
}
console.log("\n--- Simulation terminée --- \n Final report: ");
for (let t = 0; t < Taxis.length; t++) {
    console.log("Taxi", Taxis[t].id, "-> courses:", Taxis[t].totalRides, 
                "position finale:", Taxis[t].position);
}
