

import React, { useState, useEffect } from "react";
import axios from "axios"
import PaginationControls from "./pagination";
import TableRequest from "./table-requests center Inv";
import jwtDecode from "jwt-decode";
export default function Homepage() {
    const [totalPagesRequests, setTotalPagesRequests] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [countRequests, setCountRequests] = useState(0);
    const [countacceptedRequests, setCountAcceptedRequests] = useState(0);
    const [requests, setRequests] = useState([]);

    const [error, setError] = useState(null);

    const [userId, setUserId] = React.useState(0);

    function sortArrayByDateDescending(arr) {
        return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
    }



    useEffect(() => {
    
        axios.get(`http://localhost:3004/backend/request/count`)
            .then((res) => { setCountRequests(res.data); setTotalPagesRequests(Math.ceil(res.data[0].count / limit)); setCountRequests(Math.ceil(res.data[0].count)); console.log(Math.ceil(res.data[0].count / limit)) })
            .catch((err) => setError(err));
        axios.get(`http://localhost:3004/backend/request/countaccepted`)
            .then((res) => { setCountAcceptedRequests(Math.ceil(res.data[0].count)) })
            .catch((err) => setError(err));






    }, []);

    useEffect(() => {
        
        axios
            .get(
                `http://localhost:3004/backend/request/display/?page=${currentPage}&limit=${limit}`
              )
            .then((res) => { setRequests(sortArrayByDateDescending(res.data)); console.log(res.data) })
            .catch((err) => setError(err));
    }, [currentPage, limit]);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

    return (

        <section className="home mt-3">
            <div class="tab-pane-with-nested-tab fade show active" id="tab1-content" role="tabpanel" aria-labelledby="nav-tab1">

                <ul role="tablist" aria-owns="nav-linkA nav-linkB nav-linkC nav-linkD" class="nav nav-tabs nav-tabs-light mt-0">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="nav-linkA" href="#linkA" data-bs-toggle="tab" data-bs-target="#linkA" role="tab" aria-current="page">Studies</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="nav-linkB" href="#linkB" data-bs-toggle="tab" data-bs-target="#linkB" role="tab">Invitations</a>
                    </li>
                </ul>

                <div class="tab-content border-0" id="nav-tabs-light-content">
                    <div class="tab-pane fade show active" id="linkA" role="tabpanel" aria-labelledby="nav-linkA">
                        <div className="container ">
                            <div className="row text-center" >
                                <div className=" m-auto title">

                                </div>

                                <TableRequest requests={requests}  />


                                <div>
                                    <PaginationControls
                                        currentPage={currentPage}
                                        totalPages={totalPagesRequests}
                                        handlePageChange={handlePageChange}
                                        handleLimitChange={handleLimitChange}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="tab-pane text-center " id="linkB" role="tabpanel" aria-labelledby="nav-linkB">
                        <div className="title">
                            <h1>studies on the list!</h1>
                            <button type="button" class="btn btn-primary" >Create new one</button>
                        </div>
                        <div className="row ">




                        </div>
                    </div>

                </div>
            </div>

        </section>

    )
}
