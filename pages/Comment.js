import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { FiDelete, FiEdit } from 'react-icons/fi'
import AppContext from "../Context";
import { useRouter } from 'next/router'
// --------------------------------------------------
import { Editor, EditorState, RichUtils } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import 'draft-js/dist/Draft.css'
import Link from 'next/link';
// --------------------------------------------------
// --------------------------------------------------
function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'superFancyBlockquote';
  }
}

// --------------------------------------------------
export default function Comment() {
  const { user, setUser } = useContext(AppContext)
  const router = useRouter()
  // --------------------------------------------------
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [html, setHtml] = useState(null)
  useEffect(() => {
    const contentState = editorState.getCurrentContent()
    let contentHTML = stateToHTML(contentState)
    setHtml(contentHTML)
  }, [editorState])
  const InlineStyleTypes = [
    {
      value: 'B',
      style: 'BOLD',
    },
    {
      value: 'I',
      style: 'ITALIC',
    },
    {
      value: '_',
      style: 'UNDERLINE',
    },
    {
      value: '-',
      style: 'STRIKETHROUGH',
    },
  ]
  const setInlineStyle = (event) => {
    event.preventDefault()
    let style = event.currentTarget.getAttribute('use-style')
    setEditorState(RichUtils.toggleInlineStyle(editorState, style))
  }
  const renderInlineStyleButton = (value, style) => {
    const currentInlineStyle = editorState.getCurrentInlineStyle()
    let styleActive = ''
    if (currentInlineStyle.has(style)) {
      styleActive = 'active'
    }
    return (
      <input
        type='button'
        key={style}
        value={value}
        use-style={style}
        onMouseDown={setInlineStyle}
        className={styleActive}
      />
    )
  }
  // --------------------------------------------------
  /*Edit start  */
  const handleGet = async (id) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/comments/${id}`
    )
    setValues(res.data)
  }
  const handleUpdate = (id) => {
    try {
      axios.put(
        `${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/comments/${id}`,
        values
      )
      router.push('/Comment')
    } catch (error) {
      console.log(error)
    }
  }
  /*Edit end  */
  const handleDelete = async (id) => {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/comments/${id}`
      )
      .then(() => {
        router.push('/Comment')
      })
  }
  const [personComment, setPersonComment] = useState([])
  const CommentFetch = async () => {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/comments`
    )
    setPersonComment(res.data)
  }
  useEffect(() => {
    CommentFetch()
  }, [])
  const [values, setValues] = useState({
    customer_id: '',
    request_id: '',
    categories: '',
    due_date: '',
    comment: '',
    is_task: '',
    is_webrequest: '',
    type_webrequest: '',
    files: '',
    to_users: '',
    is_actif: '',
    task_status: '',
    pinned: '',
    snooze: '',
    created_by: '',
    updated_by: '',
    created_at: '',
    updated_at: '',
  })
  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value })
  }
  const handleComment = (e) => {
    e.preventDefault()
    const url =
      `${process.env.NEXT_PUBLIC_DB_HOST}basic/web/index.php/comments`
    axios.post(url, { ...values, comment: html });
    setValues({
      customer_id: '',
      request_id: '',
      categories: '',
      due_date: '',
      comment: '',
      is_task: '',
      is_webrequest: '',
      type_webrequest: '',
      files: '',
      to_users: '',
      is_actif: '',
      task_status: '',
      pinned: '',
      snooze: '',
      created_by: '',
      updated_by: '',
      created_at: '',
      updated_at: '',
    })
  }
  if (Object.keys(user).length === 0) return <>
    <h1 className="text-center m-2">Bu sayfayı görmek için giriş yapın</h1>
    <Link href='/Login' passHref><button className='btn btn-success d-flex mx-auto my-4'>Giriş yap</button></Link>
  </>
  return (
    <>
      <div className='container'>
        <div className='col'>
          <div className='row'>
            <form className='row g-3 rounded bg-info'>
              <div className='container d-flex'>
                <div className='container'>
                  <div className='col-auto mt-1'>
                    <label
                      htmlFor='customer_id'
                      className=' text-light form-label'
                    >
                      Customer id
                    </label>
                    <input
                      value={values.customer_id}
                      onChange={handleChange('customer_id')}
                      type='number'
                      className='form-control'
                      placeholder='customer_id'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label
                      htmlFor='request_id'
                      className=' text-light form-label'
                    >
                      Request_id
                    </label>
                    <input
                      value={values.request_id}
                      onChange={handleChange('request_id')}
                      type='number'
                      className='form-control'
                      placeholder='request_id'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label
                      htmlFor='categories'
                      className='text-light form-label'
                    >
                      Categories
                    </label>
                    <input
                      value={values.categories}
                      onChange={handleChange('categories')}
                      type='number'
                      className='form-control'
                      placeholder='categories'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label htmlFor='due_date' className='text-light form-label'>
                      Due date
                    </label>
                    <input
                      value={values.due_date}
                      onChange={handleChange('due_date')}
                      type='number'
                      className='form-control'
                      placeholder='due_date'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label htmlFor='is_task' className='text-light form-label'>
                      Is task
                    </label>
                    <input
                      value={values.is_task}
                      onChange={handleChange('is_task')}
                      type='number'
                      className='form-control'
                      placeholder='is_task'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label
                      htmlFor='is_webrequest'
                      className='text-light form-label'
                    >
                      Is webrequest
                    </label>
                    <input
                      value={values.is_webrequest}
                      onChange={handleChange('is_webrequest')}
                      type='number'
                      className='form-control'
                      placeholder='is_webrequest'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label htmlFor='comment' className='text-light form-label'>
                      Type webrequest
                    </label>
                    <input
                      value={values.type_webrequest}
                      onChange={handleChange('type_webrequest')}
                      type='number'
                      className='form-control'
                      placeholder='type_webrequest'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label htmlFor='formFile' className='text-light form-label'>
                      Files
                    </label>
                    <input
                      value={values.files}
                      onChange={handleChange('files')}
                      className='form-control'
                      type='file'
                      id='formFile'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label htmlFor='to_users' className='text-light form-label'>
                      To users
                    </label>
                    <input
                      value={values.to_users}
                      onChange={handleChange('to_users')}
                      type='text'
                      className='form-control'
                      placeholder='to_users'
                    />
                  </div>
                </div>
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
                      type='number'
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
                      type='number'
                      className='form-control'
                      placeholder='task_status'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label htmlFor='pinned' className='text-light form-label'>
                      Pinned
                    </label>
                    <input
                      value={values.pinned}
                      onChange={handleChange('pinned')}
                      type='number'
                      className='form-control'
                      placeholder='pinned'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label htmlFor='snooze' className='text-light form-label'>
                      Snooze
                    </label>
                    <input
                      value={values.snooze}
                      onChange={handleChange('snooze')}
                      type='number'
                      className='form-control'
                      placeholder='snooze'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label
                      htmlFor='created_by'
                      className='text-light form-label'
                    >
                      Created by
                    </label>
                    <input
                      value={values.created_by}
                      onChange={handleChange('created_by')}
                      type='number'
                      className='form-control'
                      placeholder='created_by'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label
                      htmlFor='updated_by'
                      className='text-light form-label'
                    >
                      Updated by
                    </label>
                    <input
                      value={values.updated_by}
                      onChange={handleChange('updated_by')}
                      type='number'
                      className='form-control'
                      placeholder='updated_by'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label
                      htmlFor='created_at'
                      className='text-light form-label'
                    >
                      Created at
                    </label>
                    <input
                      value={values.created_at}
                      onChange={handleChange('created_at')}
                      type='number'
                      className='form-control'
                      placeholder='created_at'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label
                      htmlFor='updated_at'
                      className='text-light form-label'
                    >
                      Updated at
                    </label>
                    <input
                      value={values.updated_at}
                      onChange={handleChange('updated_at')}
                      type='number'
                      className='form-control'
                      placeholder='updated_at'
                    />
                  </div>
                  <div className='col-auto mt-1'>
                    <label htmlFor='comment' className='text-light form-label'>
                      Comment
                    </label>

                    {InlineStyleTypes.map((button) => {
                      return renderInlineStyleButton(button.value, button.style)
                    })}
                    <Editor
                      editorState={editorState}
                      onChange={setEditorState}
                    />
                  </div>
                </div>
              </div>
              <div className='col-auto mt-1'>
                <button
                  onClick={handleComment}
                  type='submit'
                  className='btn btn-primary mb-3 ms-1'
                >
                  Comment Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col'>
            <ul className='list-group list-group-flush'>
              {personComment &&
                personComment.map((item) => {
                  const { id, comment, files } = item
                  return (
                    <div key={id} className='container mt-2 mb-4 rounded'>
                      <li className='list-group-item'>
                        Comment:<div dangerouslySetInnerHTML={{ __html: comment }} />
                        <div className='text-end'>
                          {' '}
                          <FiDelete onClick={() => handleDelete(id)} />
                        </div>
                        <div className='text-end'>
                          <div
                            type='button'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModalTwo'
                          >
                            <FiEdit onClick={() => handleGet(id)} />
                          </div>
                          <div
                            className='modal fade'
                            id='exampleModalTwo'
                            tabIndex='-1'
                            aria-labelledby='exampleModalLabel'
                            aria-hidden='true'
                          >
                            <div className='modal-dialog'>
                              <div className='modal-content'>
                                <div className='modal-header'>
                                  <h5
                                    className='modal-title'
                                    id='exampleModalLabel'
                                  >
                                    Editing
                                  </h5>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  <form
                                    onSubmit={() => handleUpdate(id)}
                                    className='d-flex'
                                  >
                                    <div className='container'>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='customer_id'
                                          className='col-form-label'
                                        >
                                          Customer Id
                                        </label>
                                        <input
                                          value={values.customer_id ?? ''}
                                          onChange={handleChange('customer_id')}
                                          type='number'
                                          className='form-control'
                                          id='recipient-name'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='request_id'
                                          className='col-form-label'
                                        >
                                          Request Id
                                        </label>
                                        <input
                                          value={values.request_id ?? ''}
                                          onChange={handleChange('request_id')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='categories'
                                          className='col-form-label'
                                        >
                                          Categories
                                        </label>
                                        <input
                                          value={values.categories ?? ''}
                                          onChange={handleChange('categories')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='due_date'
                                          className='col-form-label'
                                        >
                                          Due Date
                                        </label>
                                        <input
                                          value={values.due_date ?? ''}
                                          onChange={handleChange('due_date')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='message-text'
                                          className='col-form-label'
                                        >
                                          Is task
                                        </label>
                                        <input
                                          value={values.is_task ?? ''}
                                          onChange={handleChange('is_task')}
                                          type='number'
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='is_webrequest'
                                          className='col-form-label'
                                        >
                                          Is Webrequest
                                        </label>
                                        <input
                                          value={values.is_webrequest ?? ''}
                                          onChange={handleChange(
                                            'is_webrequest'
                                          )}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='type_webrequest'
                                          className='col-form-label'
                                        >
                                          Type webrequest
                                        </label>
                                        <input
                                          value={values.type_webrequest ?? ''}
                                          onChange={handleChange(
                                            'type_webrequest'
                                          )}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='Files'
                                          className='col-form-label'
                                        >
                                          Files
                                        </label>
                                        <input
                                          value={values.files ?? ''}
                                          onChange={handleChange('files')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='To Users'
                                          className='col-form-label'
                                        >
                                          To Users
                                        </label>
                                        <input
                                          value={values.to_users ?? ''}
                                          onChange={handleChange('to_users')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='To Users'
                                          className='col-form-label'
                                        >
                                          Is Actif
                                        </label>
                                        <input
                                          value={values.is_actif ?? ''}
                                          onChange={handleChange('is_actif')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='Task Status'
                                          className='col-form-label'
                                        >
                                          Task Status
                                        </label>
                                        <input
                                          value={values.task_status ?? ''}
                                          onChange={handleChange('task_status')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='pinned'
                                          className='col-form-label'
                                        >
                                          Task Status
                                        </label>
                                        <input
                                          value={values.pinned ?? ''}
                                          onChange={handleChange('pinned')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='Snooze'
                                          className='col-form-label'
                                        >
                                          Snooze
                                        </label>
                                        <input
                                          value={values.snooze ?? ''}
                                          onChange={handleChange('snooze')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='created_by'
                                          className='col-form-label'
                                        >
                                          Created by
                                        </label>
                                        <input
                                          value={values.created_by ?? ''}
                                          onChange={handleChange('created_by')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='Updated by'
                                          className='col-form-label'
                                        >
                                          Updated by
                                        </label>
                                        <input
                                          value={values.updated_by ?? ''}
                                          onChange={handleChange('updated_by')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='created_at'
                                          className='col-form-label'
                                        >
                                          Created at
                                        </label>
                                        <input
                                          value={values.created_at ?? ''}
                                          onChange={handleChange('created_at')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mb-1'>
                                        <label
                                          htmlFor='Updated at'
                                          className='col-form-label'
                                        >
                                          Updated at
                                        </label>
                                        <input
                                          value={values.updated_at ?? ''}
                                          onChange={handleChange('updated_at')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                      <div className='mt-2 '>
                                        <label
                                          htmlFor='comment'
                                          className='col-form-label'
                                        >
                                          comment
                                        </label>
                                        <input
                                          value={values.comment ?? ''}
                                          onChange={handleChange('comment')}
                                          className='form-control'
                                          id='message-text'
                                        />
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className='modal-footer'>
                                  <button
                                    type='button'
                                    className='btn btn-secondary'
                                    data-bs-dismiss='modal'
                                  >
                                    Close
                                  </button>
                                  <button
                                    onClick={() => handleUpdate(id)}
                                    type='button'
                                    className='btn btn-primary'
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </div>
                  )
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
