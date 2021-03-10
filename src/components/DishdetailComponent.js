import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, Button,
    ModalBody, Label, Input, FormGroup,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, Form
} from 'reactstrap';
import { Link } from 'react-router-dom';

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.submit = this.submit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });


    }

    submit(event) {
        this.toggleModal();
        alert("submit");
        event.preventDefault();

    }

    render() {
        return (
            <div>
                <Modal  isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.submit}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.submit}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" name="rating">
                                    <option selected>Choose...</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                </select>

                              
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="yourName">Your Name</Label>
                                <Input type="text" id="yourName" name="yourName"
                                    innerRef={(input) => this.yourName = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Input type="textarea" id="comment" name="comment"
                                    innerRef={(input) => this.comment = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            </div>
        )
    }

}


function RenderDish({ dish }) {
    return (
        <Card key={dish.id}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>)
}

function formatDate(string) {
    var date = new Date(string)
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${mo} ${da}, ${ye}`
}

function RenderComments({ comments }) {
    if (comments != null)
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {
                        comments.map((comment) => {
                            return (

                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>--{comment.author}&nbsp;,<span> &nbsp;{formatDate(comment.date)}</span></p>

                                </li>
                            )

                        })
                    }
                </ul>
            </div>
        )
    else
        return <div></div>

}

const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                    <CommentForm />
                </div>

            </div>
        </div>
    );
}


export default DishDetail