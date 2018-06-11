<template>
  <nav>
    <div class="nav-wrapper">
      <div class="container">
        <a href="#" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link :to="{name: 'root'}" tag="li" exact><a>Accueil</a></router-link>
          <router-link :to="{name: 'films'}" tag="li"><a>Films</a></router-link>
          <router-link :to="{name: 'create-film'}" tag="li"><a>Ajouter un film</a></router-link>
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
          <li><a href="collapsible.html">JavaScript</a></li>
        </ul>
    </div>
    </div>
  </nav>
</template>
