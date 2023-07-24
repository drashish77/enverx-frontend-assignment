import { ADD_EXPENSE, DELETE_EXPENSE, SET_EXPENSES } from "../action-types/expenses";

const initialState = {
    expenseList: [],

}

export const expenseReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_EXPENSE:
            return {
                ...state,
                loading: true,
                expenseList: [...state.expenseList, action.data]
            };
        case SET_EXPENSES:
            return {
                ...state,
                loading: true,
                expenseList: [action.data]
            };
        case DELETE_EXPENSE:
            const { data } = action;
            const updatedList = state.expenseList.filter((item: any) => item.created_at !== data.created_at)
            return {
                ...state,
                loading: false,
                expenseList: updatedList
            }
        default:
            return state;
    }
}