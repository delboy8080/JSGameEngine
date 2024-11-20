import GameObject from '../engine/gameobject.js'
import Renderer from '../engine/renderer.js'
import Physics from '../engine/physics.js'
import Input from "../engine/input.js"
import {Images} from '../engine/resources.js'
import Platform from './platform.js'
import Collectible from './collectible.js'
import ParticleSystem from '../engine/particleSystem.js'
class Player extends GameObject
{
    constructor(x, y, w, h)
    {
        super(x, y);
        this.addComponent(new Renderer('red', w, h, Images.player));
        this.addComponent(new Physics({x:0, y:0}, {x:0, y:0}) );
        this.addComponent(new Input());
        
        
        this.tag = "player";
        this.isOnPlatform = false;
        this.direction = 1;
        this.score = 0;
        this.defaultSpeed=100;
        this.speed = 100;
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpForce = 300;
        this.jumpTime = 1.0;
        this.jumpTimer = 0;

    }
    
    update(deltaTime)
    {
        
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);
        
        if(input.isKeyDown("ArrowRight"))
        {
            physics.velocity.x = this.speed;
            this.direction = -1;
        }
        else if(input.isKeyDown("ArrowLeft"))
        {
            physics.velocity.x = -this.speed;
            this.direction = 1;
        }
        else
        {
            physics.velocity.x = 0;
        }
        
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
        for(const platform of platforms)
        {
          
            if(physics.isColliding(platform.getComponent(Physics)))
            {
                physics.acceleration.y = 0;
                physics.velocity.y = 0;
                this.y = platform.y - this.getComponent(Renderer).height;
                this.isOnPlatform = true;
            }
            
        }
        
        const collectibles = this.game.gameObjects.filter
        ((obj)=> obj instanceof Collectible);
        for(const coll of collectibles)
        {
            if(physics.isColliding(coll.getComponent(Physics)))
            {
                this.collectStar(coll);
            }
        }
        
        super.update(deltaTime);
                
    }
    
    collectStar(collectible)
    {
        this.game.removeGameObject(collectible);
        this.emitParticles(collectible);
        this.score++;
        this.speed *= 2;
       
    }
    
    emitParticles(collectible)
    {
        let renderer = collectible.getComponent(Renderer);
        const particleSystem = new ParticleSystem(collectible.x + (renderer.width/2),
        collectible.y+ (renderer.height/2),
        'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);

    }
}

export default Player
