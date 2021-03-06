import React, { Component } from 'react';
import { Dimensions,StatusBar, Image, WebView, StyleSheet, Text, View } from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const { onScroll = () => { } } = this.props;

    return (
      <ParallaxScrollView
      
        onScroll={onScroll}
        headerBackgroundColor="#333"
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}

        renderBackground={() => (
          <View key="background">
            <Image style={{ height: window.height, width: window.width }} source={require('../Images/campus.jpg')} />
            <View style={{
              position: 'absolute',
              top: 0,
              width: window.width,
              backgroundColor: 'rgba(0,0,0,.4)',
              height: PARALLAX_HEADER_HEIGHT
            }} />
          </View>
        )}

        renderForeground={() => (
          <View key="parallax-header" style={styles.parallaxHeader}>
            <Image style={styles.avatar} source={require('../Images/logo.jpg')} />
            <Text style={styles.sectionSpeakerText}>
              OTAGO POLYTECHNIC
          </Text>
            <Text style={styles.sectionTitleText}>
              Te Kura Matatini ki Otago
          </Text>
            <Text style={styles.sectionTitleText}>
              scroll down
          </Text>
          </View>
        )}

        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Image style={{ height: 38, width: 40 }} source={require('../Images/logo_small.png')} /><Text style={styles.stickySectionText}>OTAGO POLYTECHNIC</Text>
          </View>
        )}
      >
      <StatusBar backgroundColor='#00121f' barStyle='light-content' />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <WebView
              source={{ html: "<p style='text-align: justify;'>Justified text here</p>" }}
            />
          </View>
          <Text style={styles.rowText}>
            Otago Polytechnic is proud to be a leader in high quality, career-focused education with some of the best student achievement and satisfaction results in New Zealand.Employers love our graduates because they are work-ready, confident and solution-focused. We believe our people make a better world and our alumni are global citizens who care about making a difference.We have been given the highest possible quality ratings from Government and, as educators, we offer innovative ways for our learners to study so they can build their capability and realise their potential.With online tools, blended delivery options and pathways from foundation through to postgraduate, time, distance and previous learning are no barriers to gaining the education you want. We can even give credit for knowledge gained in your career and now offer a digital micro-credentialing process where learners can be assessed and ‘show what they know’ without undertaking a formal qualification. Collaborations are at the heart of our philosophy for learning and growth and our commitment to sustainability plays a major role in everything we do, influencing both day-to-day operation and our future decision-making. We are also highly active in the field of applied research with our researchers and their students contributing to professional and community networks nationally and internationally
            </Text>
        </View>
      </ParallaxScrollView>
    );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = window.height;
const STICKY_HEADER_HEIGHT = 55;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004898'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#004898',
    padding: 10,
    flexDirection: 'row'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    justifyContent: 'center',
    textAlignVertical: 'center'
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    height: window.height / 4,
    width: window.height / 5
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 35,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 22,
    paddingVertical: 5
  },
  row: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  rowText: {
    fontSize: 18,
    fontWeight: '100',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Home;