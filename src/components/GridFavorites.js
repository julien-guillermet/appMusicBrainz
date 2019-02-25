import React, { Component, Fragment } from 'react';
import '../css/GridArtists.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const GridItem = (props) => (
    <Link style={{ textDecoration: 'none' }} to={{ pathname: '/bio' , state: {artist: props.artist} }}>
      <div
          className="grid__flex">
        <img className="grid__img" src={props.image} alt='artist'/>
        <p>{props.name}</p>
      </div>
    </Link>
  )

class GridFavorites extends Component {
    render() {
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
}

const mapStateToProps = state => ({
    ArtistsFav: state.ArtistsFav,
    SearchedArtist: state.SearchedArtist,
    ItemsList: state.ItemsList,
  });
  
  export default connect(mapStateToProps)(GridFavorites);