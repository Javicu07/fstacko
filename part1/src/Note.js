export const Note = ({ content, date }) => {    //exportar como nombrado
    return (
      <li> 
        <p><strong>{content}</strong></p>
        <small>
          <time>{date}</time>
        </small>
      </li>
      )
  };

  //export default Note;  //exporta el módulo por defecto 'Note'