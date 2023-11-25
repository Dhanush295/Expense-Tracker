import {atom} from 'recoil';

export const allExpenseState = atom ({
    key: "allExpenseState",
    default: {
        isLoading : true,
        expenses : [] ,
    }

})