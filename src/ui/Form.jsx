import { useSelector } from 'react-redux';
import Input from './Input';
import Textarea from './Textarea';

const Form = ({ refForm, onSubmit, buttonText = 'Create', state }) => {
  const { isLoading } = useSelector(state => state.article);
  const { title, body, description, setTitle, setBody, setDescription } = state;

  return (
    <form ref={refForm} onSubmit={onSubmit} className='mw-100 d-flex gap-2 flex-column'>
      <Input type={'text'} placeholder={'Title'} name={'title'} value={title} change={setTitle} />
      <Textarea placeholder={'Description'} name={'description'} rows={4} value={description} change={setDescription} />
      <Textarea placeholder={'Body'} name={'body'} rows={8} value={body} change={setBody} />
      <button className="btn btn-primary btn-block mt-2" type="submit" disabled={isLoading}>
        {isLoading ? <><span className="spinner-border spinner-border-sm" role="status"></span> &nbsp; </> : <></>}
        {buttonText}
      </button>
    </form>
  )
}

export default Form