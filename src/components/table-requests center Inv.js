import React, { useState } from "react";
import axios from "axios"


import { toast } from "react-hot-toast";


import {

    MdCheckCircleOutline

} from "react-icons/md";
import { BiLoader } from "react-icons/bi";

import { TbXboxX } from "react-icons/tb";
export default function TableParticipatedStudies(props) {




    function getNormalizedDate(timestamp) {
        const dateObject = new Date(timestamp);

        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // Months are 0-based, so add 1 to get the correct month.
        const day = dateObject.getDate();

        // Create a new Date object with only the year, month, and day.
        const normalizedDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);

        return normalizedDate.toDateString(); // Convert to string using .toDateString()
    }
    const [connectionId, setConnectionId] = useState("");
    const [error, setError] = useState("");


    return (
        <table id="dtBasicExample" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <caption class="visually-hidden">Boosted tables basic look</caption>
            <thead>
                <tr>
                    <th scope="col" style={{ color: "black" }}>#</th>
                    <th scope="col" style={{ color: "black" }}>Study ID</th>
                    <th scope="col" style={{ color: "black" }}>Reference</th>
                    <th scope="col" style={{ color: "black" }}>State</th>
                    <th scope="col" style={{ color: "black" }}>Date</th>
                    <th scope="col" style={{ color: "black" }}>Action</th>


                </tr>
            </thead>
            <tbody>
                {props.requests.map((request) => (
                    <tr>
                        <td><span style={{ color: "black" }}>{request.id}</span></td>
                        <td><span style={{ color: "black" }}>{request.study_id}</span></td>
                        <td><span style={{ color: "black" }}>{request.ref}</span></td>
                        <td>            {request.state === 'pending' ? (
                            <h3><BiLoader style={{ color: "black" }} /> </h3>
                        ) : request.state === 'sent' ? (
                            <h3><MdCheckCircleOutline title="accepted" style={{ color: "green" }} /> </h3>
                        ) : (
                            <h3><TbXboxX style={{ color: "black" }} /> </h3>
                        )}</td>
                        <td><span style={{ color: "black" }}>{getNormalizedDate(request.date)}</span></td>
                        {<td>            {request.state === 'sent' ? (
                            <button type="submit"
                                class="btn btn-primary "
                                style={{ width: '75%' }}
                                >Acces Document</button>) : <></>}</td>}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
