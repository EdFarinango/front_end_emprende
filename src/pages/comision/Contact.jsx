export default function Contact(props) {
    return (
      <div className="contact">
        <h1 className="name">{props.name}</h1>
        <img className="img" src={props.img} alt={props.name}/>
        <p className="descripcion">{props.descripcion}</p>
        <p className="email">{props.email}</p>
      </div>
    );
  }