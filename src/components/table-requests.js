import React, { useState, useEffect } from "react";
import axios from "axios"

import {

    MdCheckCircleOutline

} from "react-icons/md";
import { toast } from "react-hot-toast";

import { TiTick } from "react-icons/ti";

import { GiCancel } from "react-icons/gi";

import { TbXboxX } from "react-icons/tb";

export default function TableParticipatedStudies(props) {
    const [connectionId, setConnectionId] = useState("");
    const [error, setError] = useState(null);
    const [credential_definition_ids, SetCredential_definition_ids] = useState([])




    function getNormalizedDate(timestamp) {
        const dateObject = new Date(timestamp);

        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // Months are 0-based, so add 1 to get the correct month.
        const day = dateObject.getDate();

        // Create a new Date object with only the year, month, and day.
        const normalizedDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);

        return normalizedDate.toDateString(); // Convert to string using .toDateString()
    }

    const accept = async (study_id, ref, id, connection_id, e) => {

        const IssueCred =
        {
            "presentation_request": {
                "indy": {
                    "name": "Proof of Consent",
                    "version": "1.0",
                    "requested_attributes": {
                        "0_consent_uuid": {
                            "name": "consent",
                            "restrictions": [
                                {
                                    "schema_name": "consent schema"
                                }
                            ]
                        },
                        "0_patient_ref_uuid": {
                            "name": "patient_ref",
                            "restrictions": [
                                {
                                    "schema_name": "consent schema"
                                }
                            ]
                        },
                        "0_medical_ref_uuid": {
                            "name": "medical_ref",
                            "restrictions": [
                                {
                                    "schema_name": "consent schema"
                                }
                            ]
                        }
                    },
                    "requested_predicates": {
                        "0_consent_GE_uuid": {
                            "name": "consent",
                            "p_type": ">",
                            "p_value": 0,
                            "restrictions": [
                                {
                                    "schema_name": "consent schema"
                                }
                            ]
                        }
                    }
                }
            },
            "trace": false,
            "connection_id": `${connection_id}`
        }
        // Set the headers with the token

        e.preventDefault();
        try {

            const respAgent = await axios.post(`http://localhost:8031/present-proof-2.0/send-request`, IssueCred);
            if (respAgent) {
                await axios.patch(`http://localhost:3004/backend/request/updateRequestState/${id}/${ref}/${study_id}`, {
                    state: "sent"
                });
            }
          

            // Redirect after a short delay (e.g., 1 second)
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        } catch (error) {
            if (error.response) {
                
                console.log(error)
            }
        }
    };

    const refuse = async (study_id, ref, id, e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3004/backend/request/updateRequestState/${id}/${ref}/${study_id}`, {
                state: "refuse"
            });
            toast.success("Request refused successfully");

            // Redirect after a short delay (e.g., 1 second)
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);




        } catch (error) {
            if (error.response) {
                console.log(error)
            }
        }
    };

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

                </tr>
            </thead>
            <tbody>
                {props.requests.map((request) => (
                    <tr>
                        <td><span style={{ color: "black" }}>{request.id}</span></td>
                        <td><span style={{ color: "black" }}>{request.study_id}</span></td>
                        <td><span style={{ color: "black" }}>{request.ref}</span></td>
                        <td>            {request.state === 'pending' ? (
                            <div className="d-flex text-center ml-0 pl-0 icons">
                                <butoon type='button' class="btn btn-primary" onClick={(e) => accept(request.study_id, request.ref, request.id, request.connection_id, e)}>Verify</butoon>
                            </div>
                        ) : request.state === 'sent' ? (
                            <button type="button" class="btn btn-danger" onClick={(e) => refuse(request.study_id, request.ref, request.id, e)}>Remove acces</button>
                        ) : (
                            <h3><TbXboxX style={{ color: "black" }} /> </h3>
                        )}</td>
                        <td><span style={{ color: "black" }}>{getNormalizedDate(request.date)}</span></td>

                    </tr>
                ))}
            </tbody>
        </table>
    )
}
