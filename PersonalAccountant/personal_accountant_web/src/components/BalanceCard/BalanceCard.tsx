import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Button, InputGroup } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react'
import './BalanceCard.css'
import { API_URL } from '../../environment'
import { Balance, ResumeBalance } from '../../models/Balance'

async function _getBalances(): Promise<Balance> {
  const response = await fetch(`${API_URL}/balances`)

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

function getTable(items: ResumeBalance[] | undefined) {
  if (!items) return (<></>);

  let tableName = "";
  if (items[0].isInitial) tableName = "Inicial";
  else if (items[0].isIncome) tableName = "Ingresos";
  else if (items[0].isExpenses) tableName = "Gastos";
  else if (items[0].isTotal) tableName = "Totales";

  return (<Table variant='simple'>
    <Thead>
      <Tr>
        <Th colSpan={2} borderBottom={'1px'} className={"ThTableName"}>{tableName}</Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
      {items.map(bi => (
        <Tr>
          <Td paddingY={0.5}></Td>
          <Td className={"Td"} paddingY={0.5}>{bi.origin.description}</Td>
          <Td className={"Td"} paddingY={0.5} isNumeric> $ {bi.balance}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>)
}

function BalanceCard() {
  const [balances, setBalances] = useState<Balance>();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function getBalances() {
      const response = await _getBalances();
      setBalances(response);
      console.log(response);

      setLoadingData(false);
    }
    if (loadingData) {
      // if the result is not ready so you make the axios call
      getBalances();
    }
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className={'title'}> Estado</div>
        </CardHeader>
        <CardBody>
          <TableContainer>
            {getTable(balances?.initial)}
            {getTable(balances?.income)}
            {getTable(balances?.expenses)}
            {getTable(balances?.total)}
            {/* <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th colSpan={2}>Ingresos</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {balances?.income.map(bi => (
                  <Tr>
                    <Td></Td>
                    <Td>{bi.origin.description}</Td>
                    <Td isNumeric>{bi.balance}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th colSpan={2}>Gastos</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {balances?.expenses.map(bi => (
                  <Tr>
                    <Td></Td>
                    <Td>{bi.origin.description}</Td>
                    <Td isNumeric>{bi.balance}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th colSpan={2}>Totales</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {balances?.total.map(bi => (
                  <Tr>
                    <Td></Td>
                    <Td>{bi.origin.description}</Td>
                    <Td isNumeric>{bi.balance}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table> */}
          </TableContainer>
        </CardBody>
      </Card>
    </div>
  )
}

export default BalanceCard
