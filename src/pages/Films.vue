<template>
    <div class="row">
        <div v-if="errors.length">{{errors}}</div>
        <div class="col s6" v-if="films && films.length" v-for="film in films" :key="film.id">
            <div class="card horizontal">
                <div class="card-image">
                    <img v-if="film.field_film_image.length" :src="film.field_film_image[0].url">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <h2>{{film.title[0].value}} - id : {{film.nid[0].value}}</h2>
                        <div v-html="film.body[0].processed"></div>
                    </div>
                    <div class="card-action">
                        <router-link :to="{name: 'films.detail', params: {id: film.nid[0].value}}"><a>En savoir plus</a></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let apiURL = "http://localhost:8888/_LABO/drupal-and-vue/drupal-8/api/films"
export default {
  data() {
    return {
      films: [],
      errors: []
    };
  },
  created() {
    this.$http
      .get(apiURL)
      .then(response => {
        this.films = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });

    // async / await version (created() becomes async created())
    //
    // try {
    //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
    //   this.posts = response.data
    // } catch (e) {
    //   this.errors.push(e)
    // }
  }
};
</script>

