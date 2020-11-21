import React, {Component} from "react"
import { Breadcrumb, BreadcrumbItem ,Card, CardImg, 
    CardText, CardTitle, CardBody, Button, Modal, 
    ModalHeader, ModalBody, Label, Row, Col, FormGroup} from 'reactstrap'
import { Link } from 'react-router-dom'
import { LocalForm, Control, Errors } from "react-redux-form";
import {baseUrl} from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    // No need to bind the functions if declared as an Arrow Function
    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit = (values) => {
        console.log("Current State is:" + JSON.stringify(values));
        
        alert("Current State is:" + JSON.stringify(values));
    }

    render() {

        return (
            <>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.props.postComment(this.props.dishId,values.rating,values.name,values.comment)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" className="form-control" 
                                            name="rating">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>          
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".name" name="name" placeholder="Your Name"
                                        className="form-control" validators = {{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                <Errors className="text-danger" model=".name"
                                        show="touched" messages={{
                                            minLength: 'Must be greater than 2 chars',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" name="comment"
                                        className="form-control" rows="6"/>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </FormGroup>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>Submit Comment
                </Button>
            </>
        )
    }
}

class Dishdetail extends Component {

    renderComments(comments){
            const comms = <Stagger in>{comments.map((C) =>{
                const ds = new Date(C.date.slice(0,10)).toString()
                return (
                    <div key={C.id}>
                        <li>{C.comment}</li>
                        <br />
                        <li>--{` ${C.author} , ${ds.slice(4, 11)} , ${ds.slice(10, 15)}`}</li>
                        <br />
                    </div>
                )
            })}
            </Stagger>

            return(
                <div >
                    <h1>Comments</h1>
                    <ul className="list-unstyled">
                        {comms}
                    </ul>

                </div>
            )
    }

    render(){

        if(this.props.isloading){
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(this.props.errMsg){
            return(
            <div className="container">
                <div className="row">            
                    <h4>{this.props.errMess}</h4>
                </div>
            </div>);
        }
        else if(this.props.dish == null) {
            return (
                <div></div>
            )
        }
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                            <Card>
                                <CardImg width="100%" src= {baseUrl +this.props.dish.image} alt={this.props.dish.name} />
                                <CardBody>
                                    <CardTitle>{this.props.dish.name}</CardTitle>
                                    <CardText>{this.props.dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </FadeTransform>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.comments)}
                        <CommentForm dishId={this.props.dish.id} postComment={this.props.postComment}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dishdetail
