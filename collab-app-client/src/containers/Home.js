import React, { Component, Fragment } from "react";
import { PageHeader, ListGroup, ListGroupItem, PanelTitle} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            projects: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const projects = await this.projects();
            this.setState({ projects });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    projects() {
        return API.get("projects", "/projects");
    }


    renderProjectsList(projects) {
        console.log(projects)
        return [{}].concat(projects).map(
            (project, i) =>
                i !== 0
                    ?
                    <Fragment>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="card h-100">
                                <img className="card-img-top" src="http://placehold.it/500x325" alt="" />
                                <div className="card-body">
                                    <h4 className="card-title">{project.description}</h4>
                                </div>
                                <div className="card-footer">
                                    <a href="#" className="btn btn-primary">Help Out!</a>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="card h-100">
                                <img className="card-img-top" src="http://placehold.it/500x325" alt="" />
                                <div className="card-body">
                                    <h4 className="card-title">Charity Project</h4>
                                </div>
                                <div className="card-footer">
                                    <a href="#" className="btn btn-primary">Help Out!</a>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                    
  
        );
    }


    renderLander() {
        return (
            <div className="lander">
                <h1>Collaborate</h1>
                <p>Find people to collaborate with.</p>
                
                <div className="row text-center">

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card h-100">
                            <img className="card-img-top" src="http://placehold.it/500x325" alt=""/>
                                <div className="card-body">
                                    <h4 className="card-title">Charity Project</h4>
                                </div>
                                <div className="card-footer">
                                    <a href="#" className="btn btn-primary">Help Out!</a>
                                </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }

    renderProjects() {
        return (
            <div className="Home">
                <PageHeader>Your Projects</PageHeader>
                <div className="row text-center">
                    {!this.state.isLoading && this.renderProjectsList(this.state.projects)}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderProjects() : this.renderLander()}
            </div>
        );
    }
}
