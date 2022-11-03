import { useState } from "react";
import styled from "styled-components";
import { IPokemon } from "../../models/IPokemon";
import PokeCard from "./PokeCard";

const Wrapper = styled.div`
    width: 76vw;
    height: 80vh;
    z-index: 1;
    position: fixed;
`;

const Container = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 10px;
    background-color: gray;
    overflow-y:auto;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    justify-content: right;
`;

const Body = styled.div`
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    border-radius: 5px;
    padding: 10px 50px;
    margin: 10px;
    font-weight: 700;
    cursor: pointer;
    @media(max-width: 768px){
        border-right: none;
        border-bottom: 1px solid black;
        width: 100%;
        font-size: 1rem;
        line-height: 1.3rem;
        padding: .8rem 0;
      }
`;

const Title = styled.p`
    font-size=.5em.
`;

type ModalProps = {
    pokemon:IPokemon,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const PokeDetailsModal = (Props:ModalProps) => {


    Props.pokemon.game_indices.map((index) => {
        console.log(index.version.name)
        //you can save these into an array, parse array, and if they exist, call a component through a function.
        //Future Idea
    })

    return (
        <Wrapper>
            <Container>
                <Header>
                    <Button onClick={()=>{Props.setOpenModal(false)}}>Back</Button>
                </Header>
                <Body>
                    <PokeCard pokemon={Props.pokemon}/>
                    



                </Body>
                
                
            </Container>
        </Wrapper>
    )
}

export default PokeDetailsModal;