import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FiDelete, FiEdit } from "react-icons/fi";
import Modal from "../Components/Modal";
import AppContext from "../Context";

export default function Users({ personList }) {
  const { user, setUser } = useContext(AppContext);
  const router = useRouter();
  const handleDelete = async (id) => {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/users/${id}`
      )
      .then(() => {
        router.push("/Users");
      });
  };
  const [values, setValues] = useState({
    titles: "",
    firstname: "",
    surname: "",
    photo: "",
    privilege: "",
    pwd: "",
    birthdate: "",
    email: "",
    pseudo: "",
    remark: "",
    actif: "",
    access_token: "",
    reset_token: "",
    created_at: "",
    updated_at: "",
    created_by: "",
    updated_by: "",
  });
  const fields = [
    { value: 'titles', title: 'Titles', type: 'number' },
    { value: 'remark', title: 'Remark', type: 'text' },
    { value: 'firstname', title: 'Firstname', type: 'text' },
    { value: 'actif', title: 'Actif', type: 'number' },
    { value: 'surname', title: 'Surname', type: 'text' },
    { value: 'access_token', title: 'Access Token', type: 'number' },
    { value: 'photo', title: 'Photo', type: 'text' },
    { value: 'reset_token', title: 'Reset Token', type: 'text' },
    { value: 'privilege', title: 'Privilege', type: 'number' },
    { value: 'created_at', title: 'Created At', type: 'number' },
    { value: 'pwd', title: 'Pwd', type: 'text' },
    { value: 'updated_at', title: 'Updated At', type: 'number' },
    { value: 'birthDate', title: 'BirthDate', type: 'text' },
    { value: 'created_by', title: 'Created By', type: 'number' },
    { value: 'email', title: 'Email', type: 'text' },
    { value: 'updated_by', title: 'Updated By', type: 'number' },
    { value: 'pseudo', title: 'Pseudo', type: 'text' },
  ]
  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  /*editing */
  const handleGet = async (id) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/users/${id}`
    );
    setValues(res.data);
  };
  const handleUpdate = (id) => {
    try {
      axios.put(
        `${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/users/${id}`,
        values
      );
    } catch (error) {
      console.log(error);
    }
  };

  /* editing  end*/
  if (Object.keys(user).length === 0) return <>
    <h1 className="text-center m-2">Bu sayfayı görmek için giriş yapın</h1>
    <Link href='/Login' passHref><button className='btn btn-success d-flex mx-auto my-4'>Giriş yap</button></Link>
  </>
  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">FirstName</th>
              <th scope="col">Surname</th>
              <th scope="col">Email</th>
              <th scope="col">
                <Modal personList={personList} />
              </th>
            </tr>
          </thead>
          <tbody>
            {personList &&
              personList.map((person) => {
                const { id } = person;
                return (
                  <tr key={id}>
                    <th scope="row">{id}</th>
                    <td>
                      <Link href={`/Detay/${id}`}>
                        <a className="nav-link">{person.firstname}</a>
                      </Link>
                    </td>
                    <td>{person.surname}</td>
                    <td>{person.email}</td>
                    <td>
                      <Link href="/Comment">
                        <a className="nav-link me-2">Add Comment</a>
                      </Link>
                    </td>
                    <td>
                      <Link href="/NormalComment">
                        <a className="nav-link me-2">Normal Comment</a>
                      </Link>
                    </td>
                    <td>
                      <FiDelete onClick={() => handleDelete(id)} />
                    </td>
                    <td>
                      <div
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalTwo"
                      >
                        <FiEdit onClick={() => handleGet(id)} />
                      </div>
                      <div
                        className="modal fade"
                        id="exampleModalTwo"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Editing
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form
                                onSubmit={() => handleUpdate(id)}
                                className="d-flex"
                              >
                                <div className="container row">
                                  {/* testing... */}
                                  {
                                    fields.map(field => (
                                      <div className="mb-1 col-6" key={field.title}>
                                        <label
                                          htmlFor="recipient-name"
                                          className="col-form-label"
                                        >
                                          {field.title}
                                        </label>
                                        <input
                                          value={values[field.value] ?? ""}
                                          onChange={handleChange(field.value)}
                                          type={field.type}
                                          className="form-control"
                                          id="recipient-name"
                                        />
                                      </div>
                                    ))
                                  }
                                  {/* testing... */}
                                </div>
                              </form>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                onClick={() => handleUpdate(id)}
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                              >
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div >
    </>
  );
}
export async function getServerSideProps(context) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/users`
  );
  const result = await response.data;
  return {
    props: {
      personList: result,
    },
  };
}
