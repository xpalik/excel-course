class Dom {
    constructor(selector) {
        // #app
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }
    clear() {
        this.html('')
        return this
    }
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }
    off(listener, callback) {
        this.$el.removeEventListener(listener, callback)
    }
    find(selector) {
        return $(this.$el.querySelector(selector))
    }
    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }
    get data() {
        return this.$el.dataset
    }
    closest(selector) {
        return $(this.$el.closest(selector))
    }
    getCoords() {
        return this.$el.getBoundingClientRect()
    }
    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        })
        return $(this.$el)
    }
    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }
    addClass(className) {
        this.$el.classList.add(className)
    }
    removeClass(className) {
        this.$el.classList.remove(className)
    }
    findAll(selector) {
        return document.querySelectorAll(selector)
    }
    getColumn(selector) {
        return $(document.querySelectorAll(selector))
    }
}


// event.target
export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classess = '') => {
    const el = document.createElement(tagName)
    if (classess) {
        el.classList.add(classess)
    }
    return $(el)
}
