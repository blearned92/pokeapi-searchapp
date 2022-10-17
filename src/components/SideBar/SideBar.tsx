import { useState } from "react";
import styled from "styled-components";
import PokeBall from "../../images/PokeBall.png"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 10%;
    height: 80%;
    background-color: #050E5F;
    position: fixed;
    bottom: 0;
    right: 0;
    left: ${props => props.theme.main};
    z-index: 1;
    justify-content: space-between;
`;

const Image = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1;
`;

const returnLogos = () => {
    for(let i=0; i<15; i++){

    }
}

 type WrapperProps = {
    left:number
 }


const SideBar = (Props:WrapperProps) =>{
    Wrapper.defaultProps = {
        theme: {
            main: Props.left
        }
    }
    return (
        <Wrapper theme={Props.left}>
            {Array.from(Array(12),(e, i)=>{
                return <Image src={String(PokeBall)} key={i}/>
            })}
            
        </Wrapper>
    )
}

export default SideBar;