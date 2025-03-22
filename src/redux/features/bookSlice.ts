import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";

type BookState = {
    bookItems : BookingItem[]
}

const initialState: BookState = { bookItems : [] }

export const bookSlice = createSlice({
    name : 'book',
    initialState,
    reducers : {
        addBooking : (state,action : PayloadAction<BookingItem>)=>{
            let check = true;
            for (let i = 0;i < state.bookItems.length;i++) {
                if (state.bookItems[i].venue == action.payload.venue 
                    && state.bookItems[i].bookDate == action.payload.bookDate) {
                        state.bookItems[i] = action.payload
                        check = false;
                    } 
            }
            if (check)
                state.bookItems.push(action.payload);
            console.log("Add Item Complete");
            console.log(state.bookItems.map(item => [item.nameLastname,item.tel,item.venue,item.bookDate]));
            console.log(state.bookItems.length);
        },
        removeBooking : (state,action : PayloadAction<BookingItem>)=>{
            state.bookItems = state.bookItems.filter( (book) => {
            return ((book.nameLastname !== action.payload.nameLastname) ||
                (book.bookDate !== action.payload.bookDate) ||
                (book.tel !== action.payload.tel) ||
                (book.venue !== action.payload.venue)
            );
            });
        }
    }
})

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;