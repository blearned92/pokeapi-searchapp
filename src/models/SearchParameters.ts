export interface Generation {
    generation:String,
    min:number, 
    max: number
}

export const generations:Generation[] = [
    {
        generation: "All",
        min:1, 
        max:1000
    },
    {
        generation: "Gen 1",
        min:1, 
        max:151
    },
    {
        generation: "Gen 2",
        min:152, 
        max:251
    },
    {
        generation: "Gen 3",
        min:252, 
        max:386
    },
    {
        generation: "Gen 4",
        min:387, 
        max:493
    },
    {
        generation: "Gen 5",
        min:494, 
        max:649
    },
    {
        generation: "Gen 6",
        min:650, 
        max:721
    },
    {
        generation: "Gen 7",
        min:722, 
        max:809
    },
    {
        generation: "Gen 8",
        min:810, 
        max:898
    }
]
