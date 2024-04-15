# Social Icon Bar

A custom web component for displaying a bar of social media icons.

## Usage

### NPM

To install the package, run the following command:

```bash
npm install @allensulzen/social-icon-bar
```

Then import the package into your project:

```javascript
import 'social-icon-bar';
```

### CDN

To use the package via CDN, include the following script tag in your HTML file:
```html
<script src="https://unpkg.com/@allensulzen/social-icon-bar"></script>
```

## Properties

| Attribute | Description | Default |
|-----------|-------------|---------|
| `icons` | JSON string of icons to display. | None |
| `prefix` | Icon prefix. | `bxl` |
| `backgroundColor` | Background color of the icon bar. | `black` |
| `iconColor` | Color of the icon. | `white` |
| `align` | Alignment of the icon bar. | `center` |
| `position` | Position of the icon bar. | `top` |
| `iconHoverColor` | Hover color of the icon. | `skyblue` |
| `iconSize` | Size of the icon. | `1.5rem` |

## Slots

| Slot | Description |
|------|-------------|
| `before` | Slot for content before the icons. |
| `after` | Slot for content after the icons. |

## Events

| Event | Description |
|-------|-------------|
| `socialIconBarRender` | Event fired when the component renders. |

## Usage

```html
<social-icon-bar
    icons='[{"site":"facebook", "url":"https://facebook.com"}, {"site":"twitter", "url":"https://twitter.com"}]'
    prefix="bxl"
    backgroundColor="black"
    iconColor="white"
    align-icons="center"
    position="top"
    iconHoverColor="skyblue"
    iconSize="1.5rem"
>
    <div slot="before">Content before the icons</div>
    <div slot="after">Content after the icons</div>
</social-icon-bar>
```