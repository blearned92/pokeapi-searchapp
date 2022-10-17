import axios from "axios";
import { useEffect, useState } from "react";
import {IPokemon, IPokeURL, IPokeURLArray} from "../../models/IPokemon";
import SideBar from "../SideBar/SideBar";
import "./POKEApi.css";
import styled, {keyframes} from "styled-components";
import PokeBall from "../../images/PokeBall.png";
import { Generation, generations } from "../../models/SearchParameters";

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

const ButtonWrapper = styled.div`
    background-image: url(${PokeBall});
    background-size: cover;
    margin: 5px;
    background-color: purple;
    border-radius: 100%;
    height: 40%;

`;

const ButtonTitle = styled.div`
    padding-top: 30%;
    color: black;
    display: flex;
    justify-content: center;
    font-weight: 900;
    font-size: .7rem;
    cursor: pointer;
`;

const Button = styled.div`
    cursor: pointer;
    justify-content: center;
    height: 100%;
    aspect-ratio: 1 / 1;
    margin: 2px 2px;
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

const Rotate = keyframes`
    from{
        transoform: rotate(0deg);
    }
    to {
        transform: rotate(360deg)
    }
`;

const Loading = keyframes`
    from{width: 0;}
    to{width: 4em;}
`;

const LoadingBox = styled.div`
    text-align: center;
    height: 100%;
`;

const LoadingText = styled.h2`
    color: white;
    // animation: ${Loading} 1s steps(44) 1s 1 normal both;
    // &:after{
    //     content: "...";
    // }
`;

const LoadingLogo = styled.img`
    height: 50px;
    width: 50px;
    animation: ${Rotate} infinite .3s linear;
`;

const POKEApi = () => {

    //All pokemon will stay stored here
    const[pokemon, setPokemon] = useState<IPokemon[]>([]);
    const[loading, setLoading] = useState<boolean>(true);
    const[generation, setGeneration] = useState<Generation>(generations[0]);
    const genButtons = [0, 1, 2, 3, 4, 5, 6, 7]

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

    const renderPokemon = () => {
        return (
        <Main>
            {pokemon.map((pokemon)=>{
                if(pokemon.id>=generation.min && pokemon.id<=generation.max){
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
            <Header>
                {loading ? <LoadingBox><LoadingText>Loading...</LoadingText><LoadingLogo src={String(PokeBall)}/></LoadingBox>
                :   <>
                        {genButtons.map((number)=>{
                            return(
                                <ButtonWrapper onClick={() => {setGeneration(generations[number])}}>
                                <ButtonTitle>Gen {number+1}</ButtonTitle>
                                <Button></Button>
                                </ButtonWrapper>
                                
                            )
                        })}
                    </>}
            </Header>
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