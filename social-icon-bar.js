class SocialIconBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    /**
     * Properties
     * | Attribute | Description |
     * |-----------|-------------|
     * | icons | JSON string of icons to display. |
     * | prefix | Icon prefix. Default is `bxl`. |
     * | backgroundColor | Background color of the icon bar. Default is `black`. |
     * | iconColor | Color of the icon. Default is `white`. |
     * | align | Alignment of the icon bar. Default is `center`. |
     * | position | Position of the icon bar. Default is `top`. |
     * | iconHoverColor | Hover color of the icon. Default is `skyblue`. |
     * | iconSize | Size of the icon. Default is `1.5rem`. |
     * 
     * Slots
     * | Slot | Description |
     * |------|-------------|
     * | before | Slot for content before the icons. |
     * | after | Slot for content after the icons. |
     */
    static get observedAttributes() {
        return ['icons', 'prefix', 'background-color', 'icon-color', 'align-icons', 'position', 'icon-hover-color', 'icon-size'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const propName = name.split('-').reduce((acc, part, index) => {
            return index === 0 ? part : acc + part.charAt(0).toUpperCase() + part.slice(1);
        }, '');

        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    positionCss() {
        switch (this.position) {
            case 'top':
                return 'top: 0; left: 0;';
            case 'bottom':
                return 'bottom: 0; left: 0;';
            case 'left':
                return 'top: 50%; left: 0; transform: translateY(-50%);';
            case 'right':
                return 'top: 50%; right: 0; transform: translateY(-50%);';
            default:
                return 'top: 0; left: 0;';
        }
    }

    flexDirection() {
        switch (this.position) {
            case 'top':
                return 'row';
            case 'bottom':
                return 'row';
            case 'left':
                return 'column';
            case 'right':
                return 'column';
            default:
                return 'row';
        }
    }

    render() {
        if (!this.icons) {
            return;
        }
    
        const _icons = JSON.parse(this.icons);
        const svgArrPromises = _icons.map(icon => {
            return fetch(`https://api.iconify.design/${this.prefix || 'bxl'}/${icon.site}.svg`)
                .then(response => response.text());
        });
    
        Promise.all(svgArrPromises).then(svgArr => {
            const svgStr = svgArr.map((svg, index) => {
                return `
                    <a href="${_icons[index].url}" target="${_icons[index].targetBlank ? '_blank' : ''}" class="social-icon-bar__icon ${_icons[index].site}">
                        ${svg}
                    </a>
                `;
            }).join('');
            this.shadowRoot.innerHTML = `
                <style>
                    .social-icon-bar {
                        width: ${['left', 'right'].includes(this.position) ? 'unset' : '100%'};
                        background-color: ${this.backgroundColor || 'black'};
                        display: flex;
                        justify-content: ${this.alignIcons || 'right'};
                        flex-direction: ${this.flexDirection()};
                        gap: 1rem;
                        position: fixed;
                        ${this.positionCss()}
                        padding: ${['top', 'bottom'].includes(this.position) ? '0.5rem 1rem' : '1rem 0.5rem'};
                        box-sizing: border-box;
                        color: white;
                        align-items: center;
                    }

                    .social-icon-bar__icon {
                        color: ${this.iconColor || 'white'};
                        display: flex;
                        align-items: center;
                    }

                    .social-icon-bar__icon svg {
                        width: ${this.iconSize || '1.5rem'};
                        height: ${this.iconSize || '1.5rem'};
                    }

                    .social-icon-bar__icon:hover {
                        color: ${this.iconHoverColor || 'skyblue'};
                    }

                    ${_icons.map(icon => {
                        return `
                            .social-icon-bar__icon.${icon.site} {
                                ${icon.color ? `color: ${icon.color};` : ''}
                            }

                            .social-icon-bar__icon.${icon.site}:hover {
                                ${icon.hoverColor ? `color: ${icon.hoverColor};` : ''}
                            }
                        `;
                    }).join('')}
                </style>
                <div class="social-icon-bar">
                    <slot name="before"></slot>
                    ${svgStr}
                    <slot name="after"></slot>
                </div>
            `;
        });
    }
}

customElements.define('social-icon-bar', SocialIconBar);