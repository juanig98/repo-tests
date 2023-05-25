import { Card, CardHeader, CardBody, CardFooter, Button, Flex, Grid, GridItem } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react'
import './ExpensesCard.css'
import { API_URL } from '../../environment'
import { Expense, ResumeExpeses } from '../../models/Expense'
import { useEffect, useState } from 'react'
import moment from 'moment';



async function _getExpenses(): Promise<ResumeExpeses> {
  const response = await fetch(`${API_URL}/expenses`)

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

function cardTable(items: Expense[] | undefined, tableName = 'Gastos') {
  if (!items) return (<></>);

  return (
    <Card>
      <CardHeader>
        <div className={'title'}> {tableName}</div>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Fecha</Th>
                <Th>Descripción</Th>
                <Th>Origen</Th>
                <Th isNumeric>Importe</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map(exp => (
                <Tr key={exp._id} padding="0.5">
                  <Td paddingY="0.5" key={"da" + exp._id}>{moment(exp.date).format("DD-MMM")}</Td>
                  <Td paddingY="0.5" key={"de" + exp._id}>{exp.description}</Td>
                  <Td paddingY="0.5" className={'text-center'} key={"o" + exp._id}>{exp.originKey}</Td>
                  <Td paddingY="0.5" isNumeric key={"am" + exp._id}>$ {exp.amount}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  )
}


function ExpensesCard() {
  const [expenses, setExpenses] = useState<ResumeExpeses>();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await _getExpenses();
      setExpenses(expenses);
      setLoadingData(false);
    }
    if (loadingData) {
      // if the result is not ready so you make the axios call
      getExpenses();
    }
  }, []);

  return (
    <div className='ExpensesCard'>
      <Grid templateRows='repeat(4, 1fr)' templateColumns='repeat(2, 1fr)' gap={2}>
        <GridItem rowSpan={4}>{cardTable(expenses?.daily, 'Gastos diarios')}</GridItem>
        <GridItem >{cardTable(expenses?.fixed, 'Gastos fijos')}</GridItem>
        <GridItem >{cardTable(expenses?.extraordinary, 'Gastos Extraordinarios')}</GridItem>
      </Grid>
    </div>
  )
}

export default ExpensesCard
