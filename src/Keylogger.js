const WHEEL = "wheel";
const LEFTMOUSE = "leftmouse";
const MIDDLEMOUSE = "middlemouse";
const RIGHTMOUSE = "rightmouse";

class Tracker {
    
    constructor() {
        this.isTracker  = true;
        this.target = window;
        this.pressedKeys = {};
        this.history = [];
        this.events = [];

        //make custom events - nameend and namestart
        this.splitEvent('wheel');
        this.splitEvent('mousemove');
        
        //key
        this.addEvent('keyup', (e)=>{this.unpressed(e)});
        this.addEvent('keydown', (e)=>{this.pressed(e)});
        
        //mouse
        this.addEvent('mousedown', (e)=>{this.pressed(e)});
        this.addEvent('mouseup', (e)=>{this.unpressed(e)});

        //wheel
        this.addEvent('wheelstart', (e)=>{this.pressed(e)});
        this.addEvent('wheelend', (e)=>{this.unpressed(e)});
        
        //mousemove
        this.addEvent('mousemovestart', (e)=>{this.pressed(e)});
        this.addEvent('mousemoveend', (e)=>{this.unpressed(e)});
    }
    
    addEvent(trigger, event) {

        const dispatch = (e) => {
            e = this.tunnel(e);
            event(e);
        }

        this.events.push({
            trigger: trigger,
            dispatch: dispatch,
        });

        this.target.addEventListener(trigger, dispatch);
    }

    splitEvent(name) {
        let startName = name + 'start';
        let endName = name + 'end';
        
        let timer;
        
        let formatCustom = (name, e) => {
            return new CustomEvent(name, {detail: e});
        };
        
        let eventEnd = (e)=>{
            this.target.dispatchEvent(formatCustom(endName, e));
            timer = undefined;
        };
        
        let eventStart = (e)=>{
            if (timer === undefined) {
                this.target.dispatchEvent(formatCustom(startName, e));
            }
            
            clearTimeout(timer);
            timer = setTimeout(()=>{eventEnd(e)}, 100);
        };

        this.addEvent(name, eventStart);
    }

    tunnel(event) {
        const addToHistory = (event) => {

            this.history.push({
                pressedKeys: Object.assign({}, this.pressedKeys),
                event: event,
                time: new Date().getTime(),
            });

            return event;
        };

        const format = (event) => {
            if (event instanceof CustomEvent) {
                let key = event.detail.type;
                event = event.detail;
                event.key = key;
            } else {
                switch (event.which) {
                    case 0:
                        event.key = WHEEL;   
                        break;
                    case 1:
                        event.key = LEFTMOUSE;
                        break;
                    case 2:
                        event.key = MIDDLEMOUSE;
                        break;
                    case 3:
                        event.key = RIGHTMOUSE;
                        break;
                }   
            }
            
            return event;
        };

        event = format(event);
        event = addToHistory(event);
        return event;
    }

    pressed(e) {
        this.pressedKeys[e.key] = true;
    }
    
    unpressed(e) {
        delete this.pressedKeys[e.key];
    }

    kill() {
        this.events.forEach((v)=>{
            this.target.removeEventListener(v.trigger, v.dispatch);
        });
    }
}

class Keylogger {
    constructor() {
        this._logger = new Tracker();
        
        this.isKeyLogger = true;
        this.history = this._logger.history;
        this.pressed = this._logger.pressedKeys;
    }

    kill() {
        this._logger.kill();
    }
}

const instance = new Keylogger(window);
Object.freeze(instance);

module.exports = {
    globalinstance: instance,
    Keylogger: Keylogger,
}