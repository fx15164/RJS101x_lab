import React from "react";

import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import Loading from "./LoadingComponent";

function RenderCard({item, isLoading, errMess}) {
	if (isLoading) {
		return <Loading />
	} else if (errMess) {
		return <h4>{errMess}</h4>
	}
    return(
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
            <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );

}

function Home({ leader, dish, promotion, dishesLoading, errMess }) {
    
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={dish} isLoading={dishesLoading} errMess={errMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;
