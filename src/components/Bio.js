import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import like_no from "../assets/like_no.png"
import like_yes from "../assets/like_yes.png"
import { connect } from 'react-redux';
import '../css/Bio.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GridItem = (props) => (
      <div className="grid__flex_album">
        <img className="grid__img_album" src={props.image} alt='album'/>
            <p style={{marginTop: '5px'}}>{props.name}</p>
            <p style={{marginTop: '-14px'}}>{props.date}</p>
      </div>
  )

class Bio extends Component {

    notifyAdd = (artist) => toast( artist.name + " has been added to your favorites !");
    notifyDelete = (artist) => toast( artist.name + " has been deleted from your favorites !");

    addToMyFavList = (artist) => {
        let i = 0;
        let value = 0;
        if (this.props.ArtistsFav.favorites.length > 0)
        {
            while (i < this.props.ArtistsFav.favorites.length && value === 0){
                if (this.props.ArtistsFav.favorites[i].mbid === artist.mbid)
                value += 1
                i += 1
            }
            if (value === 0)
            {
                this.notifyAdd(artist)
                const action = { type: 'ADD_ON_FAV', artistInfos: artist};
                this.props.dispatch(action);
            }
            if (value !== 0)
            {
                this.notifyDelete(artist)
                const action = { type: 'REMOVE_FROM_FAV', artistPosition: i-1};
                this.props.dispatch(action);
            }
        }
        else if (this.props.ArtistsFav.favorites.length === 0)
        {
            this.notifyAdd(artist)
            const action = { type: 'ADD_ON_FAV', artistInfos: artist};
            this.props.dispatch(action);
        }
    }

    favOrNot = (artist) => {
        let i = 0;
        let value = 0;
        if (this.props.ArtistsFav.favorites.length > 0)
        {
            while (i < this.props.ArtistsFav.favorites.length && value === 0){
                if (this.props.ArtistsFav.favorites[i].mbid === artist.mbid)
                value += 1
                i += 1
            }
            if (value === 0)
            {
                return (like_no)
            }
            if (value !== 0)
            {
                return (like_yes)
            }
        }
        else if (this.props.ArtistsFav.favorites.length === 0)
        {
            return (like_no)
        }
    }

    checkTags = (artist) => {
        let i = 0;
        while (i < 4 && artist.tags.nodes !== 'undefined' && artist.tags.nodes.length > i ){
            i += 1;
        }
        if (i > 3)
            return (artist.tags.nodes[0].name + ', ' +  artist.tags.nodes[1].name + ', ' +  artist.tags.nodes[2].name + ', ' +  artist.tags.nodes[3].name )
        else if (i > 2)
            return (artist.tags.nodes[0].name + ', ' +  artist.tags.nodes[1].name + ', ' +  artist.tags.nodes[2].name)
        else if (i > 1)
            return (artist.tags.nodes[0].name + ', ' +  artist.tags.nodes[1].name)
        else if (i > 0)
            return (artist.tags.nodes[0].name)
        else 
            return ('--')
    }

    render () {
        const {artist} = this.props.location.state
        return(
            <Fragment>
            <div className='section'>
                <img src={artist.fanArt.backgrounds.length > 0 ? artist.fanArt.backgrounds[0].url : 'https://nsa40.casimages.com/img/2019/02/25/190225081050657766.jpg'} className='imageBackground' alt='background'/>
                <img src={this.favOrNot(artist)} alt='my_like' onClick= {() => this.addToMyFavList(artist)} className='imageLike'/>
                <ToastContainer autoClose={3000} className='toastPopup'/>
                <table className='table'>
                <tr>
                    <td className='casTabLeft'>Name :</td>
                    <td className='casTabRight'>{artist.name}</td>
                </tr>
                <tr>
                    <td className='casTabLeft'>Birth :</td>
                    <td className='casTabRight'>{artist.lifeSpan.begin === null ? '--' : artist.lifeSpan.begin}</td>
                </tr>
                <tr>
                    <td className='casTabLeft'>Death :</td>
                    <td className='casTabRight'>{artist.lifeSpan.end === null ? '--' : artist.lifeSpan.end}</td>
                </tr>
                <tr>
                    <td className='casTabLeft'>Country :</td>
                    <td className='casTabRight'>{artist.country === null ? '--' : artist.country}</td>
                </tr>
                <tr>
                    <td className='casTabLeft'>Gender :</td>
                    <td className='casTabRight'>{artist.gender === null ? '--' : artist.gender}</td>
                </tr>
                <tr>
                    <td className='casTabLeft'>Disambiguation :</td>
                    <td className='casTabRight'>{artist.disambiguation === null ? '--' : artist.disambiguation}</td>
                </tr>
                <tr>
                    <td className='casTabLeft'>Tags :</td>
                    <td className='casTabRight'>{this.checkTags(artist)}</td>
                </tr>
                <tr>
                    <td className='casTabLeft'>Rating :</td>
                    <td className='casTabRight'>{artist.rating.value === null ? '--' : artist.rating.value}</td>
                </tr>
                </table>
                <hr/>
                <p>works :</p>
                <div className="grid_album">
              {artist.releaseGroups.nodes.map(item => (
                <GridItem key={item.title} image={item.coverArtArchive.images.length > 0 ? item.coverArtArchive.images[0].image : 'https://nsa40.casimages.com/img/2019/02/25/190225114242374303.jpg'} name={item.title} date={item.firstReleaseDate}/>
              ))}
              </div>
            </div>
            <Link to="/" style={{ textDecoration: 'none'}} className='back'>
                <p>back</p>
                </Link>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ArtistsFav: state.ArtistsFav,
  });
  
export default connect(mapStateToProps)(Bio);
