import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loginUser, setLoginUser] = useContext(UserContext);
    const [booking, setBooking] = useState([])
    useEffect(() => {
        //for single person details send
        fetch('http://localhost:4000/bookings?email='+ loginUser.email)
            .then(res => res.json())
            .then(data => {
                setBooking(data);

            })

        console.log(booking);
    }, [])
    return (
        <div>
            <h4>You have booked {booking.length} rooms</h4>
            <table class="table table-borderless w-50">
                <thead>
                    <tr>
                        <th scope="col">serial</th>
                        <th scope="col">Name:</th>
                        <th scope="col">Email</th>
                        <th scope="col">Checkin</th>
                        <th scope="col">Checkout</th>
                    </tr>
                </thead>

                {
                    booking.map((booking, index) =>
                        <tbody>
                            <tr>
                                
                                <td>{index+1}</td>
                                <td>{booking.name}</td>
                                <td>{booking.email}</td>
                                <td>{(new Date(booking.checkIn).toDateString("dd/MM/yyyy"))}</td>
                                <td>{(new Date(booking.checkOut).toDateString('dd/MM/yyy'))}</td>

                            </tr>


                        </tbody>
                    )
                    
                    
                  }

            </table>


        </div>
    );
};

export default Bookings;