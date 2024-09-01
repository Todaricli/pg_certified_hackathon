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
import { Button, useMantineTheme } from '@mantine/core'



const PetHouse = ({ petStat, activityActive, setActivityState, activityState }) => {
    const [petPicArray, setPetPicArray] = useState([])
    const [petPicIndex, setPetPicIndex] = useState(0)
    const [displayedPic, setDisplayedPic] = useState(loadingSnail)
    const [workoutPic, setWorkoutPic] = useState(loadingSnail);
    const [workoutActive, setWorkoutActive] = useState(false)
    const theme = useMantineTheme()

    useEffect(() => {
        if (petStat.heatlh < 60) {
            setPetPicArray(prev => [...prev, { "pic": energeticPengu, "stat": "Health", "status": "High" }])
        } else if (petStat.health > 70) {
            setPetPicArray(prev => [...prev, { "pic": stressedPengu, "stat": "Health", "status": "Low" }])
        }

        if (petStat.dexterity > 100) {
            setPetPicArray(prev => [...prev, { "pic": cryingPengu, "stat": "Dexterity", "status": "High" }])
        } else if (petStat.dexterity < 100) {
            setPetPicArray(prev => [...prev, { "pic": layingDown, "stat": "Dexterity ", "status": "Low" }])
        }

        if (petStat.strength > 60) {
            setWorkoutPic(musclePengu)
        } else {
            setWorkoutPic(malnorishedPengu)
        }

        if (petStat.stamina > 100) {
            setPetPicArray(prev => [...prev, { "pic": excitedPengu, "stat": "Stamina", "status": "High" }])
        } else if (petStat.stamina < 100) {
            setPetPicArray(prev => [...prev, { "pic": tiredPengu, "stat": "Stamina", "status": "Low" }])
        }

        if (petStat.happiness > 70) {
            setPetPicArray(prev => [...prev, { "pic": happyPengu, "stat": "Happiness", "status": "High :)" }])
        } else {
            setPetPicArray(prev => [...prev, { "pic": cryingPengu, "stat": "Happiness", "status": "Sad :(" }])
        }

    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDisplayedPic(petPicArray[petPicIndex])
            setPetPicIndex(prev => (prev + 1) % petPicArray.length)

        }, 5000)

        return () => clearInterval(intervalId);
    })

    const getActivityPictures = () => {
        if (activityActive == "Walking") {
            return walkingPengu;
        } else if (activityActive == "Running") {
            return runningPengu
        } else if (activityActive == "Weight Training") {
            return workoutPic
        } else {
            return displayedPic
        }
    }

    return (
        <div>

            <img src={activityState ? getActivityPictures() : displayedPic.pic}
                className='w-[500px] h-[500px] flex justify-center' ></img>
                {!activityState &&<div className='border-2 mx-12 bg-sky-500' style={{backgroundColor: theme.colors.customNavy[0], color: "#ffffff", borderRadius: '10px'}} p={10}>
                <h1 className='w-full text-center text-4xl'>{displayedPic.stat}</h1>
                <h1 className='w-full text-center z-10 text-xl '>{displayedPic.status}</h1>
            </div>}
            
        </div>
    )
}

export default PetHouse
