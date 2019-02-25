import React, { Component } from 'react';
import '../css/Header.css';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Header extends Component {

    handleChange(event) {
        const action = { type: 'UPDATE_SEARCHED_ARTIST', myString: event.target.value};
        this.props.dispatch(action);
      }

    render () {
        return(
            <section className='site-header'>
                    <div>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <h1 className="site-logo">
                                SWAPCARD-MUSIC
                            </h1>
                        </Link>
                    </div>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <h3 className="button_home">HOME</h3>
                        </Link>
                        <Link to="/fav" style={{ textDecoration: 'none' }}>
                            <h3 className="button_fav">FAVORITES</h3>
                        </Link>
                    <input type="text"  placeholder="Search..." className="search_bar" value={this.props.SearchedArtist.searchedArtist}
                    onChange={this.handleChange.bind(this)}
              />
            </section>
        )
    }
}

const mapStateToProps = state => ({
    SearchedArtist: state.SearchedArtist,
  });
  
  export default connect(mapStateToProps)(Header);