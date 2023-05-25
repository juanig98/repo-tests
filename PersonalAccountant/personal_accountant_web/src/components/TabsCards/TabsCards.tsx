import BalanceCard from './../BalanceCard/BalanceCard'
import ExpensesCard from './../ExpensesCard/ExpensesCard'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import './TabsCards.css'

function TabsCards() {

    return (
        <div className="TabsCards">
            <Tabs align='end' variant='enclosed'>
                <TabList>
                    <Tab>Balance</Tab>
                    <Tab>Gastos</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <BalanceCard />
                    </TabPanel>
                    <TabPanel>
                        <ExpensesCard />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default TabsCards
