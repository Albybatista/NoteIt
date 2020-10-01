class App extends React.Component {
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
                description: '',
                show: false
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
            show: !this.state.show
          })
      }


    //HOW THE INFO SHOULD DISPLAY ON SCREEN, COMBINING HTML w/ JS USING REACT
    render = () => {
        return(
            <div>
              <nav className="navbar navbar-light bg-light cars">
                <li>
                  <a className="navbar-brand note" href="#">Note It</a>
                  </li>
                <li>
                  <button onClick={this.toggleForm} data-toggle='modal' className="btn btn-light"><i className="fas fa-plus"></i></button>
                </li>
              </nav>
              <div className="modal-fade">
              <div className="modal-dialog">
                <div className="form-group">
                {this.state.show ? <form onSubmit={this.handleSubmit}> <div className="text-center">
                      <h2 className="display-4 font-bold white-text mb-2">Create a Note</h2>
                      </div>
                      <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
                    <label htmlFor="title">Title: </label>
                    <input className="form-control" id="title" onChange={this.handleChange} type="text"/>
                    <br />
                    <label htmlFor="description">Description: </label>
                    <textarea className="form-control" id="description" onChange={this.handleChange} type="textarea"/>
                    <br />
                <button type="submit" className="btn btn-primary">Create Note</button>
                </form>
                : null}
                </div>
                </div></div>
                <div className="text-center">
                <h2 className="display-4 font-bold white-text mb-2">Note Box</h2>
                </div>
                <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
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
                            <input className="form-control formzz" type="text" id="title" onChange={this.handleChange} value={this.state.title} />
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
