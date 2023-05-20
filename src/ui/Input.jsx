const Input = ({ type, placeholder, name, value, change }) => {
  return <input type={type} name={name} className="form-control mb-2" placeholder={placeholder} required={true} onChange={(e) => change(e.target.value)} value={value ? value : ''} />;
}

export default Input;