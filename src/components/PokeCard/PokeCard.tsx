import { useState } from "react";
import { IPokemon } from "../../models/IPokemon";
import '../POKEApi/POKEApi.css';


const PokeCard = (Props:{pokemon:IPokemon}) =>{

    const [shiny, setShiny] = useState<boolean>(false);

    const handleShiny = () =>{
        if(shiny===true){
            setShiny(false);
        } else {
            setShiny(true);
        }
    }

    return <div className={"container"}>
        <div className={`background ${Props.pokemon.types[0].type.name}`}>
            <div className="head">
                <table>
                    <tbody>
                        <tr>
                            <td className="name">{Props.pokemon.name.toUpperCase()}</td>
                            <td className="hp">{Props.pokemon.stats[0].stat.name.toUpperCase()}: {Props.pokemon.stats[0].base_stat}</td>
                            <td className="logo"><img src={require("../../images/logos/"+ Props.pokemon.types[0].type.name +".png")}/></td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
            <div className="body">
                <img src={Props.pokemon.sprites.other["official-artwork"].front_default} className="img"/>      
            </div>
            <div className="info">
                <table>
                    <tbody>
                        <tr>
                            <td className="stat">{Props.pokemon.stats[1].stat.name.toUpperCase()}</td>
                            <td className="value">{Props.pokemon.stats[1].base_stat}</td>
                        </tr>
                        <tr>
                            <td className="stat">{Props.pokemon.stats[2].stat.name.toUpperCase()}</td>
                            <td className="value">{Props.pokemon.stats[2].base_stat}</td>
                        </tr>
                        <tr>
                            <td className="stat">{Props.pokemon.stats[3].stat.name.toUpperCase()}</td>
                            <td className="value">{Props.pokemon.stats[3].base_stat}</td>
                        </tr>
                        <tr>
                            <td className="stat">{Props.pokemon.stats[4].stat.name.toUpperCase()}</td>
                            <td className="value">{Props.pokemon.stats[4].base_stat}</td>
                        </tr>
                        <tr>
                            <td className="stat">{Props.pokemon.stats[5].stat.name.toUpperCase()}</td>
                            <td className="value">{Props.pokemon.stats[5].base_stat}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="footer">Dex# {Props.pokemon.id}</div>
        </div>
    </div>


}

export default PokeCard;