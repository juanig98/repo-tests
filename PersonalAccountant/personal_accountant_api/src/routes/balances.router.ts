import * as express from 'express'

export function getBalancesRoutes() {
    const router = express.Router()
    router.get('/', getAll)
    return router
}

async function getAll(req, res) {

    const initial = [
        { origin: { _id: 1, description: 'Efectivo', key: 'E' }, balance: 7869.04, isInitial: true },
        { origin: { _id: 2, description: 'Santander Río', key: 'SR' }, balance: 20488.80, isInitial: true },
        { origin: { _id: 3, description: 'Mercado Pago', key: 'MP' }, balance: 139289.66, isInitial: true },
        { origin: { _id: 4, description: 'BuenBit (ETH)', key: 'BBE' }, balance: 126000.00, isInitial: true },
        { origin: { _id: 5, description: 'BuenBit (DAI)', key: 'BBD' }, balance: 232212.36, isInitial: true },
    ];
    const expenses = [
        { origin: { _id: 1, description: 'Efectivo', key: 'E' }, balance: 60060.00, isExpenses: true },
        { origin: { _id: 2, description: 'Santander Río', key: 'SR' }, balance: 97391.5, isExpenses: true },
        { origin: { _id: 3, description: 'Mercado Pago', key: 'MP' }, balance: 125230.82, isExpenses: true },
        { origin: { _id: 4, description: 'BuenBit (ETH)', key: 'BBE' }, balance: 0.00, isExpenses: true },
        { origin: { _id: 5, description: 'BuenBit (DAI)', key: 'BBD' }, balance: 0.00, isExpenses: true },
    ];
    const income = [
        { origin: { _id: 1, description: 'Efectivo', key: 'E' }, balance: 141400.00, isIncome: true },
        { origin: { _id: 2, description: 'Santander Río', key: 'SR' }, balance: 108066.53, isIncome: true },
        { origin: { _id: 3, description: 'Mercado Pago', key: 'MP' }, balance: 77132.15, isIncome: true },
        { origin: { _id: 4, description: 'BuenBit (ETH)', key: 'BBE' }, balance: 0.00, isIncome: true },
        { origin: { _id: 5, description: 'BuenBit (DAI)', key: 'BBD' }, balance: 0.00, isIncome: true },
    ];
    const total = [];
    initial.map(foo => {
        const _income = income.find(bar => bar.origin._id == foo.origin._id).balance;
        const _expeses = expenses.find(bar => bar.origin._id == foo.origin._id).balance;

        const item = {
            origin: foo.origin,
            balance: Number((foo.balance + _income - _expeses).toFixed(2)),
            isTotal: true,
        }
        total.push(item);
    })

    const balances = { initial, expenses, income, total }

    res.send(balances);
}
 