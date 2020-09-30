class App extends React.Component {
    constructor(props) {
            super(props);
    state = {
        title: '',
        description: '',
        notes: [],
        show: false
    }

    //DON'T LOAD UNTIL EVERYTHING IS MOUNTED ON THE DOM
    componentDidMount = () => {
        axios.get('/notes').then((response) => {
            this.setState({
                notes: response.data
            })
        })
    }

    //DELETE -- DELETE
    deleteNote = (event) => {
        axios.delete('/notes/' + event.target.value).then(response =>
            this.setState({
                notes: response.data
            })
        )
    }

    //UPDATE -- PUT
    updateNote = (event) => {
        event.preventDefault()
        const id = event.target.id
        axios.put('/notes/' + id, this.state).then(response => {
            this.setState({
                notes: response.data,
                title: '',
                description: ''
            })
        })
    }

    //HOW TO SET THE CHANGES
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    //HOW TO ADD AFTER SUBMIT -- GET THE NOTES AFTER POST & ADD IT, PREVENT AUTO REFRESH
    handleSubmit = (event) => {
        event.preventDefault()
        event.target.reset()
        axios.post('/notes', this.state).then(response => {
            this.setState({
                notes: response.data,
                title: '',
                description: '',

            })
        })
    }

    //TOGGLE FORM
    toggleForm = (event) => {
        this.setState({
            show: true
        })
    }
    }

    //HOW THE INFO SHOULD DISPLAY ON SCREEN, COMBINING HTML w/ JS USING REACT
    render = () => {
        return(
            <div>
              <nav className="navbar navbar-light bg-light">
                <li>
                  <a className="navbar-brand" href="#">Note It</a>
                  </li>
                <li>
                     <button onClick={this.toggleForm} className="btn btn-light"><i className="fas fa-plus"></i>{this.state.toggleForm ? true : null}</button>
                </li>
              </nav>
                <h2>Create a Note</h2>
                <div className="form-group"> 
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title: </label>
                    <input className="form-control" id="title" onChange={this.handleChange} type="text"/>
                    <br />
                    <label htmlFor="description">Description: </label>
                    <textarea className="form-control" id="description" onChange={this.handleChange} type="textarea"/>
                    <br />
                    
                <button id="createbtn" type="submit" className="btn btn-primary">Create Note</button>
                
                </form>
                </div>
                    <h3>Note Box</h3>
                    <ul>
                        {this.state.notes.map(note => {
                            return <li className='bottom-li' key={note._id}>
                                <br />
                                <h5>{note.title}</h5>
                                <p>{note.description}</p>
                        <button className="btn btn-outline-danger" value={note._id} onClick={this.deleteNote}>
                            Delete
                        </button>
                            <details>
                                <summary>
                                    <i className="fas fa-pencil-alt"></i>
                                </summary>
                                <form onSubmit={this.updateNote} id={note._id}>
                            <label className="form-group" htmlFor="title">Title: </label>
                            <br />
                            <input className="form-control" type="text" id="title" onChange={this.handleChange} value={this.state.title} />
                            <br />
                            <label htmlFor="description">Description: </label>
                            <br />
                            <input className="form-control" type="textarea" id="description" onChange={this.handleChange} value={this.state.description} />
                            <input className="btn btn-outline-success" type="submit" value="Update Note" />
                            </form>
                            </details>
                            </li>
                        })}
                    </ul>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('main'))
