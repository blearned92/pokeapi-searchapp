import styled, { keyframes } from "styled-components";
import { Generation, generations } from "../../models/SearchParameters";
import PokeBall from "../../images/PokeBall.png";
import TypeSelector from "./TypeSelector";
import { useState } from "react";
import GenerationSelector from "./GenerationSelector";

const Wrapper = styled.div`
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

const SearchMenu = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: gray;
    border: 2px solid white;
    border-radius: 10px;
    height: 80%;
    width: 75%;
`;

const SelectorBox = styled.div`
    height: 50%;
    display: flex;
    align-items: center;
    // border: 2px solid white;
`;

const Form = styled.form`
    height: 50%;
    display: flex;
    align-items: center;
    // border: 2px solid white;
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

const Label = styled.label`
    color: white;
    padding-right: 5px;
    font-size: .8em;
`;

type SearchBarProps = {
    loading:boolean,
    genButtons: number[],
    generation: Generation,
    setGeneration: React.Dispatch<React.SetStateAction<Generation>>,
    searchName: String,
    setSearchName: React.Dispatch<React.SetStateAction<String>>,
    type1:String,
    setType1:React.Dispatch<React.SetStateAction<String>>,
    type2:String,
    setType2:React.Dispatch<React.SetStateAction<String>>,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchBar = (Props:SearchBarProps) =>{
    const[name, setName] = useState<String>("");
    const[type1, setType1] = useState<String>("");
    const[type2, setType2] = useState<String>("");
    const[genIndex, setGenIndex] = useState<number>(0);

    const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value.trim());
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Props.setType1(type1.toLowerCase())
        Props.setType2(type2.toLowerCase())
        Props.setGeneration(generations[genIndex])
        Props.setSearchName(name.toLowerCase());
        Props.setOpenModal(false)
        console.log("type 1 " + Props.type1)
        console.log("type 2 " + Props.type2)
        console.log("search name " + Props.searchName)
    }

    return (
        <Wrapper>
            {Props.loading ? <LoadingBox><LoadingText>Loading...</LoadingText><LoadingLogo src={String(PokeBall)}/></LoadingBox>
            :   <SearchMenu>
                    <SelectorBox>
                        <TypeSelector 
                            type1={type1} 
                            setType1={setType1} 
                            type2={type2} 
                            setType2={setType2}/>
                        <GenerationSelector 
                            genButtons={Props.genButtons} 
                            genIndex={genIndex} 
                            setGenIndex={setGenIndex}/>
                    </SelectorBox>
                    
                    <Form onSubmit={handleSubmit}>
                        <Label>Name: </Label>
                        <input type="text" onChange={updateName}/>
                        <input type="submit"/>
                    </Form>
                </SearchMenu>}
        </Wrapper>
    )
}

export default SearchBar;