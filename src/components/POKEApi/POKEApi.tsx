import axios from "axios";
import { useEffect, useState } from "react";
import {IPokemon, IPokeURLArray} from "../../models/IPokemon";
// import SideBar from "../SideBar/SideBar";
import "./POKEApi.css";
import styled from "styled-components";
import { Generation, generations } from "../../models/SearchParameters";
import SearchBar from "../SearchBar/SearchBar";
import MiniCard from "../PokeCard/MiniCard";
import PokeDetailsModal from "../PokeCard/PokeDetailsModal";
import PokeTable from "../PokeTable/PokeTable";

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
`;

const Body = styled.div`
    margin-top: 20vh;
    margin-left: 10%;
    // height: 80vh;
    width: 80%;
    display: flex;
`;

const Main = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const Test = styled.h1`
    color: white;
    background-color: black;
`;

const POKEApi = () => {

    //All pokemon will stay stored here
    const[pokemon, setPokemon] = useState<IPokemon[]>([]);
    const[loading, setLoading] = useState<boolean>(true);
    const[openModal, setOpenModal] = useState<boolean>(false);
    const[searchName, setSearchName] = useState<String>("");
    const[type1, setType1] = useState<String>("");
    const[type2, setType2] = useState<String>("");
    const[generation, setGeneration] = useState<Generation>(generations[0]);
    const genButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    const [currentPokemon, setCurrentPokemon] = useState<IPokemon>({} as IPokemon);

    //LOAD ALL POKEMON WHEN PAGE IS LOADED
    useEffect(()=>{
        const getPoke = async (limit:number, offset:number) => {
            try{
                let list:IPokemon[] = [...pokemon];
                const pokeList = await getPokemonList(limit, offset);
                for(const listItem of pokeList.results){
                    const pokemon = await getPokemon(listItem.url);
                    list.push(pokemon)
                }
                console.log(pokeList.results);
                setLoading(false);
                setPokemon(list);
            } catch (e){
                console.error(e);
            }
        }
        if(pokemon.length === 0){
            getPoke(50, 0);   
            console.log(pokemon.length)
        } else if (pokemon.length < 1154){
            getPoke(50, pokemon.length);
            console.log(pokemon.length)
        }       
    },[pokemon])

    async function getPokemonList(limit:number, offset:number):Promise<IPokeURLArray>{
        const response = await axios.get<IPokeURLArray>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        return response.data;
    }

    async function getPokemon(url:string):Promise<IPokemon>{
        const firstPokemon = await axios.get<IPokemon>(url);
        return firstPokemon.data;
    } 

    const checkGeneration = (pokemon:IPokemon) => {
        if(!(pokemon.id>=generation.min && pokemon.id<=generation.max)){
            return false;
        }
        return true;
    }

    const containsType1 = (pokemon:IPokemon) => {
        if(pokemon.types[0].type.name === type1){
            return true;
        }
        if(pokemon.types.length === 2) {
            if(pokemon.types[1].type.name === type1){
                return true;
            }
        }
        return false;
    }

    const containsType2 = (pokemon:IPokemon) => {
        if(pokemon.types[0].type.name === type2){
            return true;
        }
        if(pokemon.types.length === 2) {
            if(pokemon.types[1].type.name === type2){
                return true;
            }
        }
        return false;
    }
    
    const constainsName = (pokemon:IPokemon) => {
        if(pokemon.name.includes(searchName.toString())){
            return true;
        }
        return false;
    }

    const filterPokemon = (pokemon:IPokemon) => {
        if(!checkGeneration(pokemon)){
            return false;
        }
        if(!containsType1(pokemon) && type1 !== ""){
            return false;
        }
        if(!containsType2(pokemon) && type2 !== ""){
            return false;
        }
        if(!constainsName(pokemon)){
            return false;
        }
        return true;
    }

    const renderPokemon = () => {
        return (
        <Main>
            <PokeTable 
                pokemon={pokemon} 
                filerPokemon={filterPokemon} 
                setCurrentPokemon={setCurrentPokemon} 
                setOpenModal={setOpenModal}/>
        </Main>
        )
    }

    return (
        <Wrapper>
            <SearchBar loading={loading} 
                genButtons={genButtons} 
                generation={generation}
                setGeneration={setGeneration}
                searchName={searchName}
                setSearchName={setSearchName}
                type1={type1}
                setType1={setType1}
                type2={type2}
                setType2={setType2}
                setOpenModal={setOpenModal}/>
            <Body>
                {/* <SideBar left={0}/> */}
                <Main>
                    {
                    openModal ? 
                    <PokeDetailsModal pokemon={currentPokemon} setOpenModal={setOpenModal}/> :
                    <PokeTable 
                        pokemon={pokemon} 
                        filerPokemon={filterPokemon} 
                        setCurrentPokemon={setCurrentPokemon} 
                        setOpenModal={setOpenModal}/>
                    }
                </Main>
                {/* <SideBar left={1}/> */}
            </Body>
        </Wrapper>
    )
}

export default POKEApi;
