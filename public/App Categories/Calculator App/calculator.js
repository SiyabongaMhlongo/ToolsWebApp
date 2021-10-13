
                    //  CALCULATOR 

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = [ '/', '*', '+', '-']
const ids = {
    7: 'seven',
    8: 'eight',
    9: 'nine',
    4: 'four',
    5: 'five', 
    6: 'six',
    1: 'one',
    2: 'two',
    3: 'three',
    '/': 'divide',
    '*': 'multiply',
    '+': 'add',
    '-': 'subtract'

}

class App extends React.Component{

    state = { 
        lastPressed: undefined,
        previousValue: '0',
        calc: '0',
        op: undefined
    }


    handleClick = (e) => {
        const { calc, lastPressed} = this.state;
        const { innerText } = e.target;

        switch(innerText){

            //Clear History
            case 'C':{
                this.setState({
                    calc:'0',
                })
                break;
            }

            // Equals
            case '=': {
                const evaluated = eval(calc);
                this.setState({
                    calc: evaluated
                })
                break;
            }

            //Ensure one decimal per number
            case '.': {
                const splitted = calc.split(/[\+\-\*\/]/);
                const last = splitted.slice(-1)[0];

                if(!last.includes('.')){
                    this.setState({
                        calc: calc + '.'
                    })
                }
                break;
            }
            default:{
                let e = undefined;

                //Remove previous operation that was clicked into a new one
                if(operations.includes(innerText)){

                    //Negative Numbers
                    if(operations.includes(lastPressed) && innerText !== '-'){
                        e = calc.slice(0, -3) + `${innerText}`;
                    }else{
                        e = `${calc} ${innerText}`;
                    }

                    //Remove Zero from the beginning, but can add zero after number
                } else{
                    e = calc === '0' ? innerText :(calc + innerText);
                }
                this.setState({
                    calc: e,
                })
            }
        }

        this.setState({
            lastPressed: innerText
        })

    }



render(){

    const {lastPressed, calc, op} =this.state;
  
    return(
        <div className="calculator-container">


            <div id="display" className="display">{ calc }</div>

            <div id="nums-container"className="nums-container">
                <button className="cancel-button" onClick={this.handleClick} id="clear">C</button>
                {
                nums.map((num) => 
                (<button className={`nums-button ${num === 0 && 'zero-button'}` } key={num} onClick= {this.handleClick} id={ids[num]}>{num}</button>
                ))
                }
                <button className="nums-button" id="decimal">.</button>
            </div>

            <div className="operations-container">
                {
                operations.map((operation) =>
                (<button className="operations-button" key={operation} onClick= {this.handleClick} id={ids[operation]}>{operation}</button>
                ))
                }

                <button className="equals" onClick= {this.handleClick} id="equals">=</button>
            </div>
           

        </div>
    )
}

}

ReactDOM.render(<App/>, document.getElementById('app'));








