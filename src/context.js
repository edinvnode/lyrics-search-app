import React, { Component } from 'react';
import env from "react-dotenv";
import axios from "axios";

const Context = React.createContext();

const reducer = (state,action) => {
    switch(action.type){
        case "SEARCH_TRACKS":
        return {
            ...state,
            track_list: action.payload,
            headeing: "Search Results"
        }
        default:
            return state;
    }
}


export class Provider extends Component {

state = {
    track_list: [
   ],
    headeing: "Top 10 Tracks",
    dispatch: action => this.setState(state => reducer(state,action))
}



    
    componentDidMount(){
            axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=065ea616cdcfdd1dda4cf314dbc3fe80`)
            .then(res => {
                this.setState({track_list: res.data.message.body.track_list})
                //console.log(res.data)
            })
            .catch(err => console.log(err))
    }


  render() {
    return (
      <Context.Provider  value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;