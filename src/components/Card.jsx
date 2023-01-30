import React, { useState } from 'react'
import { CardActionArea } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import fireDB from '../firebase';

const Card = ({ noteData, id }) => {
  // modal open close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // delete Note
  const DeleteNote = async (id) => {
    fireDB.child(`sticky-notes-db/${id}`).remove((err) => {
      if (err) {
        toast.error(err)
      }
      else {
        toast.success("Note Deleted successfully")
      }
    })
  }

  //Editnote

  const [state, setState] = useState({ title: noteData[id].title, notesdetail: noteData[id].notesdetail,currentDate : noteData[id].currentDate })

  const { title, notesdetail,currentDate} = state;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const EditNote = async (e) => {
    e.preventDefault();

    await fireDB.child(`sticky-notes-db/${id}`).set(state, (err) => {
      if (err) {
        toast.error(err);
        handleClose();
      } else {
        toast.success("Note Update Successfully")
        handleClose();
      }
    })
  }

  return (
    <>
      <div className="box w-[100%] md:w-auto bg-slate-800 m-5 rounded-xl hover:bg-gradient-to-l from-pink-500 to-blue-500 p-1 break-inside-avoid-column" key={id}>
        <CardActionArea>
          <div className="innertextsection h-40 md:w-80 rounded-xl bg-slate-900 p-2 overflow-y-auto">
            <h2 className='text-blue-500 font-semibold text-xl mb-1'>{noteData[id].title}</h2>
            <p className='text-white break-words'>{noteData[id].notesdetail}</p>
          </div>
        </CardActionArea>
        <div className="edit-box flex justify-between items-center p-4">
          <div className="date">
            <h6 className='text-white font-semibold'>{noteData[id].currentDate}</h6>
          </div>
          <div className="editbtn flex gap-2">
            <div className="btn bg-blue-300 p-2 rounded-full cursor-pointer hover:translate-y-1" onClick={handleOpen}>
              <EditIcon />
            </div>
            <div className="btn bg-red-300 p-2 rounded-full cursor-pointer hover:translate-y-1" onClick={() => DeleteNote(id)}>
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>

      
      {/* Editpage Modal*/}
      
      <div className='h-screen fixed z-10'>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="absolute flex justify-center items-center"
        >
          <div className="bg-slate-800 p-4 rounded-lg border-none">
            <form method='POST' className='addnoteform w-[290px]  md:w-[400px] flex flex-col gap-4'>
              <div className="imputbox">
                <input type="text"
                  placeholder='Title' name="title" className='w-full outline-none font-semibold p-3 rounded-lg'
                  value={state.title}
                  onChange={handleInput}
                />
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
                <input type="submit" className='bg-green-400 font-semibold p-3 rounded-lg cursor-pointer hover:translate-y-1' value="Edit Note"
                  onClick={EditNote}
                />
              </div>
            </form>
          </div>
        </Modal>
      </div>


    </>
  )
}

export default Card;

