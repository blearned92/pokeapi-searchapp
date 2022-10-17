export interface IPokeURL {
    name:string
    url:string
}

export interface IPokeURLArray{
    next?: string | null;
    previous?: string | null;
    results:IPokeURL[]
}

export interface IPokemon {
    id:number,
    name:string,
    stats:{
        base_stat:number,
        stat:{
            name:string
        }
    }[]
    types:{
        type:{
            name:string,
            url:string
        }
    }[]
    sprites?:{
        front_default:string,
        front_shiny:string
    }
}