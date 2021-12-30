import { wendy,
    vision,
    timmy,
    storm,
    silver,
    phoenix,
    lora,
    logan,
    linlin,
    kirin,
    davis,
    daniel,
    chenny,
    captainAmerica,
    captain,
    misa,
    john,
    lili,
    lisa,
    nat,
    violet,
    aither } from "../constant/character";
export default function getCharacter(type){
    let character = null;
    switch(type){
        case captain.name:
            character = captain
            break
        case wendy.name:
            character = wendy
            break
        case violet.name:
            character = violet
            break
        case aither.name:
            character = aither
            break
        case john.name:
            character = john
            break
        case lili.name:
            character = lili
            break
        case lisa.name:
            character = lisa
            break
        case lora.name:
            character = lora
            break
        case phoenix.name:
            character = phoenix
            break
        case silver.name:
            character = silver
            break
        case storm.name:
            character = storm
            break
        case timmy.name:
            character = timmy
            break
        case vision.name:
            character = vision
            break
        case nat.name:
            character = nat
            break
        case captainAmerica.name:
            character = captainAmerica
            break
        case chenny.name:
            character = chenny
            break
        case daniel.name:
            character = daniel
            break
        case davis.name:
            character = davis
            break
        case kirin.name:
            character = kirin
            break
        case linlin.name:
            character = linlin
            break
        case logan.name:
            character = logan
            break
        default:
            character = misa
    }

    return character
}