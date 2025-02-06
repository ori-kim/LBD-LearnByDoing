export type StyleObject = Partial<CSSStyleDeclarationDetails>;

export const style = (value: StyleObject) => new Style(value);

export class Style {
  constructor(private value: StyleObject) {}

  toString() {
    return `style="${serializeObject(this.value)}"`;
  }
}

const serializeObject = (value: Object) => {
  return Object.entries(value)
    .map(([k, v]) => `${camelToKebab(k)}:${v}; `)
    .join('');
};

const camelToKebab = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

// CSSStyleDeclaration은 타입 정의가 디테일하지 않음...
interface CSSStyleDeclarationDetails {
  // Box Model
  margin?: string | number;
  marginTop?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  padding?: string | number;
  paddingTop?: string | number;
  paddingRight?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  border?: string;
  borderWidth?: string | number;
  borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
  borderColor?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRadius?: string | number;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  height?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  boxSizing?: 'content-box' | 'border-box';

  // Display & Positioning
  display?:
    | 'none'
    | 'block'
    | 'inline'
    | 'inline-block'
    | 'flex'
    | 'grid'
    | 'inline-flex'
    | 'inline-grid'
    | 'table'
    | 'table-row'
    | 'table-cell';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: number;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto';
  visibility?: 'visible' | 'hidden' | 'collapse';

  // Flexbox
  flex?: string | number;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
  flexGrow?: number;
  flexShrink?: number;

  // Grid
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
  gridColumnGap?: string | number;
  gridRowGap?: string | number;
  gridGap?: string | number;
  gridColumn?: string;
  gridRow?: string;
  gridArea?: string;
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  placeItems?: string;
  placeSelf?: string;

  // Typography
  color?: string;
  fontFamily?: string;
  fontSize?: string | number;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  fontVariant?: 'normal' | 'small-caps' | string;
  lineHeight?: string | number;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through' | string;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  letterSpacing?: string | number;
  wordSpacing?: string | number;
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap';
  textOverflow?: 'clip' | 'ellipsis' | string;

  // Background
  background?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: 'auto' | 'cover' | 'contain' | string;
  backgroundPosition?: string;
  backgroundRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | string;
  backgroundAttachment?: 'scroll' | 'fixed' | 'local';

  // Border & Outline
  outline?: string;
  outlineWidth?: string | number;
  outlineStyle?: 'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
  outlineColor?: string;

  // Animation
  animation?: string;
  animationName?: string;
  animationDuration?: string | number;
  animationTimingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
  animationDelay?: string | number;
  animationIterationCount?: 'infinite' | number;
  animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  animationFillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  animationPlayState?: 'running' | 'paused';

  // Transform
  transform?: string;
  transformOrigin?: string;
  transformStyle?: 'flat' | 'preserve-3d';
  perspective?: string | number;
  perspectiveOrigin?: string;

  // Transition
  transition?: string;
  transitionProperty?: string;
  transitionDuration?: string | number;
  transitionTimingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
  transitionDelay?: string | number;

  // Misc
  cursor?: string;
  opacity?: number;
  boxShadow?: string;
  textShadow?: string;
  filter?: string;
  clipPath?: string;
  pointerEvents?: 'auto' | 'none';
  content?: string;
  quotes?: string;
  counterReset?: string;
  counterIncrement?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  objectPosition?: string;
  listStyle?: string;
  listStyleType?:
    | 'disc'
    | 'circle'
    | 'square'
    | 'decimal'
    | 'decimal-leading-zero'
    | 'lower-roman'
    | 'upper-roman'
    | 'lower-greek'
    | 'lower-alpha'
    | 'upper-alpha'
    | 'none';
  listStylePosition?: 'inside' | 'outside';
  listStyleImage?: string;

  // Columns
  columns?: string | number;
  columnCount?: number;
  columnFill?: 'auto' | 'balance';
  columnGap?: string | number;
  columnRule?: string;
  columnRuleColor?: string;
  columnRuleStyle?: 'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
  columnRuleWidth?: string | number;
  columnSpan?: 'none' | 'all';
  columnWidth?: string | number;

  // SVG-specific Properties
  fill?: string;
  stroke?: string;
  strokeWidth?: string | number;

