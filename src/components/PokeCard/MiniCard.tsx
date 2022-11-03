import styled from "styled-components";
import { IPokemon } from "../../models/IPokemon";

const Wrapper = styled.div`
    width: 100%;
    height: 60px;
    background-color: gray;
    border: 2px solid black;
    margin: 3px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const PokeTable = styled.table`
    height: 95%;
    width: 99%;
    border: 2px solid black;
    // display: flex;
    // flex-direction: column;
    // justify-content: left;
    // align-items: center;
`;

const TableHead = styled.thead`

`;

const PokeName = styled.h5`
    margin: 3% 0;
    background-color: white;
    color: red;
    border: 1px solid black;
    width: 90%;
    text-align: center;
`;

const PokeImg = styled.img`
    background-color: white;
    border: 1px solid black;
    height: 80%;
    width: 80%;
`;

type MinicardProps = {
    pokemon:IPokemon,
    setCurrentPokemon: React.Dispatch<React.SetStateAction<IPokemon>>,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}
const MiniCard = (Props:MinicardProps) =>{
    
    const handleModalClick = (pokemon:IPokemon) =>{
        Props.setCurrentPokemon(pokemon);
        Props.setOpenModal(true);
    }

    return (
        <Wrapper>
            <PokeTable onClick={()=>handleModalClick(Props.pokemon)}>
                <tbody>
                    <tr>
                        <td>no</td>
                    </tr>
                </tbody>
                {/* <PokeName>{Props.pokemon.name.toUpperCase()}</PokeName>
                <PokeImg src={Props.pokemon.sprites.other.home.front_default}/>                */}
            </PokeTable>
        </Wrapper>
        
    )
 
}

export default MiniCard;