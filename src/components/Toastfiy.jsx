import { toast } from 'react-toastify';

const Toastfiy = ({ color, messege }) => {
  return (
    <>
      {toast.success(messege, {
        position: 'top-right',
        autoClose: 2000,
        progress: 0,
        progressStyle: { background: '#fff' },
        theme: 'colored',
        style: { background: color },
      })}
    </>
  )
}

export default Toastfiy;