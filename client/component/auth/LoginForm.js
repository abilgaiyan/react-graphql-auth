import React, {Component} from 'react';
import Authform from './AuthForm';
import {graphql} from 'react-apollo';
import mutation from '../../mutations/Login';
import query from '../../queries/CurrentUser';
import {hashHistory} from 'react-router';
class LoginForm extends Component{
    constructor(props){
        super(props);

        this.state = {errors:[]}

    }
    componentWillUpdate(nextProps){
        //this.props - the old, current set of props
        //nextProps - the next of props that will be in place when
        //the component rerender

        if (!this.props.data.user && nextProps.data.user){
            //rederect to dashborard
            hashHistory.push('/dashboard');
        }
    }
    onSubmit({email, password}){
        this.props.mutate({
            variables:{email, password},
            refetchQueries: [{query}]
        }).catch(res=>{
              console.log(res);
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({errors});
        }); 

    }
    render(){
        return (
            <div>
                <h3>Login</h3>
              <Authform  onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} />  
            </div>

        );
    }
}

export default graphql(query)( 
            graphql(mutation)(LoginForm)
        );
