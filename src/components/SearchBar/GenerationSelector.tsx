import styled from "styled-components";
import { Generation, generations } from "../../models/SearchParameters";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
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

type GenerationProps = {
    genButtons: number[],
    genIndex: number,
    setGenIndex: React.Dispatch<React.SetStateAction<number>>
}

const GenerationSelector = (Props:GenerationProps) =>{

    const handleGeneration = (event:React.ChangeEvent<HTMLSelectElement>) => {
        let index = +event.target.value;
        Props.setGenIndex(index)
    }

    return (
        <Wrapper>
            <TypeBox>
                <Title>Generation</Title>
                <Select id="generation" onChange={(e) => handleGeneration(e)}>
                <Option value={0}></Option>
                    {
                        Props.genButtons.map((gen)=>{
                            if(gen !== 0){
                              return <Option key={gen} value={gen}>{gen}</Option>  
                            }   
                        })
                    }                      
                </Select>
            </TypeBox>
        </Wrapper>
    )
}

export default GenerationSelector;