import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {hashHistory} from 'react-router';
import mutation from '../../mutations/Signup';
import query from '../../queries/CurrentUser';
import AuthForm from './AuthForm';

class SignupForm extends Component{

    constructor(props){
        super(props);
        this.state = {errors:[]};
    }

    componentWillUpdate(nextProps){

        if(!this.props.data.user && nextProps.data.user)
            hashHistory.push('/dashboard');

    }
    onSubmit({email, password}){
        console.log(email);
        this.props.mutate({
          variables:{email,password},
          refetchQueries:[{query}]
        }).catch(res=>{
            console.log(res);
           const errors = res.graphQLErrors.map(error => error.message);
            this.setState({errors});
        });
    }
    render(){
        return(
            <div>
              <h3>Signup</h3>
              <AuthForm  onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} />  
            </div>
        )

        
    }
}

export default graphql(query)(
            graphql(mutation)(SignupForm));