  alignItems?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch'
    | 'normal'
    | 'start'
    | 'end'
    | 'self-start'
    | 'self-end';
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch'
    | 'normal'
    | 'start'
    | 'end'
    | 'self-start'
    | 'self-end';
  aspectRatio?: 'auto' | string;
  backdropFilter?: string;
  backfaceVisibility?: 'visible' | 'hidden';
  backgroundBlendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity';
  backgroundClip?: 'border-box' | 'padding-box' | 'content-box' | 'text';
  colorScheme?: 'normal' | 'light' | 'dark' | 'only light' | 'only dark';
  contain?: 'none' | 'strict' | 'content' | 'size' | 'layout' | 'style' | 'paint' | string;
  contentVisibility?: 'visible' | 'hidden' | 'auto';
  flexBasis?: string | number | 'auto' | 'fill' | 'max-content' | 'min-content' | 'fit-content';
  fontDisplay?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  fontKerning?: 'auto' | 'normal' | 'none';
  fontSmooth?: 'auto' | 'never' | 'always' | string;
  fontStretch?:
    | 'ultra-condensed'
    | 'extra-condensed'
    | 'condensed'
    | 'semi-condensed'
    | 'normal'
    | 'semi-expanded'
    | 'expanded'
    | 'extra-expanded'
    | 'ultra-expanded'
    | string;
  fontVariantCaps?:
    | 'normal'
    | 'small-caps'
    | 'all-small-caps'
    | 'petite-caps'
    | 'all-petite-caps'
    | 'unicase'
    | 'titling-caps';
  fontVariantEastAsian?:
    | 'normal'
    | 'ruby'
    | 'jis78'
    | 'jis83'
    | 'jis90'
    | 'jis04'
    | 'simplified'
    | 'traditional'
    | string;
  fontVariantLigatures?:
    | 'normal'
    | 'none'
    | 'common-ligatures'
    | 'no-common-ligatures'
    | 'discretionary-ligatures'
    | 'no-discretionary-ligatures'
    | 'historical-ligatures'
    | 'no-historical-ligatures'
    | 'contextual'
    | 'no-contextual'
    | string;
  fontVariantNumeric?:
    | 'normal'
    | 'ordinal'
    | 'slashed-zero'
    | 'lining-nums'
    | 'oldstyle-nums'
    | 'proportional-nums'
    | 'tabular-nums'
    | 'diagonal-fractions'
    | 'stacked-fractions'
    | string;
  gap?: string | number;
  gridAutoColumns?: string | number;
  gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  gridAutoRows?: string | number;
  hyphens?: 'none' | 'manual' | 'auto';
  imageRendering?: 'auto' | 'crisp-edges' | 'pixelated';
  inset?: string | number;
  isolation?: 'auto' | 'isolate';
  justifySelf?:
    | 'auto'
    | 'normal'
    | 'stretch'
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'self-start'
    | 'self-end'
    | 'left'
    | 'right'
    | 'baseline';
  mixBlendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity';
  order?: number;
  overscrollBehavior?: 'auto' | 'contain' | 'none' | string;
  placeContent?: string;
  rowGap?: string | number;
  scrollBehavior?: 'auto' | 'smooth';
  scrollMargin?: string | number;
  scrollPadding?: string | number;
  scrollSnapAlign?: 'none' | 'start' | 'end' | 'center' | string;
  scrollSnapStop?: 'normal' | 'always';
  scrollSnapType?: 'none' | 'x' | 'y' | 'block' | 'inline' | 'both' | string;
  shapeOutside?: 'none' | 'margin-box' | 'content-box' | 'border-box' | 'padding-box' | string;
  tabSize?: number | string;
  textDecorationColor?: string;
  textDecorationLine?: 'none' | 'underline' | 'overline' | 'line-through' | string;
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
  textDecorationThickness?: string | number;
  textUnderlineOffset?: string | number;
  touchAction?:
    | 'auto'
    | 'none'
    | 'pan-x'
    | 'pan-left'
    | 'pan-right'
    | 'pan-y'
    | 'pan-up'
    | 'pan-down'
    | 'pinch-zoom'
    | 'manipulation'
    | string;
  userSelect?: 'none' | 'auto' | 'text' | 'contain' | 'all';
  willChange?: 'auto' | 'scroll-position' | 'contents' | string;
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  writingMode?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
}
