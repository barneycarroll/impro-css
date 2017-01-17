# impro-css

I underestimated the complexity of this task and thought I could get away without a build step. I ended up caving in to PostCSS & cssnext ([nested selectors](https://tabatkins.github.io/specs/css-nesting/)) to make the CSS more manageable - [download the source](https://github.com/barneycarroll/impro-css/archive/submission.zip) & `npm run build` to see results, or [grab the built code](https://github.com/barneycarroll/impro-css/releases/download/submission/impro-css.zip).

I thought I'd keep it dependency-free and standards compliant to test myself in the absence of frameworks and keep it all 'above board' for review - I targeted latest Chrome.

***

## Review notes

Without any specific mobile requirements to go on I decided to collapse grids below a singular breakpoint (`45em`) when the layout no longer benefited from them. The header could have used a bit of imagination for small viewport layout, but I overran on getting the obvious challenges out of the way and decided to call it a day without spending any time on re-designing that.

The 'hero' and 'cards' (components with images) were a satisfying challenge. I'm particularly happy with how these collapse under excessive content or minimal space constraints.

What I missed in my original assessment of the task was the subtle complexity of the progress bars - the criteria for styling the percentage indicator - the design is intuitive to the eye but difficult to rationalise. This ended up taking most of a day, the majority of my time on the task. I decided to go for progressive enhancement (they'll look decent - albeit not as specified - without scripting) and deploy [custom elements](https://html.spec.whatwg.org/multipage/scripting.html#custom-elements) ([`<progress-bar>`](https://github.com/barneycarroll/impro-css/blob/master/src/scripts/components/progress-bar.js)). The experience wasn't great - using custom elements was clunkier than I expected (the lifecycle API isn't as elegant as it could be, especially when compared to virtual DOM / hyperscript idioms (React et al)), and none of the related APIs really make the biggest challenge in dynamic DOM development - ie graceful & predictable DOM manipualtion - any easier. If I were to start again I'd nip that idea in the bud and use [Mithril](https://github.com/lhorie/mithril.js/tree/rewrite/) to write less convoluted source code and produce less convoluted DOM.

The CSS isn't as elegant as it could be, but that's something I feel about pretty much every CSS codebase I see ;). There are inconsistent approaches WRT component style structure (composite class selectors vs BEM-like painstakingly specific hierarchical classnames) and separation of concerns. Given the nature of the small task without further context or more work to justify a more dogmatic approach I think the approach makes sense within the context of the codebase & scope of work.
