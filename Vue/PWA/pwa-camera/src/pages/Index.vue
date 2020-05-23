<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col">Model: {{ model }}</div>
      <div class="col">Manufacturer: {{ manufacturer }}</div>
      <div class="col">Platform: {{ platform }}</div>
      <div class="col">OS: {{ os }}</div>
      <div class="col">UUID: {{ uuid }}</div>
      <div class="col">Geolocation: {{ lat }}, {{ lng }}</div>
    </div>
    <div class="absolute-bottom">
      <q-img
        native-context-menu
        height="300px"
        width="300px"
        :src="imgSource"
      />
      <q-btn
        round
        size="large"
        icon="mdi-camera"
        color="primary"
        @click="takePhoto"
      />
    </div>
  </q-page>
</template>

<script>
import { CameraResultType, CameraSource, Plugins } from "@capacitor/core";

const { Device, Camera, Geolocation, Toast } = Plugins;
export default {
  name: "PageIndex",
  data() {
    return {
      model: "Please wait...",
      manufacturer: "Please wait...",
      platform: "Please wait...",
      os: "Please wait....",
      uuid: "Please wait...",
      position: "Determining",
      lat: "",
      lng: "",
      imgSource: ""
    };
  },
  methods: {
    async getCurrentPosition() {
      await Geolocation.getCurrentPosition()
        .then(position => {
          console.log("Current position: ", position);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log("lat/lng: ", this.lat, this.lng);
        })
        .catch(error => console.log("An error has occured: ", error.message));
    },
    async takePhoto() {
      const isAvailable = Capacitor.isPluginAvailable("Camera");
      if (!isAvailable) {
        console.log("Camera is not available!!");
      } else {
        await Camera.getPhoto({
          quality: 100,
          allowEditing: true,
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt,
          saveToGallery: true
        })
          .then(image => {
            this.imgSource = image.webPath;
          })
          .catch(error => {
            console.log("camera error: ", error);
            Toast.show({
              text: "Error loading camera!" + " " + error
            });
          });
      }
    }
  },
  mounted() {
    this.getCurrentPosition();

    Device.getInfo().then(info => {
      this.model = info.model;
      this.manufacturer = info.manufacturer;
      this.platform = info.platform;
      this.os = info.operatingSystem;
      this.uuid = info.uuid;
    });
  }
};
</script>

<style></style>
