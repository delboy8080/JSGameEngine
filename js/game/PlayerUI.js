import UI from "../engine/ui.js";
import GameObject from "../engine/gameObject.js"
import Player from "./player.js"
import Checkpoint from "./checkpoint.js"
class PlayerUI extends GameObject
{
    constructor(x, y)
    {
        super(x,y);
        this.ui = new UI('Lives: 3 Score: 0', 10,10);
        this.addComponent(this.ui);
      
    }
    
    update(deltaTime)
    {
        const player = this.game.gameObjects.find((obj)=>obj instanceof Player);
        this.ui.setText("Lives: "+player.lives+ " Score: "+player.score);
    }
}

export default PlayerUI;
