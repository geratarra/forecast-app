import React, { Component } from 'react';
import {
    Alert,
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image
} from 'react-native';

class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            forecast: {
                main: 'Clouds',
                description: 'Few clouds',
                temp: '45.7'
            }
        };
    }

    render() {
        return (
            <View>
                <Text style={styles.bigText}>
                    {this.props.main}
                </Text>
                <Text style={styles.bigText}>
                    Current conditions: {this.props.description}
                </Text>
                <Text style={styles.bigText}>
                    {this.props.temp}
                </Text>
            </View>
        );
    }
}

class forecast_react extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            forecast: null
        };
        this._handleTextChange = this._handleTextChange.bind(this);
    }

    _handleTextChange(event) {
        var cityName = event.nativeEvent.text;
        if (cityName !== '') {
            this.setState({cityName: cityName});
            fetch('http://api.openweathermap.org/data/2.5/weather?q='
                + cityName + '&units=metric&appid=ae8a60a3a1f6085bd401deed5686b833')
                .then((response) => response.json())
                .then((responseJSON) => {
                    this.setState({
                        forecast: {
                            main: responseJSON.weather[0].main,
                            description: responseJSON.weather[0].description,
                            temp: responseJSON.main.temp
                        }
                    });
                })
                .catch((error) => {
                    console.warn(error);
                });
        } else {
            Alert.alert("Error", "Write the name of a city");
        }

    }

    render() {
        var content = null;
        if (this.state.forecast !== null) {
            content = <Forecast
                        main={this.state.forecast.main}
                        description={this.state.forecast.description}
                        temp={this.state.forecast.temp}/>;
            }

        return (
            <View style={styles.container}>
                <Image
                    resizeMode='cover'
                    source={require('./img/ecuador-weather-1.jpg')}
                    style={styles.backdrop}>
                    <View style={styles.overlay}>
                        <View>
                            <Text style={styles.mainText}>
                                Current weather for:
                            </Text>
                            <View style={styles.zipContainer}>
                                <TextInput
                                    placeholder="City name"
                                    style={[styles.zipCode, styles.mainText]}
                                    returnKeyType='go'
                                    onSubmitEditing={this._handleTextChange}/>
                            </View>
                        </View>
                        {content}
                    </View>
                </Image>
            </View>
        );
    }
}

var baseFontSize = 16;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column'
    },
    overlay: {
        paddingTop: 50,
        marginTop: 50,
        alignItems:'center',
        backgroundColor: 'rgb(0, 0, 0)',
        opacity: .5,
        flexDirection: 'column'
    },
    mainText: {
        flex: 1,
        fontSize: baseFontSize,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    zipContainer: {
        flex: 1,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingBottom: 10
    },
    zipCode: {
        width: 150,
        paddingTop: 8,
        alignItems: 'center'
    },
    bigText: {
        fontSize: baseFontSize + 4,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff'
    }
});

AppRegistry.registerComponent('forecast_react', () => forecast_react);
