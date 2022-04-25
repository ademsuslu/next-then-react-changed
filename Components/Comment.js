import React, { useState } from 'react'

export default function Comment() {
    const [comment, setComment] = useState("")
    const [commentList, setCommentList] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        setCommentList([...commentList, { comment: comment }]);
        setComment("")
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="m-3 d-flex">
                <textarea placeholder="enter your coment" id="floatingTextarea" value={comment} onChange={(e) => setComment(e.target.value)} className="form-control" />
                <button onClick={handleSubmit} className="btn ms-2 btn-info">Add</button>
                <button onClick={() => setCommentList([])} className="btn btn-danger ms-5">Clear All</button>
            </form>
            <ul className="list-group ">
                {commentList.map((item) => {
                    console.log(item);
                    return <div key={item.id} className="d-flex m-1">
                        <li className="list-group-item">{item.comment} </li>
                        <div> </div>
                    </div>
                })}
            </ul>
        </div>
    )
}