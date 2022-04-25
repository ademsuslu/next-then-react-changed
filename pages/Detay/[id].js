import React from 'react'
import axios from "axios"
export default function Detay({ contact }) {
    return (
        <div className="container">
            <div className="col">
                <div className="row">
                    <ul className="list-group list-group-flush mb-5">
                        <li className="list-group-item">
                            <label htmlFor="floatingInput">FirstName: {contact.firstname} </label>
                        </li>
                        <li className="list-group-item">
                            <label htmlFor="floatingInput">Surname:{contact.surname} </label>
                        </li>
                        <li className="list-group-item">
                            <label htmlFor="floatingInput">Emial1: {contact.email} </label>
                        </li>
                        <li className="list-group-item">
                            <label htmlFor="floatingInput">Access Token: {contact.access_token} </label>
                        </li>
                        <li className="list-group-item">
                            <label htmlFor="floatingInput">Pwd: {contact.pwd} </label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {
    let id = context.query.id;
    const detay = await axios(`${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/users/${id}`)
    const personList = detay.data;
    return {
        props: {
            contact: personList
        },
    }
}