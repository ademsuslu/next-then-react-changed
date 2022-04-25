import React, { useContext } from 'react'
import Link from "next/link"
import AppContext from '../Context'
import { useRouter } from 'next/router'
export default function Navbar() {
    const router = useRouter();
    // çıkış işlemi
    const { user, setUser } = useContext(AppContext)
    const Quit = () => {
        localStorage.removeItem('user')
        setUser({})
        router.push("/Login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link href="/">
                        <a className="navbar-brand">Web
                            <span className='text-danger'>
                                <strong>OO</strong>
                            </span>
                            st</a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                user?.email ? <>
                                    <li className="nav-item">
                                        <Link href="/">
                                            <a className="nav-link " aria-current="page">Home</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/Contacts">
                                            <a className="nav-link " aria-current="page">Contacts</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/Users">
                                            <a className="nav-link" aria-current="page">Users</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <div onClick={Quit} className="transparent nav-link text-danger">Quit</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link">
                                            <p className="text-success">Hello, {user.firstname}</p>
                                        </div>
                                    </li>

                                </>
                                    :
                                    <li className="nav-item">
                                        <Link href="/Login">
                                            <a className="nav-link">Login</a>
                                        </Link>
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
