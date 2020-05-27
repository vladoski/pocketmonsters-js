class Player {
    constructor(username = '', image = null, lifePoints = 0, experiencePoints = 0) {
        this.username = username;
        this.image = image;
        this.lifePoints = this.lifePoints;
        this.experiencePoints = experiencePoints;
    }

    addLifePoints(lifePoints) {
        this.lifePoints += lifePoints;
    }

    addExperiencePoints(experiencePoints) {
        this.experiencePoints += experiencePoints;
    }
}

export default Player;