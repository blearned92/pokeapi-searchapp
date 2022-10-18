import styled, { keyframes } from "styled-components";
import { Generation, generations } from "../../models/SearchParameters";
import PokeBall from "../../images/PokeBall.png";

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
    padding-right: 10px;
`;

type SearchBarProps = {
    loading:boolean,
    genButtons: number[],
    setGeneration: React.Dispatch<React.SetStateAction<Generation>>,
    searchName: String,
    setSearchName: React.Dispatch<React.SetStateAction<String>>
}


const SearchBar = (Props:SearchBarProps) =>{
    let name = "";

    const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        name=event.target.value;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Props.setSearchName(name.toLocaleLowerCase());
    }

    return (
        <Wrapper>
            {Props.loading ? <LoadingBox><LoadingText>Loading...</LoadingText><LoadingLogo src={String(PokeBall)}/></LoadingBox>
            :   <>
                    <form onSubmit={handleSubmit}>
                        <Label>Name:</Label>
                        <input type="text" onChange={updateName}/>
                        <input type="submit"/>
                    </form>
                    {/* {Props.genButtons.map((number)=>{
                        return(
                            <ButtonWrapper onClick={() => {Props.setGeneration(generations[number])}}>
                            <ButtonTitle>{generations[number].generation}</ButtonTitle>
                            <Button></Button>
                            </ButtonWrapper>
                        )
                    })} */}
                </>}
        </Wrapper>
    )
}

export default SearchBar;