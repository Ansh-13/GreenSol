export default function Roi_Calculation (x: number, a:number) {

    // x is Annual Electricity Cost
    // a is Shadow Free space

    if(a < 100) {
        return Error("Mininumm shadow free area should be greater than 100 sq ft")
    }

    // y is Monthly KW usage

    let y:number = x / 12;

    const arr = [116, 232 , 348, 464];

    // Z is KW System
    let z:number = 0;

    let b:number = a /100; 

    for(let i =0;i<arr.length;i++){
        if(arr[i] > y) {
            z = arr[i];
            break;
        }
    }
    
    const Saving_Cost_Money:number = (25 - (z/x)) * x;
    const Time_After_Free_Electricity = z/x;
    const Free_Electricity_For = 25 - (z/x);


}