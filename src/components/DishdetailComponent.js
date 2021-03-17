import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, Button,
    ModalBody, Label, Form,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            //     rating: '1',
            //     yourName: '',
            //     comment: '',
            //     touched: {
            //         rating: false,
            //         yourName: false,
            //         comment: false,

            //     }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.close = this.close.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });


    }

    submitValues(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        this.props.addCommentExtra(this.props.dishId, values.rating, values.author, values.comment);

        // if (values != null) {
        //     console.log(values)
        //     console.log('Current State is: ' + JSON.stringify(values));
        //     console.log('Current State is: ' + this.props.dishId);
        // }

        //values.preventDefault();

    }



    close(event) {
        this.toggleModal();
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.close}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.submitValues(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control custom-select" defaultValue='1'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="yourName">Your Name</Label>
                                    <Control.text model=".yourName" id="yourName" name="yourName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".yourName"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="message">Your Feedback</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="5"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
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

function RenderComments({ comments, addComment, dishId, addCommentExtra }) {
    if (comments != null)
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {
                        comments.map((comment) => {
                            console.log(comment.comment)
                            return (

                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>--{comment.author}&nbsp;,<span> &nbsp;{formatDate(comment.date)}</span></p>

                                </li>
                            )

                        })

                    }

                </ul>
                <CommentForm dishId={dishId} addComment={addComment} addCommentExtra={addCommentExtra} />
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
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                        addCommentExtra={props.addCommentExtra}
                    />

                </div>

            </div>
        </div>
    );
}


export default DishDetail