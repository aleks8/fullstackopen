
const Filter = (props) => {
    //console.log('filter',props)
    return (
      <div>
            filter shown with <input value={props.newShow}
            onChange={props.handleShowChange} 
            />
          </div>
    ) 
  }

export default Filter