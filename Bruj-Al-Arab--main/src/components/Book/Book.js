import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import 'date-fns';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,

    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const [loginUser, setLoginUser] = useContext(UserContext);
    const { bedType } = useParams();

    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()


    })

    const handleCheckIn = (date) => {
        const newDates = { ...selectedDate };
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };
    const handleCheckOut = (date) => {
        const newDates = { ...selectedDate };
        newDates.checkOut = date;
        setSelectedDate(newDates);
    };


    const handleClick = () => {
        const newdata = {...loginUser,...selectedDate}
      
         fetch('http://localhost:4000/addbooking',{
             method: 'POST',  
             headers: { 'Content-Type': 'application/json'},
             body: JSON.stringify(newdata)
           
         })
         .then(res=>res.json())
         .then(data=>{
            console.log(data)
         })
         

    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome {loginUser.name}, Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>


            <MuiPickersUtilsProvider className="mx-auto" utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="CheckIN date"
                        value={selectedDate.checkIn}
                        onChange={handleCheckIn}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />  
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="CheckOut Date"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOut}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                </Grid>
            </MuiPickersUtilsProvider>
            <Button onClick={handleClick} variant="contained" color="primary">
                Booking Sit
            </Button>


            <p>----------------------</p>
                        <Bookings></Bookings>
        </div>
    );
};

export default Book;