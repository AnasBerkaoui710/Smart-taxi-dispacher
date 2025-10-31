
let Taxis = [
    { id: 1, position: 5, available: true, timeRemaining: 0, totalRides: 0 },
    { id: 2, position: 10, available: true, timeRemaining: 0, totalRides: 0 }
];

let Requests = [
    { reqId: 1, position: 6, duration: 8, time: 0 },
    { reqId: 2, position: 8, duration: 5, time: 1 },
    { reqId: 3, position: 9, duration: 3, time: 2 },
    { reqId: 4, position: 7, duration: 6, time: 3 },
    { reqId: 5, position: 4, duration: 2, time: 4 },
    { reqId: 6, position: 3, duration: 1, time: 5 }
];


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

