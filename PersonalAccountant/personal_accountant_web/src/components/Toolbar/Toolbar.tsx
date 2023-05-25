
import './Toolbax.css'
import { Flex, Box, Spacer, FormControl, FormLabel, useBoolean } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'
import { useState } from 'react';

function changeFullMode() {

    const set = (document.getElementById('fullModeActive')?.checked);

    localStorage.setItem('fullview', set)

}

function Toolbar() {
    const [fullMode, setfullMode] = useState()

    const checked = fullMode === 'true'

    return (
        <div className={"Toolbar"}>
            <Flex width={'100%'}>
                <Box p='2'>
                    <b>Personal Accountant</b>
                </Box>
                <Spacer />
                <Box p='2'>
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel htmlFor='fullModeActive' mb='0'>
                            FullView
                        </FormLabel>
                        <Switch id='fullModeActive' onChange={changeFullMode} value={fullMode}/>
                    </FormControl>
                </Box>
            </Flex>
        </div>
    )
}

export default Toolbar
