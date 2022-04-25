import { useContext, useState, useEffect } from "react";
import axios from "axios"
import { personContextProvider } from "./Contacts";
import { useRouter } from "next/router";
import AppContext from "../Context";
import Link from "next/link";
export default function Form({ person }) { // true
  const { user, setUser } = useContext(AppContext)
  const router = useRouter();
  const [values, setValues] = useState({
    contact_number: "",
    type: "",
    company_name: "",
    title_formula: "",
    title: "",
    firstname: "",
    surname: "",
    address: "",
    zip: "",
    city: "",
    state: "",
    country: "",
    email1: "",
    email2: "",
    phone1: "",
    phone2: "",
    mobile: "",
    fax: "",
    website: "",
    skype: "",
    contact_with: "",
    make_from: "",
    contact_through: "",
    language: "",
    note: "",
    categories: "",
    sectors: "",
    number_of_collaborators: "",
    registry_number: "",
    vat_number: "",
    vat_number_intra: "",
    formula_of_greeting: "",
    birthday: "",
    parent_id: "",
    created_by: "",
    updated_by: "",
    created_date: "",
    updated_date: "",
  });


  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/contacts`;
    axios.post(url, { ...values }).then(() => person.push(values))
    setValues({
      contact_number: "",
      type: "",
      company_name: "",
      title_formula: "",
      title: "",
      firstname: "",
      surname: "",
      address: "",
      zip: "",
      city: "",
      state: "",
      country: "",
      email1: "",
      email2: "",
      phone1: "",
      phone2: "",
      mobile: "",
      fax: "",
      website: "",
      skype: "",
      contact_with: "",
      make_from: "",
      contact_through: "",
      language: "",
      note: "",
      categories: "",
      sectors: "",
      number_of_collaborators: "",
      registry_number: "",
      vat_number: "",
      vat_number_intra: "",
      formula_of_greeting: "",
      birthday: "",
      parent_id: "",
      created_by: "",
      updated_by: "",
      created_date: "",
      updated_date: "",
    });
  };
  if (Object.keys(user).length === 0) return <>
    <h1 className="text-center m-2">Bu sayfayı görmek için giriş yapın</h1>
    <Link href='/Login' passHref><button className='btn btn-success d-flex mx-auto my-4'>Giriş yap</button></Link>
  </>
  return (<>

    <div className="container mt-5 border-rounded d-flex justify-content-center">
      <div className="col-8">
        <div className="container w-10">
          <form className="form-control" onSubmit={handleCreate}>
            <input
              placeholder="contact_number"
              value={values.contact_number}
              onChange={handleChange("contact_number")}
              className="form-control   " id="inputGroup-sizing-sm"
            />
            <input
              placeholder="type"
              value={values.type}
              onChange={handleChange("type")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input
              placeholder="company_name"
              value={values.company_name}
              onChange={handleChange("company_name")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input
              placeholder="title_formula"
              value={values.title_formula}
              onChange={handleChange("title_formula")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input
              placeholder="title"
              value={values.title}
              onChange={handleChange("title")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.firstname}
              placeholder={"firstname"}
              onChange={handleChange("firstname")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.surname}
              placeholder={"surname"}
              onChange={handleChange("surname")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.address}
              placeholder={"address"}
              onChange={handleChange("address")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />

            <input

              value={values.zip}
              placeholder={"zip"}
              onChange={handleChange("zip")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.city}
              placeholder={"city"}
              onChange={handleChange("city")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.state}
              placeholder={"state"}
              onChange={handleChange("state")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.country}
              placeholder={"country"}
              onChange={handleChange("country")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.email1}
              placeholder={"email1"}
              onChange={handleChange("email1")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.email2}
              placeholder={"email2"}
              onChange={handleChange("email2")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.phone1}
              placeholder={"phone1"}
              onChange={handleChange("phone1")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.phone2}
              placeholder={"phone2"}
              onChange={handleChange("phone2")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.mobile}
              placeholder={"mobile"}
              onChange={handleChange("mobile")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.fax}
              placeholder={"fax"}
              onChange={handleChange("fax")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.website}
              placeholder={"website"}
              onChange={handleChange("website")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.skype}
              placeholder={"skype"}
              onChange={handleChange("skype")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.contact_with}
              placeholder={"contact_with"}
              onChange={handleChange("contact_with")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.make_from}
              placeholder={"make_from"}
              onChange={handleChange("make_from")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.contact_through}
              placeholder={"contact_through"}
              onChange={handleChange("contact_through")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.language}
              placeholder={"language"}
              onChange={handleChange("language")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.note}
              placeholder={"note"}
              onChange={handleChange("note")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.categories}
              placeholder={"categories"}
              onChange={handleChange("categories")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.sectors}
              placeholder={"sectors"}
              onChange={handleChange("sectors")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />

            <input

              value={values.number_of_collaborators}
              placeholder={"number_of_collaborators"}
              onChange={handleChange("number_of_collaborators")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.registry_number}
              placeholder={"registry_number"}
              onChange={handleChange("registry_number")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.vat_number}
              placeholder={"vat_number"}
              onChange={handleChange("vat_number")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.vat_number_intra}
              placeholder={"vat_number_intra"}
              onChange={handleChange("vat_number_intra")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.formula_of_greeting}
              placeholder={"formula_of_greeting"}
              onChange={handleChange("formula_of_greeting")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.birthday}
              placeholder={"birthday"}
              onChange={handleChange("birthday")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.parent_id}
              placeholder={"parent_id"}
              onChange={handleChange("parent_id")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.created_by}
              placeholder={"created_by"}
              onChange={handleChange("created_by")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.updated_by}
              placeholder={"updated_by"}
              onChange={handleChange("updated_by")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.created_date}
              placeholder={"created_date"}
              onChange={handleChange("created_date")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />
            <input

              value={values.updated_date}
              placeholder={"updated_date"}
              onChange={handleChange("updated_date")}
              className="form-control my-2" id="inputGroup-sizing-sm"
            />

            <button className="btn btn-success my-3" onClick={handleCreate} data-bs-dismiss="modal">
              Create
            </button>
            <button
              type="button"
              className="btn btn-danger ms-3"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  );
}

