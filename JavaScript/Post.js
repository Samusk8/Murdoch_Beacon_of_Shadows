export class Post {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    mostrarPost() {
        return `
            <div class="post">
                <div class="nom5">
                    <h5>${this.title}</h5>
                    <p>${this.content}</p>
                </div>
            </div>
        `;
    }
}