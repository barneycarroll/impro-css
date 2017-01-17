// Manage layout changes globally instead of per-instance
const instanceLayouts = new Map()

const updateLayouts = () =>
  [ ...instanceLayouts ].map( ( [ instance, layout ] ) => layout() )

window.addEventListener( 'resize', new function(){
  let frame

  return () => {
    if( instanceLayouts.size === 0 )
      return

    cancelAnimationFrame( frame )

    frame = requestAnimationFrame( updateLayouts )
  }
}() )

customElements.define( 'progress-bar', class ProgressBar extends HTMLElement {
  static get observedAttributes(){
    return [ 'data-measure' ]
  }

  connectedCallback(){
    this.connected = true

    instanceLayouts.set( this, () =>
      this.layout()
    )

    if( !this.initialised ){
      const measure = this.getAttribute( 'data-measure' )

      this.querySelector( '.indicator' ).insertAdjacentHTML(
        'beforeend',
        `
        <span class="floating">
          <span class="measure before">
            &nbsp;${ measure }%&nbsp;
          </span>
          <span class="measure after">
            &nbsp;${ measure }%&nbsp;
          </span>
        </span>
        `
      )

      this.initialised = true
    }


    this.layout()
  }

  disconnectedCallback(){
    instanceLayouts.delete( this )
  }

  attributeChangedCallback( name, value ){
    if( !this.connected )
      return

    if( name === 'data-measure' ){
      [ ...this.querySelectorAll( '.measure' ) ].map( el =>
        el.textContent = '&nbsp;' + value + '% &nbsp;'
      )

      this.querySelector( '.indicator' ).style.width = value + '%'

      this.layout()
    }
  }

  layout(){
    const outer  = this.clientWidth
    const figure = this.querySelector( '.measure' ).clientWidth
    const label  = this.querySelector( '.label' ).clientWidth
    const bar    = this.querySelector( '.indicator' ).clientWidth

    const measures = [ ...this.querySelectorAll( '.measure' ) ];

    const reveal = (
        bar === label          ? 0 :
        outer - bar   > figure ? 2 :
        bar   - label > figure ? 1 :
                                0
    )

    measures.slice( 0, -1 ).map( ( el, index ) =>
      el.style.display = index === reveal ? 'initial' : 'none'
    )
  }
} )
