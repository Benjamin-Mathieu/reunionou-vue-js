<template>
    <div>
        <div id="map"></div>
            <div>Titre: {{title}}</div>
            <div>Description: {{description}}</div>
            <div>Adresse: {{adress}}</div>
            <div>Créateur: {{creator}}</div>
            <div>Date: {{date}}</div>
    </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from '../assets/logo.png';
// import icon from 'leaflet/dist/images/marker-icon.png';

export default {
    data() {
        return {
            title: '',
            description: '',
            adress: '',
            creator: '',
            date: ''
        }
    },
    mounted() {
        this.getEvent();
        this.$bus.$on('getEvent', this.getEvent);

        console.log(this.$store.state.jwtToken)
    },
    methods: {
        getEvent() {
            api.get("/events/" + this.$route.params.id + "?token=" + this.$route.query.token, {
                headers: {
                    "Authorization": "Bearer " + this.$store.state.jwtToken
                }
            }).then(response => {
                console.log(response.data.event)
                this.title = response.data.event.title
                this.description = response.data.event.description
                this.adress = response.data.event.adress
                this.creator = response.data.event.creator.firstname
                this.date = response.data.event.date

                // Affichage de la carte
                api_adress.get("/search/?q=" + this.adress.replaceAll(" ", "+")).then(res => {
                    // console.log(res.data.features[0].geometry.coordinates[0])
                    let latitude = res.data.features[0].geometry.coordinates[1];
                    let longitude = res.data.features[0].geometry.coordinates[0];
                    console.log(latitude, longitude);
                    let map = L.map("map").setView([latitude, longitude], 15);
                
                    let openStreetMapLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors',
                        maxZoom: 100,
                        tileSize: 512,
                        zoomOffset: -1
                        });

                    let DefaultIcon = L.icon({
                        iconUrl: icon,
                        iconSize:     [50, 95], // size of the icon
                        iconAnchor: [25,95]
                    });
                    L.Marker.prototype.options.icon = DefaultIcon;

                    let marker = L.marker([latitude, longitude]).addTo(map);
                    // marker.bindPopup("<b>Lieu de l'évènement</b>").openPopup();
                    map.addLayer(openStreetMapLayer);
                })

            }).catch(error => {
                alert(error.response.data.message)
            })
        },

        getMap() {
            console.log(adress);
        }
    }
}
</script>

<style lang="scss" scoped>
    #map {
            height: 400px; width: 100%;
        }
        .leaflet-default-icon-path {
    background-image: url(https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png);
}
</style>