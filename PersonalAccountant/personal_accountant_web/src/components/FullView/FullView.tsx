import { Box, Flex } from '@chakra-ui/react';
import BalanceCard from './../BalanceCard/BalanceCard';
import ExpensesCard from './../ExpensesCard/ExpensesCard';
import './FullView.css'

function FullView() {

    return (
        <div className="FullView">
            <Flex gap='2'>
                <Box>
                    <BalanceCard />
                </Box>
                <Box>
                    <ExpensesCard />
                </Box>
            </Flex>
        </div>
    )
}

export default FullView
