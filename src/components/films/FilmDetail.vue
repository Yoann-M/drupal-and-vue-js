<template>
    <div class="row">
        <div v-if="errors.length">{{errors}}</div>
        <div class="col s12">
            <a class="waves-effect waves-light btn" @click="$router.back()"><i class="material-icons left">replay</i>Retour</a>
        </div>
        <div class="col s12" v-if="loading">
            <div class="card horizontal">
                <div class="card-image">
                    <img v-if="film.field_film_image.length" :src="film.field_film_image[0].url">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <h2>{{film.title[0].value}} - id : {{film.nid[0].value}}</h2>
                        <div v-html="film.body[0].processed"></div><br>
                        <p v-if="film.field_date_de_sortie.length">Date de sortie : {{film.field_date_de_sortie[0].value}}</p><br>
                        <p v-if="film.field_realisateur.length">Réalisateur : {{film.field_realisateur[0].value}}</p><br>
                        <p v-if="film.field_acteurs.length">Acteurs : <span v-for="acteur in film.field_acteurs" :key="acteur.id">{{acteur.value}}, </span> </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "FilmDetail",
  data() {
    return {
      film: [],
      errors: [],
      loading: false,
    }
  },
  mounted() {
    this.$http
      .get(this.$drupal.url + `/api/films/` + this.$route.params.id) 
      .then(response => {
        // JSON responses are automatically parsed.
        this.film = response.data[0];
        this.loading = true;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {}
};
</script>

