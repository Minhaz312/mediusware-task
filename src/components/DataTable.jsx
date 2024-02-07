import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function DataTable({ columns, dataType, data }) {
    const [showModal, setShowModal] = useState(false);
    const [details, setDetails] = useState(null);

    const handleShowDetails = (data) => {
        if (showModal) {
            setShowModal(false);
            setDetails(null);
        } else {
            setDetails(data);
            setShowModal(true);
        }
    };

    return (
        <>
            {details !== null && (
                <Modal show={showModal} centered onHide={handleShowDetails}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal C</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="w-full p-3 d-flex justify-items-centermy-5 bg-light border-bottom">
                            <div className="w-50">Phone: </div>
                            <div>{details.phone}</div>
                        </div>
                        <div className="w-full p-3 d-flex justify-items-centerbg-light border-bottom">
                            <div className="w-50">Country Name: </div>
                            <div>{details.country.name}</div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-between">
                        <div className="d-flex gap-2">
                            <Button
                                variant="secondary"
                                onClick={handleShowDetails}
                            >
                                Close
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            )}
            <div>
                <form className="mb-3 mt-2 mx-3">
                    <div className="input-group">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search..."
                        />
                        <button className="btn btn-dark">Search</button>
                    </div>
                </form>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {columns.map((col, i) => (
                                <th scope="col" key={i}>
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr
                                key={i}
                                onClick={handleShowDetails.bind(this, item)}
                            >
                                <td>{item.id}</td>
                                <td>{item.phone}</td>
                                <td>{item.country.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
