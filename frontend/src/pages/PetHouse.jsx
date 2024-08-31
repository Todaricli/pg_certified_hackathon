import React, { useEffect, useState } from 'react'
import cryingPengu from "../../public/CryingPengu.gif"
import energeticPengu from "../../public/EnergeticPengu.gif"
import happyPengu from "../../public/HappyPengu.gif"
import malnorishedPengu from "../../public/MalnorishedPengu.gif"
import musclePengu from "../../public/MusclePengu.gif"
import stressedPengu from "../../public/StressedPengu.gif"
import tiredPengu from "../../public/TiredPengu.gif"
import loadingSnail from "../../public/snailLoading.gif"



const PetHouse = ({ petStat }) => {
    const [petPicArray, setPetPicArray] = useState([])
    const [petPicIndex, setPetPicIndex] = useState(0)
    const [displayedPic, setDisplayedPic] =useState(loadingSnail)
    const [workoutPic, setWorkoutPic] = useState(loadingSnail);
    const [workoutActive, setWorkoutActive] = useState(false)

    useEffect(()=>{
        if(petStat.heatlh <60){
            setPetPicArray(prev => [...prev, stressedPengu])
        } else if (petStat.health > 70){
            setPetPicArray(prev => [...prev, energeticPengu])
        }

        if(petStat.dexterity > 100){
            setPetPicArray(prev => [...prev, cryingPengu])
        }else if (petStat.dexterity < 100){
            // TODO -- CREATE LOW DEXTERITY PIC
        }

        if(petStat.strength > 60){
            setWorkoutPic( musclePengu)
        }else{
            setWorkoutPic(malnorishedPengu)
        }

        if(petStat.stamina > 100){
            //TODO -- CREATE EXCITED PENGU
        } else if(petStat.stamina < 100){
            setPetPicArray(prev => [...prev, tiredPengu])
        }

        if(petStat.happiness > 70) {
            setPetPicArray(prev => [...prev, happyPengu])
        } else {
            setPetPicArray(prev => [...prev, cryingPengu])
        }

    },[])

    useEffect(()=>{
        const intervalId = setInterval(() => {
            setDisplayedPic(petPicArray[petPicIndex])
            setPetPicIndex(prev => (prev + 1) % petPicArray.length)

        }, 500)
        
        return () => clearInterval(intervalId);
    })

    return (
        <div >
            <img src={workoutActive? workoutPic: displayedPic}
                className='w-[500px] h-[500px] flex justify-center' ></img>
            <button onClick={()=>{
                setWorkoutActive(prev => !prev)
            }}>sdsdfseds</button>
        </div>
    )
}

export default PetHouse
