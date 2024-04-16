//Compares the time between events
//Input: events object
//Output: 0 if events[0] is older, 1 if events[1] is older & undefined if both evets occured at the same time 
export function compareEventTimes(events: any){
    const event1 = events[0];
    const event2 = events[1];
    let oldEvent;

    if (event1.BCE){
        event1.year *= -1;
        console.log(event1.year)
    }
    if (event2.BCE){
        event2.year *= -1;
        console.log(event1.year)
    }

    if(event1.year > event2.year){
        oldEvent = 1
    } else if(event1.year < event2.year){
        oldEvent = 0
    } else if(event1.month > event2.month){
        oldEvent = 1
    } else if(event1.month < event2.month){
        oldEvent = 0
    } else if(event1.day > event2.day){
        oldEvent = 1
    } else if(event1.day < event2.day){
        oldEvent = 0
    } else {
        oldEvent = undefined;
    }
    return oldEvent
}


//Checks if the users choice is correct
//Input: events object & the user choice
//Output: returns true if the user was correct & false otherwise
export function checkAnswer(events: any, selection: number){
    const oldEvent = compareEventTimes(events)

    if(oldEvent == undefined){
        return true;
    }

    if(oldEvent == selection){
        return true;
    } else {
        return false;
    }
}