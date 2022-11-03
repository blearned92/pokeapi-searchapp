import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
`;

const TypeBox = styled.div`
    text-align: center;
`;

const Title = styled.h6`
    margin: 0;
    color:white;
`;

const Select = styled.select`

`;

const Option = styled.option`

`;

type TypeSelectorProps = {
    type1:String,
    setType1: React.Dispatch<React.SetStateAction<String>>,
    type2:String,
    setType2: React.Dispatch<React.SetStateAction<String>>
}

const TypeSelector = (Props:TypeSelectorProps) => {

    const types = ["", 
        "normal", "fire", "water", 
        "grass", "electric", "ice", 
        "fighting", "poison", "ground",
        "flying", "psychic", "bug",
        "rock", "ghost", "dark",
        "dragon", "steel", "fairy"];

    const handleType1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value)
        console.log(Props.type1)
        Props.setType1(event.target.value)
    }

    const handleType2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value)
        console.log(Props.type1)
        Props.setType2(event.target.value)
    }

    return (
        <Wrapper>
            <TypeBox>
                <Title>Type 1</Title>
                <Select id="type1" onChange={(e)=>handleType1(e)}>
                    {types.map((type)=>{
                            return (
                                <Option key={type.toString() + "1"} value={type.toString()}>{type}</Option>
                            )
                        })}
                </Select>
            </TypeBox>
            <TypeBox>
                <Title>Type 2</Title>
                <Select id="type2" onChange={(e)=>handleType2(e)}>
                    {types.map((type)=>{
                            return (
                                <Option key={type.toString() + "2"} value={type.toString()}>{type}</Option>
                            )
                        })}
                </Select>
            </TypeBox>
        </Wrapper>
    )
}

export default TypeSelector;