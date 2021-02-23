import React, { Component } from 'react';
import {
    Card, CardBody, CardImg, CardText,
    CardTitle
} from 'reactstrap';

class DishDetail extends Component {
 
    renderDish(dish) {
        return (
            <Card key={dish.id}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{this.props.selectedDish.description}</CardText>
                </CardBody>
            </Card>)
    }

    formatDate(string){
        var date = new Date(string)
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        return `${mo} ${da}, ${ye}`
    }

    renderComments(comments) {
        if (comments != null)
            return (
                <div>
                    <h4>Comments</h4>    
                    {
                        comments.map((comment) => {
                            return (
                                <ul key={comment.id} className="list-unstyled">
                                    <li>{comment.comment} </li>
                                    <li>--{comment.author} &nbsp; , &nbsp;{this.formatDate(comment.date)} </li>

                                </ul>
                            )

                        })
                    }

                </div>
            )
        else
            return <div></div>

    }



    render() {
        if (this.props.selectedDish != null)
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.selectedDish.comments)}
                    </div>
                </div>
            );

        else
            return <div></div>
    }
}

export default DishDetail