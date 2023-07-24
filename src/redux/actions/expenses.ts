import types, { ADD_EXPENSE, DELETE_EXPENSE, SET_EXPENSES } from '../action-types/expenses'

export const addExpense = (data: any) => {
    return {
        type: ADD_EXPENSE,
        data
    }
}
export const setExpense = (data: any) => {
    return {
        type: SET_EXPENSES,
        data
    }
}

export const deleteExpense = (data: any) => {
    return {
        type: DELETE_EXPENSE,
        data
    }
}
