
function ListItems(props) {
    const items = props.items;

    // listOfItems - variable name
    const listItems = items.map(item => {

    // list-items - BEM notation
        return <div className ="list" key={item.key}>
            <p>
                <input type="text" id={item.key} value={item.text} 
                onChange = {(e) => { props.setUpdate(e.target.value, item.key) }}/>
                <span>
                    <box-icon className="trash-icon" type='solid' name="trash-alt" onClick={ () => props.deleteItem(item.key)}></box-icon>
                </span>
            </p>
        </div>
      } 
    )
    return(
          <div> {listItems} </div>
          )
}

// Proper class naming. Should be a noun
class App2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],      // Be explicit. ListOfItems
            currentItem: {
                text:'',
                key:''
            }   
        };
    }

    handleInput = (e) => {
        this.setState({
            currentItem:{
                text: e.target.value,
                key: Date.now()
            }
        })
        updateLS()
    }
 
    addItem = (e) => {
        e.preventDefault();
        const newItem = this.state.currentItem;
    
        // check if it's empty
        // optional - Use enum for your magic string
        if(newItem.text !== "") {
            // const newItems = this.state.items.push(newItem);
            const newItems = [...this.state.items, newItem];

            this.setState({
                items: newItems,
                currentItem: {
                    text:'',
                    key:''
                }
            })
        }
    }

    deleteItem = (key) => {
        const filteredItems = this.state.items.filter( item =>
            item.key !== key);

            this.setState({
                items: filteredItems
            })
    }

    setUpdate = (text, key) => {
        const items = this.state.items;

        items.map(item => {
            if(item.key === key){
                item.text = text;
            }

            this.setState({
                items: items
            })
        })
    }

    // Use same formatting style for your class name
    render(){
        return(
           
            <div className="todo-container">

                <header className="header">  
                    <h2>What's the plan for today?</h2> 
                    <form onSubmit={this.addItem}>
                        <input className="Enter-task" type="text" placeholder="Enter Task" value={this.state.currentItem.text} onChange={this.handleInput} />
                        <button className="Add" type="submit" >Add</button>    
                    </form>
                </header>

                <div className="list-items">
                    <ListItems items={this.state.items} deleteItem ={this.deleteItem} setUpdate ={this.setUpdate}></ListItems>   
                </div>

            </div>
        )
    } 
}



ReactDOM.render(<App2/>, document.getElementById('app2'))


