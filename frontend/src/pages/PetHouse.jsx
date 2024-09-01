import React, { useEffect, useState } from 'react'
import cryingPengu from "../../public/CryingPengu.gif"
import energeticPengu from "../../public/EnergeticPengu.gif"
import happyPengu from "../../public/HappyPengu.gif"
import malnorishedPengu from "../../public/MalnorishedPengu.gif"
import musclePengu from "../../public/MusclePengu.gif"
import stressedPengu from "../../public/StressedPengu.gif"
import tiredPengu from "../../public/TiredPengu.gif"
import loadingSnail from "../../public/snailLoading.gif"
import excitedPengu from "../../public/excitedPengu.gif"
import layingDown from "../../public/layingdowndyingPengu.gif"
import runningPengu from "../../public/runningPengu.gif"
import walkingPengu from "../../public/walkingPengu.gif"
import { Button } from '@mantine/core'



const PetHouse = ({ petStat, activityActive, setActivityState, activityState }) => {
    const [petPicArray, setPetPicArray] = useState([])
    const [petPicIndex, setPetPicIndex] = useState(0)
    const [displayedPic, setDisplayedPic] = useState(loadingSnail)
    const [workoutPic, setWorkoutPic] = useState(loadingSnail);
    const [workoutActive, setWorkoutActive] = useState(false)

    useEffect(() => {
        if (petStat.heatlh < 60) {
            setPetPicArray(prev => [...prev, stressedPengu])
        } else if (petStat.health > 70) {
            setPetPicArray(prev => [...prev, energeticPengu])
        }

        if (petStat.dexterity > 100) {
            setPetPicArray(prev => [...prev, cryingPengu])
        } else if (petStat.dexterity < 100) {
            setPetPicArray(prev => [...prev, layingDown])
        }

        if (petStat.strength > 60) {
            setWorkoutPic(musclePengu)
        } else {
            setWorkoutPic(malnorishedPengu)
        }

        if (petStat.stamina > 100) {
            setPetPicArray(prev => [...prev, excitedPengu])
        } else if (petStat.stamina < 100) {
            setPetPicArray(prev => [...prev, tiredPengu])
        }

        if (petStat.happiness > 70) {
            setPetPicArray(prev => [...prev, happyPengu])
        } else {
            setPetPicArray(prev => [...prev, cryingPengu])
        }

    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDisplayedPic(petPicArray[petPicIndex])
            setPetPicIndex(prev => (prev + 1) % petPicArray.length)

        }, 500)

        return () => clearInterval(intervalId);
    })

    const getActivityPictures = () =>{
        if(activityActive == "Walking"){
            return walkingPengu;
        } else if ( activityActive == "Running"){
            return runningPengu
        } else if( activityActive == "Weight Training"){
            return workoutPic
        } else {
            return displayedPic
        }
    }

    return (
        <div>
            <img src={activityState ? getActivityPictures() : displayedPic}
                className='w-[500px] h-[500px] flex justify-center' ></img>
        </div>
    )
}

export default PetHouse
