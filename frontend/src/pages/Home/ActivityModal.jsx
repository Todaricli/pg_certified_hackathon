import React, { useState } from 'react';
import { Progress, Text, Modal, Button, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { BsLightningCharge } from "react-icons/bs";
import PetHouse from '../PetHouse';
import { mantine_rem as rem } from 'foxact/rem';

const ActivityModal = ({ opened, close, dropdownOpened, setDropdownOpened, setActivityActive, setActivityState }) => {

  const [activitySelection, setActivitySelection] = useState();

  return (
    <div>
      <Modal
        opened={opened} onClose={close} withCloseButton={false} size={"auto"} overlayProps={{ backgroundOpactiy: 0.55, blur: 3, }} centered yOffset={0} xOffset={0}
        styles={{
          content: {
            width: "100%",
            height: "400px",
            borderRadius: "20px",
            backgroundColor: "#ffd53d",
            maxWidth: "28rem",
            padding: "1rem",
          },
        }}
      >
        <div className="text-lg font-bold text-center mb-2">Please choose an exercise</div>
        <Select
          placeholder="Select an exercise"
          styles={{
            dropdown: {
              borderRadius: "10px",
              padding: "10px",
              '&:hover': {
                backgroundColor: '#0000a3',
                '&[data-selected]': {
                  backgroundColor: '#0000a3',
                }
              },
            },
            input: {
              height: "45px",
              borderWidth: "2px",
              borderColor: "#b6b9bf",
              color: "000000"
            }
          }}
          leftSection={<BsLightningCharge style={{ width: rem(16), height: rem(16), }} />} aria-label="Select an exercise" radius="md" data={["Walking", "Running", "Weight Training", "Swimming", "Badminton"]} rightSection={dropdownOpened ? <IconChevronUp style={{ width: rem(16), height: rem(16) }} /> : <IconChevronDown style={{ width: rem(16), height: rem(16) }} />}
          onChange={(e)=>{
            setActivitySelection(e)
            console.log(e)
          }}
          onDropdownOpen={() => setDropdownOpened(true)}
          onDropdownClose={() => setDropdownOpened(false)}
        />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "219px" }}>
          <Button onClick={() =>{
            close()
            console.log(activitySelection)
            setActivityActive(activitySelection)
            setActivityState(true)
          }} variant="gradient" gradient={{ from: "#0000a3", to: "#0000a3", deg: 90 }} radius="lg" >Start</Button></div>
      </Modal>
    </div>
  )
}

export default ActivityModal;
