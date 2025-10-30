const prompt = require("prompt-sync")();

let Taxis =[{ id: 1, position: 5, available: true, timeRemaining: 0, totalRides: 0 },
            { id: 2, position: 12, available: true, timeRemaining: 0,totalRides: 0 },
            { id: 3, position: 20, available: false, timeRemaining: 0,totalRides: 0 }]

let Requests=  [{ reqId: 1, position: 10, duration: 3, time: 0 },
                { reqId: 2, position: 3, duration: 4, time: 2 },
                { reqId: 3, position: 18, duration: 2, time: 4 },
                { reqId: 4, position: 7, duration: 5, time: 5 }]

let waitingList=[]
let totalTime= 20


function assignerTaxi(indice,request){
    Taxis[indice].available == false;
    Taxis[indice].totalRides++
    Taxis[indice].timeRemaining = request.duration
    Taxis[indice].position = request.position
}

function findNearestTaxi(n){
    let tab=[]
    let sd=0
    
    for (let i = 0; i < Taxis.length; i++) {
        if(Taxis[i].available==true){
        tab.push(Math.abs(Requests[n-1].position - Taxis[i].position))
           
    }else if(Taxis[i].available == false){
        waitingList.push(Requests[n-1])
    }
    }
    
    sd=Math.min(...tab)
    console.log("le taxi le plus près est ", );
    console.log(Taxis[tab.indexOf(sd)]);
    
    return tab.indexOf(sd)
    
    
}



for (let minute = 0; minute <= totalTime; minute++) {
    console.log("Minute:", minute);
    for(let i =0;i<Requests.length;i++){
        if(Requests[i].time==minute){
        let index= findNearestTaxi(Requests[i].reqId)

            assignerTaxi(index, Requests[i])

        }
    }
    
}

