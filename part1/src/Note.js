export const Note = ({ title, body }) => {    //exportar como nombrado
    return (
      <li> 
        <p><strong>{title}</strong></p>
        <small>{body}</small>        
      </li>
      )
  };

  //export default Note;  //exporta el módulo por defecto 'Note'