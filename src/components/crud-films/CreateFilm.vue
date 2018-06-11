<template>
  <div class="row">
    <div class="col s12" v-if="errors.length">
      <div class="card red lighten-1">
        <div class="card-content white-text">
          <p v-if="errors.length" v-for="error in errors" :key="error.id">{{error}}</p>
        </div>
      </div>
    </div>
    <form class="col s12" v-on:submit.prevent="creerFilm()">
        <h1>Ajouter un film</h1>
      <div class="row">
        <div class="input-field col s6">
          <input v-model="titre" id="titre" type="text" class="validate">
          <label for="titre">Titre</label>
        </div>
        <div class="input-field col s6">
          <input v-model="realisateur" id="realisateur" type="text" class="validate">
          <label for="realisateur">Réalisateur</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s5">
          <input ref="acteur" v-model="acteur" id="acteurs" type="text" class="validate" v-on:keydown.enter.prevent="addActeur(acteur)"/>
          <label for="acteurs">acteurs</label>
           <ul class="collection" v-if="acteurs.length">
            <li class="collection-item" v-for="(acteur, index) of acteurs" :key="acteur.id">
                <div v-if="acteur">
                  {{acteur}} <a href="#!" class="secondary-content" @click.prevent="deteteActeur(index)"><i class="material-icons">close</i></a>
                </div>
            </li>
          </ul>
        </div>
        <div class="col s1">
          <a href="#" class="waves-effect waves-light btn" @click.prevent="addActeur(acteur)">+</a>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea v-model="body" id="body" class="materialize-textarea"></textarea>
          <label for="body">Body</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <button class="waves-effect waves-light btn" type="submit">Enregistrer</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      csrfToken: "",
      errors: [],
      titre: "",
      realisateur: "",
      body: "",
      acteurs: [],
      acteur: ""
    };
  },
  methods: {
    getCsrfToken() {
      this.$http
        .get(
          this.$drupal.url + "/rest/session/token"
        )
        .then(response => {
          // JSON responses are automatically parsed.
          this.csrfToken = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    creerFilm() {
      this.getCsrfToken()
      var data = {
        // Important pour communiquer avec Drupal link>type>href pour selectionner le type de contenu : ici films
        _links: {
          type: {
            href:
              this.$drupal.url + "/rest/type/node/films"
          }
        },
        type: {
          target_id: "films"
        },
        // On respecte les valeurs que l'on retrouve dans la réponse json d'un get de film
        title: { value: this.titre },
        field_realisateur: { value: this.realisateur },
        field_acteurs: this.acteurs,
        body: { value: this.body }
      };
      this.$http
        .post(
          this.$drupal.url + `/entity/node?_format=hal_json`,
          data,
          {
            headers: {
              Accept: "json",
              "Content-Type": "application/hal+json",
              Authorization: this.$drupal.authorization,
              'X-CSRF-Token': this.csrfToken
            }
          }
        )
        .then(response => {
          // JSON responses are automatically parsed.
          this.errors = response.data;
          this.$router.push("/films");
        })
        .catch(e => {
          this.errors.push(e.response.data.message);
        });
    },
    addActeur(newActeur) {
      if (newActeur) {
        this.acteurs.push(newActeur);
      }
      this.acteur = "";
      this.$refs.acteur.focus()
    },
    deteteActeur(index) {
      this.acteurs.splice(index, 1);
    }
  }
};
</script>
