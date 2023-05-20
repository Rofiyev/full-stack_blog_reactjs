const Textarea = ({ placeholder, name, rows, value, change }) => {
  return <textarea className="form-control" name={name} placeholder={placeholder} rows={rows} value={value ? value : ''} onChange={e => change(e.target.value)}></textarea>
}

export default Textarea;