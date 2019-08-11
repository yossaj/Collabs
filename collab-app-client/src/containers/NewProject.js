import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import "./NewProject.css";

export default class NewProject extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            description: "",
            project_type: "",
            skills: ""
        };
    }

    validateForm() {
        return this.state.description.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleFileChange = event => {
        this.file = event.target.files[0];
    }

    handleSubmit = async event => {
        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
            return;
        }

        this.setState({ isLoading: true });

        try {
            const attachment = this.file
                ? await s3Upload(this.file)
                : null;

            await this.createProject({
                attachment,
                description: this.state.description,
                project_type: this.state.project_type,
                skills: this.state.skills
            });
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }


    createProject(project) {
        return API.post("projects", "/projects", {
            body: project
        });
    }


    render() {
        return (
            <div className="NewProject">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="description">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.description}
                            componentClass="textarea"
                            placeholder= "Description of Project"
                        />
                    </FormGroup>
                    <FormGroup controlId="project_type">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.project_type}
                            componentClass="select"
                        >
                        <option>Charity</option>
                        <option>Personal Development</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="skills">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.skills}
                            componentClass="select"
                        >
                            <option>CSS</option>
                            <option>Javascript</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="file">
                        <ControlLabel>Attachment</ControlLabel>
                        <FormControl onChange={this.handleFileChange} type="file" />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Create"
                        loadingText="Creating…"
                    />
                </form>
            </div>
        );
    }
}
