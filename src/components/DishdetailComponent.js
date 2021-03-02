import React, { Component } from 'react';
import {
    Card, CardBody, CardImg, CardText,
    CardTitle
} from 'reactstrap';

 
    function renderDish({dish}) {
        return (
            <Card key={dish.id}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>)
    }

    function formatDate(string){
        var date = new Date(string)
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        return `${mo} ${da}, ${ye}`
    }

    function renderComments({comments}) {
        if (comments != null)
            return (
                <div>
                    <h4>Comments</h4>    
                    <ul  className="list-unstyled">
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



   const DishDetail =(props) =>  {
        console.log (props.dish)
        if (props.dish != null) {
        
            return (
                <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {renderDish(props)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {renderComments(props.dish)}
                    </div>
                </div>
                </div>
            );

        } else {
            return <div></div>
        }
        
    }


export default DishDetail