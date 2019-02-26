import React, { Component, Fragment } from 'react';
import '../css/GridArtists.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import like_no from "../assets/like_no.png"

const GridItem = (props) => (
  <Link style={{ textDecoration: 'none' }} to={{ pathname: '/bio' , state: {artist: props.artist} }}>
    <div
        className="grid__flex">
      <img className="grid__img" src={props.image} alt='artist'/>
      <p style={{marginTop: '5px'}}>{props.name}</p>
    </div>
  </Link>
)

class GridHome extends Component {
  state = {
    error: null,
    items: [],
  }

  favOrNot = () => {
    return (like_no)
  }

  getArtists = async (query, variables) => {
    try {
      const response = await axios.post('https://graphbrainz.herokuapp.com', {
        query,
        variables
      });

      const action = { type: 'UPDATE_ITEMS_LIST', new_itemsList: response.data.data.search.artists.nodes};
      this.props.dispatch(action);
    } 
    catch (error) {
      this.setState(() => ({ error }))
    }
  }

   searchYourArtist = () => {
    const query = `
    query FindYourArtist ($nameArtist: String!) {
      search {
        artists(query: $nameArtist, first: 20) {  
            nodes {
              mbid
              name
              country
              gender
              disambiguation
              rating {
                value
              }
              fanArt {
                thumbnails {
                  url
                }
                backgrounds {
                  url
                }
              }
              lifeSpan {
                begin
                end
              }
              tags {
                nodes {
                  name
                }
              }
              releaseGroups {
                nodes {
                  title
                  firstReleaseDate
                  coverArtArchive {
                    images {
                      image
                    }
                  } 
                }
              }
            }
        }
      }
    }  
    `;
    const variables = { nameArtist: this.props.SearchedArtist.searchedArtist};
    if (this.props.SearchedArtist.searchedArtist !== "")
      this.getArtists(query, variables)
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.SearchedArtist.searchedArtist !==  prevProps.SearchedArtist.searchedArtist) {
      this.searchYourArtist()
    }
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <div>{error.message}</div>;
    } 
    else if (this.props.SearchedArtist.searchedArtist === "") {
      return (
        <Fragment>
          <p className="textField">Favorites :</p>
          <div className="grid">
              {this.props.ArtistsFav.favorites.map(item => (
                <GridItem key={item.mbid} image={item.fanArt.thumbnails.length > 0 ? item.fanArt.thumbnails[0].url : 'https://nsa40.casimages.com/img/2019/02/23/190223013140682224.jpg'} name={item.name} artist={item}/>
              ))}
              </div>
        </Fragment>
        )
    }
    else {
      return (
           <Fragment>
              <p className="textField">Results :</p>
              <div className="grid">
                {this.props.ItemsList.itemsList.map(item => (
                <GridItem key={item.mbid} image={item.fanArt.thumbnails.length > 0 ? item.fanArt.thumbnails[0].url : 'https://nsa40.casimages.com/img/2019/02/23/190223013140682224.jpg'} name={item.name} artist={item} />
              ))}
              </div>
              <hr></hr>
              <p className="textField">Favorites :</p>
              <div className="grid">
              {this.props.ArtistsFav.favorites.map(item => (
                <GridItem key={item.mbid} image={item.fanArt.thumbnails.length > 0 ? item.fanArt.thumbnails[0].url : 'https://nsa40.casimages.com/img/2019/02/23/190223013140682224.jpg'} name={item.name} artist={item}/>
              ))}
              </div>
            </Fragment>
      );
    }
  }
}
const mapStateToProps = state => ({
  ArtistsFav: state.ArtistsFav,
  SearchedArtist: state.SearchedArtist,
  ItemsList: state.ItemsList,
});

export default connect(mapStateToProps)(GridHome);