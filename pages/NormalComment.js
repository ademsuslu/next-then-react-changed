import Link from 'next/link';
import { Router, useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from "../Context";

export default function NormalComment() {
    const router = useRouter()
    const { user, setUser } = useContext(AppContext)
    const [list, setList] = useState([{ is_actif: "aktif", task_status: "boş", comment: "FrontEnd Developer" }])
    const [values, setValues] = useState({
        is_actif: '',
        task_status: '',
        comment: ""
    })
    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value })
    }
    const handleAdd = (e) => {
        e.preventDefault()
        setList([...list, { is_actif: values.is_actif, task_status: values.task_status, comment: values.comment }])
        setValues({ is_actif: "", task_status: "", comment: "" })
    }
    if (Object.keys(user).length === 0) return <>
        <h1 className="text-center m-2">Bu sayfayı görmek için giriş yapın</h1>
        <Link href='/Login' passHref><button className='btn btn-success d-flex mx-auto my-4'>Giriş yap</button></Link>
    </>
    return (
        <div> <div className='container'>
            <div className='col'>
                <div className='row'>
                    <form onSubmit={handleAdd} className='row g-3 rounded bg-warning'>
                        <div className='container d-flex'>
                            <div className='container'>

                                <div className='col-auto mt-1'>
                                    <label
                                        htmlFor='is_actif'
                                        className=' text-light form-label'
                                    >
                                        Is actif
                                    </label>
                                    <input
                                        value={values.is_actif}
                                        onChange={handleChange('is_actif')}
                                        type='text'
                                        className='form-control'
                                        placeholder='is_actif'
                                    />
                                </div>
                                <div className='col-auto mt-1'>
                                    <label
                                        htmlFor='task_status'
                                        className=' text-light form-label'
                                    >
                                        Task status
                                    </label>
                                    <input
                                        value={values.task_status}
                                        onChange={handleChange('task_status')}
                                        type='text'
                                        className='form-control'
                                        placeholder='task_status'
                                    />
                                </div>
                                <div className='col-auto mt-1'>
                                    <label htmlFor='comment' className='text-light form-label'>
                                        Comment
                                    </label>
                                    <textarea value={values.comment}
                                        onChange={handleChange('comment')} className="form-control" ></textarea>

                                </div>
                            </div>
                        </div>
                        <div className='col-auto mt-1'>
                            <button
                                onClick={handleAdd}
                                type='submit'
                                className='btn btn-primary mb-3 ms-1'
                            >
                                Comment Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container bg-danger p-3 d-flex text-center mb-4 mt-5">
                <div className="col">
                    <div className="row">
                        <ul className="list-group text-center align-items-center">
                            {
                                list && list.map((item) => {
                                    return <div key={item.id}>

                                        <li className="list-group-item m-1 d-flex" >
                                            <p className="ms-5">{item.is_actif}</p>
                                            <p className="ms-5">{item.task_status}</p>
                                            <p className="ms-5">{item.comment}</p>
                                        </li>
                                    </div>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
