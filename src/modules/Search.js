import $ from 'jquery'

class Search {
  // 1. descrive and create our object
  constructor() {
    this.resultsDiv = $("#search-overlay__results")
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close")
    this.searchOverlay = $(".search-overlay")
    this.searchInput = $(".search-term")
    this.events();
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typingTimer;
  }

  // 2. events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this))
    this.closeButton.on("click", this.closeOverlay.bind(this))
    $(document).on("keydown", this.keyPressDispatcher.bind(this))
    this.searchInput.on("keyup", this.typingLogic.bind(this))
  }

  //. methods (functions)
  
  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active")
    $("body").addClass("body-no-scroll")
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active")
    $("body").removeClass("body-no-scroll")
    this.isOverlayOpen = false;
  }

  keyPressDispatcher(e) {
    if(e.keyCode === 83 && !this.isOverlayOpen && !$('input, textarea').is(':focus')) {
      this.openOverlay()
    }
    if(e.keyCode === 27 && this.isOverlayOpen) {
      this.closeOverlay()
    }
  }

  getResults() {
    $.getJSON(`http://localhost/fictional-university/wp-json/wp/v2/posts?search=${this.searchInput.val()}`, (posts) => {
      this.resultsDiv.html(`
        <h2 class="search-overlay__section-title">General Information</h2>
        <ul class="link-list min-list">
          ${posts.map(item => `<li><a href="${item.link}">${item.title.rendered}</a></li>`)}
        </ul>
      `)
    });
  }

  typingLogic() {
    if(this.searchInput.val() !== this.previousValue) {
      clearTimeout(this.typingTimer)

      if(this.searchInput.val()) {
        if(!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>')
          this.isSpinnerVisible = true
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 2000)
      } else {
        this.resultsDiv.html('')
        this.isSpinnerVisible = false
      }
    }
    
    this.previousValue = this.searchInput.val();
  }
}

export default Search