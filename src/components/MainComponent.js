import React,{Component} from 'react';
import Menu from "./MenuComponents";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Contactus from "./ContactComponent";
import Home from "./HomeComponent";
import DishDetails from "./DishdetailComponent";
import About from "./AboutComponent";
import {Switch,Route,Redirect,withRouter} from "react-router-dom";
import {actions} from "react-redux-form";
import {connect} from "react-redux";
import { postComment,fetchDishes,fetchComments,fetchPromos,fetchLeaders,postFeedback } from "../redux/ActionCreators";
import { TransitionGroup,CSSTransition } from "react-transition-group";

const mapDispatchToProps= dispatch=>({
  postComment:(dishId,rating,author,comment)=> dispatch(postComment(dishId,rating,author,comment)),
  postFeedback:(firstname,lastname,telnum,email,agree,contactType,message)=>dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
  fetchDishes:()=>dispatch(fetchDishes()),
  
  fetchComments:()=>dispatch(fetchComments()),
  fetchPromos:()=>dispatch(fetchPromos()),
  fetchLeaders:()=>dispatch(fetchLeaders())
  
})
const mapStateToProps = state => {
  console.log("AAj lgegi "+JSON.stringify(state.promotions))
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}


class Main extends Component {

  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  
  render(){

    const HomePage=()=>{

        return(
            <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
            dishesisloading={this.props.dishes.isloading}
            disheserrMsg={this.props.dishes.errMsg}
            promoLoading={this.props.promotions.isLoading}
            promoErrMess={this.props.promotions.errMess}
            leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
            leaderLoading={this.props.leaders.isLoading}
            leaderErrMess={this.props.leaders.errMess}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            />
        );
    }
    const DisplayDishID=({match})=>{
        return(
            <DishDetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            isloading={this.props.dishes.isloading}
            commentsErrMess={this.props.comments.errMess}
            errMsg={this.props.dishes.errMsg}
            postComment={this.props.postComment}/>
        );
    }
    return (
      <div className="App">
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
                <Route path="/Home" component={HomePage}></Route>
                <Route exact path="/Menu" component={()=><Menu dishes={this.props.dishes} />}></Route>
                <Route exact path="/contactus" component={()=><Contactus  postFeedback={this.props.postFeedback}/>}></Route>
                <Route path="/Menu/:dishId" component={DisplayDishID}></Route>
                <Route exact path="/aboutus" component={()=>< About leaders={this.props.leaders}/>}></Route>
                <Redirect to="/Home"></Redirect>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    );
  }
  
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
