<template>
  <div>
    <v-container fluid class="ma-0">
      <GmapMap
        ref="myGmap"
        :center="{ lat: this.lat, lng: this.lng }"
        :zoom="15"
        :clickable="true"
        map-type-id="terrain"
        style="width: 100%; height: 600px"
        :options="{
          streetViewControl: false,
        }"
      >
        <GmapMarker
          ref="map"
          v-for="(marker, index) in markers"
          :key="index"
          :position="marker.position"
          :clickable="true"
          @click="toggleInfoWindow(marker, index)"
          :mouseover="marker.info"
        />

        <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen = false"
        >
          <div v-html="infoContent"></div>
        </gmap-info-window>
      </GmapMap>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { usersCollection } from '../firebase';
export default {
  name: 'Gmap',
  data() {
    return {
      lat: -37.795884554056265,
      lng: 145.2485934291379,
      markers: [],
      infoContent: '',
      currentMidx: null,
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  computed: {},
  methods: {
    toggleInfoWindow: function(marker, idx) {
      console.log('Markers Array: ', this.markers);
      this.infoWindowPos = marker.position;
      console.log('Window: ', marker);
      this.infoContent = this.getInfoWindowContent(marker);

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    getInfoWindowContent: function(marker) {
      console.log('info: ', marker.info);
      return `<div class="card">
        <p class="title">${marker.info}</p>
      </div>
    `;
    },
  },
  mounted() {
    const isLoggedIn = firebase.auth().currentUser;

    if (isLoggedIn) {
      this.loggedIn = true;
      console.log('user: ', isLoggedIn.uid);
    }
    // get user geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          console.log(this.lat, this.lng);

          usersCollection
            .where('id', '==', isLoggedIn.uid)
            .get()
            .then(snapshot => {
              console.log(snapshot);
              snapshot.forEach(doc => {
                console.log('doc id: ', doc.id);
                usersCollection.doc(doc.id).update({
                  geolocation: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                  },
                });
                //add new user's geolocation to markers array
                this.markers.push({
                  position: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                  },
                  info: doc.data().alias,
                });
              });
            });
        },
        error => {
          console.log(error);
        },
        { maximumAge: 60000, timeout: 3000 }
      );
    }
  },
  created() {
    usersCollection.get().then(users => {
      users.docs.forEach(doc => {
        const data = doc.data();
        if (data.geolocation) {
          this.markers.push({
            position: {
              lat: data.geolocation.lat,
              lng: data.geolocation.lng,
            },
            info: data.alias,
          });
        }
        console.log('Markers: ', this.markers);
      });
    });
  },
};
</script>

<style scoped></style>
