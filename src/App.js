import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import logo from './logo.svg';
// import './components/flat.css';
import './App.css';
import Flat from './components/flat';
import Marker from './components/marker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      allFlats:[],
      selectFlat: null,
      search: ""
    };
  }

componentDidMount() {
  const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
  fetch(url) //Ajax
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
      this.setState({
        flats: data,
        allFlats: data
      })
    })
}

selectFlat = (flat) => {
  console.log(flat)
  this.setState({
    selectFlat: flat
  })
  
}

handleSearch = (event) => {
  this.setState({
    search: event.target.value,
    flats: this.state.allFlats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))
  });
}


  render() {
    // const flat =  {
    //   "id": 148,
    //   "name": "Trendy Apt in Buttes Montmartre",
    //   "imageUrl": "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/images/flat2.jpg",
    //   "price": 200,
    //   "priceCurrency": "$",
    //   "lat": 48.885707,
    //   "lng": 2.343543
    // };

    // const flats = [ flat, flat, flat, flat ];

  

    let center = {
      lat: 48.8566,
      lng: 2.3522
    }

    if (this.state.selectFlat) {
      center = {
        lat: this.state.selectFlat.lat,
        lng: this.state.selectFlat.lng
      }
    }

    return (
      <div className="app">
        <div className="main">
            <div className="search">
              < input
                  type="text"
                  placeholder="Search..."
                  value={this.state.search}
                  onChange={this.handleSearch}
                />
            </div>
            <div className="flats">
              {/* Not Dynamic */}
              {/* <Flat flat={flat} />
              <Flat flat={flat} />
              <Flat flat={flat} /> */}

              {/* Dynamic ES5 */}
              {/* {flats.map(function(flat) {
                return <Flat flat={flat} />
              }
              )} */}


              {/* Dynamic ES6 */}
              {this.state.flats.map((flat) => {
                return <Flat 
                key={flat.name} 
                flat={flat} 
                selectFlat={this.selectFlat} />
              }
              )}
            </div>
          </div>
        <div className="map">
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
            
                center={center}
                zoom={16} >
                
                {this.state.flats.map((flat) => {
                return <Marker 
                key={flat.name} 
                lat={flat.lat} 
                lng={flat.lng} 
                text={"$" + flat.price} 
                selected={flat === this.state.selectFlat} />
              })} 

            </GoogleMapReact>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
