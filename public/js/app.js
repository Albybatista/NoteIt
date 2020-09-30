class App extends React.Component {
    state = {
        title: '',
        description: '',
        notes: []
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
        axios.post('/notes', this.state).then(response => {
            this.setState({
                notes: response.data,
                title: '',
                description: '',

            })
        })
    }

    //HOW THE INFO SHOULD DISPLAY ON SCREEN, COMBINING HTML w/ JS USING REACT
    render = () => {
        return(
            <div>
                <h2>Create a Note</h2>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title: </label>
                    <input id="title" onChange={this.handleChange} type="text"/>
                    <br />

                    <label htmlFor="description">Description: </label>
                    <input id="description" onChange={this.handleChange} type="textarea"/>
                    <br />
                <input type="submit" value="Create Note" />
                </form>
                    <h3>List of Notes</h3>
                    <ul>
                        {this.state.notes.map(note => {
                            return <li key={note._id}>
                                <br />
                                <h5>{note.title}</h5>
                                <h6>{note.description}</h6>
                        <button className="btn btn-danger" value={note._id} onClick={this.deleteNote}>
                            Delete
                        </button>
                            <details>
                                <summary>
                                    Edit Note
                                </summary>
                                <form onSubmit={this.updateNote} id={note._id}>
                            <label htmlFor="title">Title: </label>
                            <br />
                            <input type="text" id="title" onChange={this.handleChange} value={this.state.title} />
                            <br />
                            <label htmlFor="description">Description: </label>
                            <br />
                            <input type="textarea" id="description" onChange={this.handleChange} value={this.state.description} />
                            <input type="submit" value="Update Note" />
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
