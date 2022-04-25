import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Comment from '../../Components/Comment';
export default function Relation({ contact, baglanti }) {
    /* modal kısmı */
    const router = useRouter();
    /*dinamizm */
    const [values, setValues] = useState({
        contact1_id: "",
        contact2_id: "",
        description: "",
        created_by: "",
        updated_by: "",
        created_at: "",
        updated_at: "",
    });
    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/contactsrelationships`; //https://cors-anywhere.herokuapp.com/
        axios.post(url, { ...values }).then(setTimeout(() => { $('#myModal').modal('hide') }, 3000))
    };
    /* modal kısmı son */

    return (
        <div className="container ">
            <div className="text-center container"> <h3 className="card-title">Welcome to Details Page</h3></div>
            <div className="col-12  d-flex justify-content-center">
                <div className="row">
                    <h1 className="text-center text-success mt-5">Detaylar</h1>
                    <div className="card zoom shadow bg-body rounded m-5">
                        <ul className="list-group list-group-flush mb-5">

                            <>
                                <li className="list-group-item">
                                    <label htmlFor="floatingInput">FirstName: {contact.firstname} </label>
                                </li>
                                <li className="list-group-item">
                                    <label htmlFor="floatingInput">Surname: {contact.surname} </label>
                                </li>
                                <li className="list-group-item">
                                    <label htmlFor="floatingInput">Address: {contact.address} </label>
                                </li>
                                <li className="list-group-item">
                                    <label htmlFor="floatingInput">Phone 1: {contact.phone1} </label>
                                </li>

                                <li className="list-group-item">
                                    <label htmlFor="floatingInput">Emial1: {contact.email1} </label>
                                </li>

                            </>
                        </ul>
                    </div>
                </div>
                <div className="row ms-5 mt-4">
                    <h1 className="text-center text-success">Bağlatılar</h1>
                    <div className="card zoom shadow bg-body rounded m-5 p-5">
                        <ul className="list-group list-group-flush ">
                            {baglanti.map((item) => {
                                const { id, firstname, surname, email1 } = item;
                                return <div key={id} className="m-2">
                                    <li className="list-group-item">
                                        <label>Firstname </label>  {firstname}
                                    </li>
                                    <li className="list-group-item">
                                        <label>Surname </label> {surname}
                                    </li>
                                    <li className="list-group-item">
                                        <label>Email: </label> {email1}
                                    </li>
                                </div>
                            })
                            }
                        </ul>
                    </div>
                </div>
                {/* modal start */}
                <div>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Create Contact Relatıons</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">contact1_id</label>
                                            <input value={values.contact1_id} onChange={handleChange("contact1_id")} type="number" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">contact2_id</label>
                                            <input value={values.contact2_id} onChange={handleChange("contact2_id")} type="number" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">Description</label>
                                            <input value={values.description} onChange={handleChange("description")} type="text" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">created_by</label>
                                            <input value={values.created_by} onChange={handleChange("created_by")} type="number" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">updated_by</label>
                                            <input value={values.updated_by} onChange={handleChange("updated_by")} type="number" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">created_at</label>
                                            <input value={values.created_at} onChange={handleChange("created_at")} type="number" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">updated_at</label>
                                            <input value={values.updated_at} onChange={handleChange("updated_at")} type="number" className="form-control" id="recipient-name" />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handleSubmit} type="button" className="btn btn-success" data-bs-dismiss="modal">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Create</button>
                </div>
            </div>
            <div className="row m-2">
                <div className="card  shadow bg-body rounded ">
                    <ul className="list-group list-group-flush">
                        <Comment />
                    </ul>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {

    //bılgı urlı ${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/contacts
    let id = context.query.id;
    //bağlantılı kişiler
    const detay = await axios(`${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/contacts/${id}`);
    //baglanti
    const data = await axios(`${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/contactsrelationships/get_relation?contact_id=${id}`);
    return {
        props: {
            contact: detay.data,//true
            baglanti: data.data
        }
    }
}