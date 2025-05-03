export class storagePost {

    posts;

    constructor() {
        
        this.posts = [];
    }

    getPosts(){
        return this.posts;
    }

    afegirPost(newPost){
        this.posts.push(newPost);

    }
}