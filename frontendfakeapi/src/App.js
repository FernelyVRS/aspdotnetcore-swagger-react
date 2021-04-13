import React from "react";
import axios from "axios";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
			id: 0,
			title: '',
			description: '',
			pagecount: 0,
			excerpt: '',
			publishdate: ''
		};
	}

	componentDidMount() {
		axios.get("https://localhost:44369/Book").then((res) => {
			this.setState({
				books: res.data,
				id: 0,
				title: '',
				description: '',
				pagecount: 0,
				excerpt: '',
				publishdate: ''
			});
		});
	}

	submit(event, id) {
		event.preventDefault();
		if (id === 0) {
			axios.post("https://localhost:44369/Book", {
					id: this.state.id,
					title: this.state.title,
					description: this.state.description,
					pagecount: this.state.pagecount,
					excerpt: this.state.excerpt,
					publishdate: this.state.publishdate
				})
				.then((res) => {
					this.componentDidMount();
				})
		} else {
			axios.put("https://localhost:44369/Book", {
					id: this.state.id,
					title: this.state.title,
					description: this.state.description,
					pagecount: this.state.pagecount,
					excerpt: this.state.excerpt,
					publishdate: this.state.publishdate
				})
				.then(() => {
					this.componentDidMount();
				})
		}
	}
  delete(id) {
		axios.delete(`https://localhost:44369/Book/${id}`)
    .then(() => {
			this.componentDidMount();
		});
	}

	edit(id) {
		axios.get(`https://localhost:44369/Book/${id}`).then((res) => {
			console.log(res.data);
			this.setState({
				id: res.data.id,
				title: res.data.title,
				description: res.data.description,
				pagecount: res.data.pageCount,
				excerpt: res.data.excerpt,
				publishdate: res.data.publishDate
			});
		});
	}
  
	render() {
		return (
			<div>				
				<div className="row">
					<div className="container">
						<div className="col s4">
							<form onSubmit={(e) => this.submit(e, this.state.id)}>
								<div className="input-field col s12">
									<i className="material-icons prefix">format_list_numbered</i>
									<input
										onChange={(e) => this.setState({ id: e.target.value })}
										value={this.state.id}
                    placeholder="Id"
										type="number"
										id="autocomplete-input"
										className="autocomplete"
									/>
									<label htmlFor="autocomplete-input">Id</label>
								</div>
								<div className="input-field col s12">
									<i className="material-icons prefix">title</i>
									<input
										onChange={(e) => this.setState({ title: e.target.value })}
										value={this.state.title}
                    placeholder="Title"
										type="text"
										id="autocomplete-input"
										className="autocomplete"
								/>
									<label htmlFor="autocomplete-input">Title</label>
								</div>
								<div className="input-field col s12">
									<i className="material-icons prefix">description</i>
									<textarea
										onChange={(e) =>
											this.setState({ description: e.target.value })
										}
										value={this.state.description}
                    placeholder="Description"
										type="text"
										id="autocomplete-input"
										className="autocomplete materialize-textarea"
									/>
									<label htmlFor="autocomplete-input">Description</label>
								</div>
								<div className="input-field col s12">
									<i className="material-icons prefix">textsms</i>
									<input
										onChange={(e) =>
											this.setState({ pagecount: e.target.value })
										}
										value={this.state.pagecount}
                    placeholder="Page Count"
										type="number"
										id="autocomplete-input"
										className="autocomplete"
									/>
									<label htmlFor="autocomplete-input">Page Count</label>
								</div>
								<div className="input-field col s12">
									<i className="material-icons prefix">short_text</i>
									<textarea
										onChange={(e) => this.setState({ excerpt: e.target.value })}
										value={this.state.excerpt}
                    placeholder="Excerpt"
										type="number"
										id="autocomplete-input"
										className="autocomplete materialize-textarea"
									/>
									<label htmlFor="autocomplete-input">Excerpt</label>
								</div>
								<div className="input-field col s12">
									<i className="material-icons prefix">date_range</i>
									<input
										onChange={(e) =>
											this.setState({ publishdate: e.target.value })
										}
										value={this.state.publishdate}
                    placeholder="Publish Dater"
										type="text"
										id="autocomplete-input"
										className="validate"
									/>
									<label htmlFor="autocomplete-input">Publish Date</label>
								</div>
								<button
									className="btn waves-effect waves-light right"
									type="submit"
									name="action"
								>
									Submit
									<i className="material-icons right">send</i>
								</button>
							</form>
						</div>
						<div className="col s8">
							<table>
								<thead>
									<tr>
										<th>Id</th>
										<th>Title</th>
										<th>Description</th>
										<th>Page Count</th>
										<th>Excerpt</th>
										<th>Publish Date</th>
                    <th>Edite</th>
                    <th>Delete</th>
									</tr>
								</thead>

								<tbody>
									{this.state.books.map((book) => (
										<tr key={book.id}>
											<td>{book.id}</td>
											<td>{book.title}</td>
											<td>{book.description}</td>
											<td>{book.pageCount}</td>
											<td>{book.excerpt}</td>
											<td>{book.publishDate}</td>
											<td>
												<button
                        onClick={(e) => this.edit(book.id)}
													className="btn waves-effect waves-light right"
													type="submit"
													name="action"
												>
													<i className="material-icons ">edit</i>
												</button>
											</td>
											<td>
												<button
                        onClick={(e) => this.delete(book.id)}
													className="btn waves-effect waves-light right"
													type="submit"
													name="action"
												>
													<i className="material-icons ">delete</i>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
