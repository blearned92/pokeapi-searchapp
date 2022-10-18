import axios from "axios";
import { useEffect, useState } from "react";
import {IPokemon, IPokeURL, IPokeURLArray} from "../../models/IPokemon";
import SideBar from "../SideBar/SideBar";
import "./POKEApi.css";
import styled, {keyframes} from "styled-components";
import { Generation, generations } from "../../models/SearchParameters";
import SearchBar from "../SearchBar/SearchBar";

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
`;

const Header = styled.div`
    height: 20%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: black;
    position: fixed;
    top: 0;
    overflow: hidden;
    z-index: 100;
`;

const Body = styled.div`
    margin-top: 20vh;
    margin-left: 10%;
    height: 80vh;
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

const Image = styled.div`
    width: 50px;
    height: 50px;
`;

const PokeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 200px;
    margin: 10px;
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
`;

const PokeName = styled.h5`
    text-align: center;
`;

const PokeImg = styled.img`
    height: 100%;
    width: 100%;
`;

const POKEApi = () => {

    //All pokemon will stay stored here
    const[pokemon, setPokemon] = useState<IPokemon[]>([]);
    const[loading, setLoading] = useState<boolean>(true);
    const[searchName, setSearchName] = useState<String>("");
    const[type1, setType1] = useState<String>("");
    const[type2, setType2] = useState<String>("");
    const[generation, setGeneration] = useState<Generation>(generations[0]);
    const genButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8]

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
        } else if (pokemon.length < 1000){
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
        if(pokemon.types[0].type.name == type1){
            return true;
        }
        if(pokemon.types.length === 2) {
            if(pokemon.types[1].type.name == type1){
                return true;
            }
        }
        return false;
    }

    const containsType2 = (pokemon:IPokemon) => {
        if(pokemon.types[0].type.name == type2){
            return true;
        }
        if(pokemon.types.length === 2) {
            if(pokemon.types[1].type.name == type2){
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
            {pokemon.map((pokemon)=>{
                if(filterPokemon(pokemon)){
                    return <PokeBox key={pokemon.name}>
                    <PokeName>{pokemon.name.toUpperCase()}</PokeName>
                    <PokeImg src={pokemon.sprites.front_default}/>
                    </PokeBox>
                }
            })} 
        </Main>
        )
    }

    return (
        <Wrapper>
            <SearchBar loading={loading} 
                genButtons={genButtons} 
                setGeneration={setGeneration}
                searchName={searchName}
                setSearchName={setSearchName}/>
            <Body>
                <SideBar left={0}/>
                <Main>
                    {renderPokemon()}
                </Main>
                <SideBar left={1}/>
            </Body>
        </Wrapper>
    )
}

export default POKEApi;






                // <div className="Wrapper">
                //     <div className="list-grid">
                //         {
                //             pokemonArray.map((pokemon)=>{
                //                 return <div className={"container"} >
                //                     <div className={"background " + pokemon.types[0].type.name}>
                //                         <div className="head">
                //                             <table>
                //                                 <tr>
                //                                     <td className="name">{pokemon.name.toUpperCase()}</td>
                //                                     <td className="hp">{pokemon.stats[0].stat.name.toUpperCase()}: {pokemon.stats[0].base_stat}</td>
                //                                     <td className="logo"><img src={require("../../images/logos/"+ pokemon.types[0].type.name +".png")}/></td>
                //                                 </tr>
                //                             </table>
                //                         </div>
                //                         <div className="body">
                //                             <img src={pokemon.sprites?.front_default} className="img"/>
                //                         </div>
                //                         <div className="info">
                //                             <table>
                //                                 <tr>
                //                                     <td className="stat">{pokemon.stats[1].stat.name.toUpperCase()}</td>
                //                                     <td className="value">{pokemon.stats[1].base_stat}</td>
                //                                 </tr>
                //                                 <tr>
                //                                     <td className="stat">{pokemon.stats[2].stat.name.toUpperCase()}</td>
                //                                     <td className="value">{pokemon.stats[2].base_stat}</td>
                //                                 </tr>
                //                                 <tr>
                //                                     <td className="stat">{pokemon.stats[3].stat.name.toUpperCase()}</td>
                //                                     <td className="value">{pokemon.stats[3].base_stat}</td>
                //                                 </tr>
                //                                 <tr>
                //                                     <td className="stat">{pokemon.stats[4].stat.name.toUpperCase()}</td>
                //                                     <td className="value">{pokemon.stats[4].base_stat}</td>
                //                                 </tr>
                //                                 <tr>
                //                                     <td className="stat">{pokemon.stats[5].stat.name.toUpperCase()}</td>
                //                                     <td className="value">{pokemon.stats[5].base_stat}</td>
                //                                 </tr>
                //                             </table>
                //                         </div>
                //                         <div className="footer">Dex# {pokemon.id}</div>
                //                     </div>
                //                 </div>
                //             })
                //         }
                //     </div>
                // </div> 