import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import fireDB from '../firebase';

const Addnote = () => {
    // modal open close
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // puss data on firebase
    // get current date
    let monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let getDay = new Date().getDate();
    let getMonth = new Date().getMonth();
    let getMonthinword = monthNames[getMonth];
    let getYear = new Date().getFullYear();
    const CurrDate = getDay + " " + getMonthinword + " " + getYear;

    // firebase add note
    const [state, setState] = useState({ title: "", notesdetail: "", currentDate: CurrDate })

    const { title, notesdetail, currentDate } = state;
    // console.log(currentDate);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !notesdetail) {
            toast.error("fill the proper detailed")
        } else {
            await fireDB.child("sticky-notes-db").push(state, (err) => {
                if (err) {
                    toast.error(err);
                    handleClose();
                } else {
                    toast.success("Note Added Successfully")
                    setState({ ...state, title: "", notesdetail: "" });
                    handleClose();
                }
            })
        }

    }


    return (

        <>

            <div className='fixed right-0 bottom-0 m-5 z-50'>
                <div onClick={handleOpen} className='rounded-full bg-gradient-to-l from-blue-500 to-red-500  hover:translate-y-1 cursor-pointer p-3 md:p-4'><AddIcon fontSize='large' className='text-white' /></div>
            </div>

            <div className='h-screen absolute md:fixed z-10'>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="absolute flex justify-center items-center"
                >
                    <div className="bg-slate-800 p-4 rounded-lg border-none">
                        <form method='POST' className='addnoteform  w-[290px]  md:w-[400px] flex flex-col gap-4'>
                            <div className="imputbox">
                                <input type="text"
                                    placeholder='Title' name="title" className='w-full outline-none font-semibold p-3 rounded-lg'
                                    value={state.title}
                                    onChange={handleInput} />
                            </div>
                            <div className="imputbox">
                                <textarea rows="4" type="text"
                                    placeholder='write your note...'
                                    name="notesdetail" className='resize-none font-semibold w-full outline-none rounded-lg p-3'
                                    value={state.notesdetail}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="submitbtn text-center">
                                <input type="submit" className='bg-green-400 font-semibold p-3 rounded-lg cursor-pointer hover:translate-y-1' value="Add Note" onClick={handleSubmit}
                                />
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>

        </>
    );
}

export default Addnote

