export class Emitter {
    constructor() {
        this.listeners = {}
    }
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

// console.log('test')
// const emitter = new Emitter()
//
// unsub = emitter.subscribe('vla', data => console.log('sub', data))
//
// emitter.emit('vla', 42)
// unsub()
// emitter.emit('vla', 422)
