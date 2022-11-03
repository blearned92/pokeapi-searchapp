import styled from "styled-components";
import { IPokemon } from "../../models/IPokemon";

const Wrapper = styled.div`
    width: 100%;
    margin: 3px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Table = styled.table`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TableHead = styled.thead`
    width: 100%;
    height: 30%;
`;

const TableBody = styled.tbody`
    width: 100%;
    height: 30%;
    border: 1px solid black;
`;

const TableRow = styled.tr`
    background-color: gray;
    display: flex;
    justify-contents: stretch;
    align-items: center;
    margin: 2px;
`;

const TableData = styled.td`
    font-size: .8rem;
    font-weight: 600;
    text-align: center;
    margin: 0 2px;

`;

const DexData = styled(TableData)`
    width: 10%; 
`;

const Pic = styled(TableData)`
    width: 10%;
`;

const Name = styled(TableData)`
    width: 30%;
    text-decoration: underline;
    &:hover {
        color: red;
    }
`;

const Type = styled(TableData)`
    width: 25%;
`;

const Abilities = styled(TableData)`
    width: 25%;
`;

const Typing = styled.p`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: .8rem;
`;

const Ability = styled.p`
    font-size: .8em;
`;

const TablePic = styled.img`
    height: 100%;
    width: 100%;
`;

type TableProps = {
    pokemon:IPokemon[],
    filerPokemon:(pokemon: IPokemon) => boolean,
    setCurrentPokemon:React.Dispatch<React.SetStateAction<IPokemon>>,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const PokeTable = (Props:TableProps) => {

    const handleModalClick = (pokemon:IPokemon) =>{
        Props.setCurrentPokemon(pokemon);
        Props.setOpenModal(true);
    }

    const handleTypes = (pokemon:IPokemon) => {
        if(pokemon.types.length === 1){
            return <Typing>{pokemon.types[0].type.name.toUpperCase()}</Typing>
        } else {
            return <Typing>{pokemon.types[0].type.name.toUpperCase()} / {pokemon.types[1].type.name.toUpperCase()}</Typing>
        }
    }

    return (
        <Wrapper>
            <Table>
                <TableHead>
                     <TableRow>
                        <DexData>Dex:</DexData>
                        <Pic>Pic:</Pic>
                        <Name>Name:</Name>
                        <Type>Type:</Type>
                        <Abilities>Abilities:</Abilities>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Props.pokemon.map((pokemon)=>{
                            if(Props.filerPokemon(pokemon)){
                                return (
                                    <TableRow key={pokemon.id} onClick={()=>handleModalClick(pokemon)}>
                                        <DexData>{pokemon.id}</DexData>
                                        <Pic><TablePic src={pokemon.sprites.front_default}/></Pic>
                                        <Name>{pokemon.name.toUpperCase()}</Name>
                                        <Type>
                                            {handleTypes(pokemon)}
                                        </Type>
                                        <Abilities>
                                            {
                                                pokemon.abilities.map((ability)=>{
                                                    return <Ability>{ability.ability.name.toUpperCase()}</Ability>
                                                })
                                            }
                                        </Abilities>
                                    </TableRow>
                                )
                            }
                        })
                    }
                </TableBody>
                
            </Table>
        </Wrapper>
    )
}

export default PokeTable;