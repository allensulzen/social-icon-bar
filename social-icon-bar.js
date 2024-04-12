class SocialIconBar extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['icons'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'icons') {
            this.icons = newValue;
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (!this.icons) {
            return;
        }

        const _icons = JSON.parse(this.icons);

        this.innerHTML = `
            <style>
                .social-icon-bar {
                    width: 100%;
                    background-color: ${this.backgroundColor || 'black'};
                    display: flex;
                    justify-content: center;
                    flex-direction: row;
                    gap: 1rem;
                }

                .social-icon-bar__icon {
                    color: white;
                }
            </style>
            <div class="social-icon-bar">
                ${_icons.map(icon => {
                    return `
                        <a href="${icon.url}" target="${icon.targetBlank ? '_blank' : ''}" class="social-icon-bar__icon">
                            <img src="https://api.iconify.design/bxl/${icon.site}.svg" alt="${icon.site}" />
                        </a>
                    `;
                }).join('')}
            </div>
        `;
    }
}

customElements.define('social-icon-bar', SocialIconBar);