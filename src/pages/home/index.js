/* @flow */

import React, { Component } from 'react';
import {
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  iataOriginChanged,
  iataDestinyChanged,
  dateDepartureChanged,
  dateArrivalChanged,
  amountPeopleChanged,
  searchTickets,
} from './actions';

import styles from './styles';
import { metrics } from '../../styles';

import Input from '../../components/input';
import Button from '../../components/button';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    iataOriginChanged: PropTypes.func.isRequired,
    iataDestinyChanged: PropTypes.func.isRequired,
    dateDepartureChanged: PropTypes.func.isRequired,
    dateArrivalChanged: PropTypes.func.isRequired,
    amountPeopleChanged: PropTypes.func.isRequired,
    searchTickets: PropTypes.func.isRequired,
    iataOrigin: PropTypes.string.isRequired,
    iataDestiny: PropTypes.string.isRequired,
    dateDeparture: PropTypes.string.isRequired,
    dateArrival: PropTypes.string.isRequired,
    amountPeople: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  onIataOriginChange = (text) => {
    this.props.iataOriginChanged(text);
  }

  onIataDestinyChange = (text) => {
    this.props.iataDestinyChanged(text);
  }

  onDateDepartureChange = (text) => {
    this.props.dateDepartureChanged(text);
  }

  onDateArrivalChange = (text) => {
    this.props.dateArrivalChanged(text);
  }

  onAmountPeopleChange = (number) => {
    this.props.amountPeopleChanged(number);
  }

  onSearchButtonPress = () => {
    this.props.searchTickets(this.props.home);
  }

  isValid() {
	  let valid = this.refs['myDateText'].isValid()

		let rawValue = this.refs['myDateText'].getRawValue()
	}

  render() {
    const {
      container,
      bannerContainer,
      bannerImg,
      formContainer,
      dateContainer,
    } = styles;

    const {
      iataOrigin,
      iataDestiny,
      dateDeparture,
      dateArrival,
      amountPeople,
      loading,
      flights,
    } = this.props;

    if (flights) {
      this.props.navigation.navigate('tickets', { data: this.props.flights });
    }

    return (
      <View style={container}>
        <View style={bannerContainer}>
          <Image style={bannerImg} source={require('../../../assets/img/banner.png')} />
        </View>

        <View style={formContainer}>
          <Input
            placeholder="IATA Origem"
            onChangeText={this.onIataOriginChange}
            value={iataOrigin}
            autoCorrect={false}
            maxLength={3}
            autoCapitalize="characters"
          />

          <Input
            placeholder="IATA Destino"
            onChangeText={this.onIataDestinyChange}
            value={iataDestiny}
            autoCorrect={false}
            maxLength={3}
            autoCapitalize="characters"
          />

          <View style={dateContainer}>
            <Input
              inputStyle={{ width: metrics.screenWidth * 0.43 }}
              placeholder="Data de ida"
              onChangeText={this.onDateDepartureChange}
              value={dateDeparture}
            />
            <Input
              inputStyle={{ width: metrics.screenWidth * 0.43 }}
              placeholder="Data de volta"
              onChangeText={this.onDateArrivalChange}
              value={dateArrival}
            />
          </View>

          <Input
            placeholder="Quantidade de passageiros"
            onChangeText={this.onAmountPeopleChange}
            value={amountPeople}
            keyboardType="numeric"
          />

          {
            loading
              ? <ActivityIndicator size="large" color="#1abc9c" />
              : (
                <Button
                  title="Pesquisar passagem"
                  onPress={this.onSearchButtonPress}
                />
              )
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ home }) => {
  const {
    iataOrigin,
    iataDestiny,
    dateDeparture,
    dateArrival,
    amountPeople,
    loading,
    flights,
    error,
  } = home;
  return {
    iataOrigin,
    iataDestiny,
    dateDeparture,
    dateArrival,
    amountPeople,
    loading,
    flights,
    error,
    home,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    iataOriginChanged,
    iataDestinyChanged,
    dateDepartureChanged,
    dateArrivalChanged,
    amountPeopleChanged,
    searchTickets,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
