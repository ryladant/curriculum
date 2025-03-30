export class Player {

    constructor(){
        this.life = 3
        this.score = 0
    }

    sum_score(points){
        this.score += points
    }

    decrease_life(){
        this.life -= 1
        if(this.life == 0)
            console.log("life is 0")
    }
}